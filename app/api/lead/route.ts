// Secure lead handler. Every submission is validated, bot-checked, and
// emailed to LEAD_TO_EMAIL. Nothing is stored. Email creds stay server-side.
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

// ── Rate limiting ───────────────────────────────────────────────────────
// Primary: Upstash Redis (persistent, shared across all instances).
// Fallback: in-memory (local dev only). Fails OPEN on any Upstash error so a
// rate-limit hiccup can never take the form down.
const _url = process.env.UPSTASH_REDIS_REST_URL;
const _token = process.env.UPSTASH_REDIS_REST_TOKEN;
const ratelimit =
  _url && _token
    ? new Ratelimit({
        redis: new Redis({ url: _url, token: _token }),
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        prefix: "mxf:lead",
        analytics: false,
      })
    : null;

const MEM_WINDOW_MS = 60_000;
const MEM_MAX = 8;
const memHits = new Map<string, { count: number; reset: number }>();
function memLimited(ip: string): boolean {
  const now = Date.now();
  const e = memHits.get(ip);
  if (!e || now > e.reset) {
    memHits.set(ip, { count: 1, reset: now + MEM_WINDOW_MS });
    return false;
  }
  if (e.count >= MEM_MAX) return true;
  e.count++;
  return false;
}

async function isRateLimited(ip: string): Promise<boolean> {
  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(ip);
      return !success;
    } catch (e) {
      console.error("Upstash rate-limit error (failing open):", e);
      return false;
    }
  }
  return memLimited(ip);
}

// ── Validation ──────────────────────────────────────────────────────────
const LeadSchema = z.object({
  formType: z.enum(["buy", "sell", "send", "card"]),
  name: z.string().min(2).max(80),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  email: z.string().email().max(120),
  city: z.string().max(60).optional().default(""),
  service: z.string().max(40).optional().default(""),
  currency: z.string().max(4).optional().default(""),
  amount: z.string().max(20).optional().default(""),
  rate: z.string().max(20).optional().default(""),
  total: z.string().max(30).optional().default(""),
  source: z.string().max(120).optional().default("Direct"),
  tracking: z.record(z.string()).optional().default({}),
  // Honeypot — must stay empty. Bots fill it.
  company: z.string().max(0).optional().default(""),
  turnstileToken: z.string().optional().default(""),
});

const FORM_LABEL: Record<string, string> = {
  buy: "Buy Forex Lead",
  sell: "Sell Forex Lead",
  send: "Remittance Lead",
  card: "Forex Card Lead",
};

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // disabled if no secret configured
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

function plainTextBody(d: z.infer<typeof LeadSchema>): string {
  const L: string[] = [];
  L.push(`Form Type : ${FORM_LABEL[d.formType]}`);
  L.push(`Submitted : ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`);
  L.push("");
  L.push("── CONTACT ──────────────────");
  L.push(`Name      : ${d.name}`);
  L.push(`Phone     : +91 ${d.phone}`);
  L.push(`Email     : ${d.email}`);
  if (d.city) L.push(`City      : ${d.city}`);
  L.push("");
  L.push("── FOREX REQUIREMENT ────────");
  if (d.currency) L.push(`Currency  : ${d.currency}`);
  if (d.amount) L.push(`Amount    : ${d.amount} ${d.currency}`.trim());
  if (d.rate) L.push(`Rate      : ₹${d.rate} / ${d.currency}`.trim());
  if (d.total) L.push(`Total INR : ₹${d.total}`);
  if (d.service) L.push(`Service   : ${d.service}`);
  L.push("");
  L.push("── TRAFFIC SOURCE ───────────");
  L.push(`Source    : ${d.source}`);
  if (d.tracking?.gad_campaignid) L.push(`Campaign  : ${d.tracking.gad_campaignid}`);
  for (const [k, v] of Object.entries(d.tracking || {})) {
    if (v) L.push(`${k.padEnd(10)}: ${v}`);
  }
  L.push("");
  L.push("═══════════════════════════════");
  return L.join("\n");
}

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Branded, email-client-safe HTML (table layout + inline styles only).
// Person & quick actions on top, the deal in the middle, Google/attribution
// (with the campaign ID isolated) at the bottom.
function htmlBody(d: z.infer<typeof LeadSchema>): string {
  const DARK = "#0f172a", INK = "#1e293b", MUTED = "#64748b", BORDER = "#e2e8f0", PANEL = "#f8fafc", LEAF = "#2563eb", ACCENT = "#2563eb", ACCENT_DK = "#1d4ed8", CAMP_BG = "#eff6ff", CAMP_BORDER = "#bfdbfe", HEAD_EYE = "#93c5fd";
  const TYPE: Record<string, string> = { buy: "Buy Forex", sell: "Sell Forex", send: "Remittance", card: "Forex Card" };
  const typeLabel = TYPE[d.formType] || "Lead";
  const label = FORM_LABEL[d.formType] || "New Lead";
  const submitted = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  const t = d.tracking || {};
  const phone = (d.phone || "").replace(/\D/g, "");
  // Remittance purpose isn't reliable, so show the service simply as "Remittance".
  const svc = d.service && /^Remittance\b/i.test(d.service) ? "Remittance" : d.service;

  const row = (lbl: string, valHtml: string, o: { strong?: boolean; mono?: boolean } = {}) =>
    valHtml ? `<tr>
      <td style="padding:7px 0;color:${MUTED};font-size:13px;width:120px;vertical-align:top;">${esc(lbl)}</td>
      <td style="padding:7px 0;color:${INK};font-size:${o.strong ? "16px" : "14px"};font-weight:${o.strong ? 700 : 500};${o.mono ? "font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;word-break:break-all;" : ""};vertical-align:top;">${valHtml}</td>
    </tr>` : "";

  const eyebrow = (txt: string) => `<div style="color:${LEAF};font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:800;margin-bottom:8px;">${esc(txt)}</div>`;

  const reqRows = [
    row("Service", esc(svc)),
    row("Currency", esc(d.currency)),
    row("Amount", d.amount ? esc(`${d.amount} ${d.currency}`.trim()) : ""),
    row("Rate", d.rate ? esc(`₹${d.rate} / ${d.currency}`.trim()) : ""),
    row("Total (INR)", d.total ? `<span style="color:${DARK};">₹${esc(d.total)}</span>` : "", { strong: true }),
  ].join("") || row("Service", esc(svc) || "—");

  const campaignId = t.gad_campaignid || "";
  const campaignName = t.utm_campaign || "";
  const campaignBlock = (campaignId || campaignName) ? `
    <table role="presentation" width="100%" style="margin:6px 0 14px;"><tr>
      <td style="background:${CAMP_BG};border:1px solid ${CAMP_BORDER};border-radius:10px;padding:14px 16px;">
        <div style="color:${MUTED};font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:700;">${campaignId ? "Google Ads Campaign ID" : "Campaign"}</div>
        ${campaignId ? `<div style="margin-top:3px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:22px;font-weight:800;"><a href="https://ads.google.com/aw/campaigns?campaignId=${esc(campaignId)}" style="color:${ACCENT_DK};text-decoration:none;">${esc(campaignId)}</a></div>` : ""}
        ${campaignName ? `<div style="color:${INK};font-size:14px;font-weight:600;margin-top:${campaignId ? "4" : "3"}px;">${esc(campaignName)}</div>` : ""}
      </td></tr></table>` : "";

  const clickRows = [
    row("GCLID", esc(t.gclid || ""), { mono: true }),
    row("GBRAID", esc(t.gbraid || ""), { mono: true }),
    row("WBRAID", esc(t.wbraid || ""), { mono: true }),
    row("Meta ID", esc(t.fbclid || ""), { mono: true }),
    row("Bing ID", esc(t.msclkid || ""), { mono: true }),
  ].join("");
  const utmRows = [
    row("UTM source", esc(t.utm_source || "")),
    row("UTM medium", esc(t.utm_medium || "")),
    row("UTM term", esc(t.utm_term || "")),
    row("UTM content", esc(t.utm_content || "")),
  ].join("");
  const pageRows = [
    row("Referrer", t.referrer ? `<a href="${esc(t.referrer)}" style="color:${ACCENT};">${esc(t.referrer)}</a>` : ""),
    row("Landing page", esc(t.landing_path || "")),
    row("Full URL", t.landing_url ? `<a href="${esc(t.landing_url)}" style="color:${MUTED};">${esc(t.landing_url)}</a>` : "", { mono: true }),
  ].join("");

  // Branch summary — drag-select to copy and paste into the branch email. No rates here.
  const fwdRows: Array<[string, string]> = [
    ["Name", d.name],
    ["Phone", `+91 ${phone}`],
    ["Email", d.email],
    ["City", d.city || "—"],
  ];
  if (d.amount) fwdRows.push(["Amount", `${d.amount} ${d.currency}`.trim()]);
  if (svc) fwdRows.push(["Service", svc]);
  const fwdHtml =
    `<div style="font-weight:800;color:${INK};font-size:15px;margin-bottom:10px;">${esc(typeLabel)}</div>` +
    `<table role="presentation" cellpadding="0" cellspacing="0">${fwdRows.map(([k, v]) => `<tr><td style="color:${MUTED};font-size:14px;padding:3px 14px 3px 0;vertical-align:top;white-space:nowrap;">${esc(k)}</td><td style="color:${INK};font-size:14px;font-weight:700;padding:3px 0;vertical-align:top;">${esc(v)}</td></tr>`).join("")}</table>`;

  return `<!doctype html><html><body style="margin:0;background:#eef1f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f5;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid ${BORDER};border-radius:14px;overflow:hidden;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
        <tr><td style="background:${DARK};padding:22px 26px;">
          <div style="color:${HEAD_EYE};font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;">Matrix Forex</div>
          <div style="color:#ffffff;font-size:21px;font-weight:800;margin-top:6px;">New ${esc(label)}</div>
          <div style="color:rgba(255,255,255,.6);font-size:12px;margin-top:4px;">${esc(submitted)} IST</div>
        </td></tr>

        <tr><td style="padding:24px 26px 22px;">
          ${eyebrow("Lead")}
          <div style="color:${INK};font-size:24px;font-weight:800;line-height:1.2;">${esc(d.name)}</div>
          <table role="presentation" width="100%" style="margin-top:10px;">
            ${row("Phone", `<a href="tel:+91${esc(phone)}" style="color:${ACCENT};font-weight:700;text-decoration:none;">+91 ${esc(phone)}</a>`)}
            ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:${ACCENT};text-decoration:none;">${esc(d.email)}</a>`)}
            ${row("City", esc(d.city) || `<span style="color:${MUTED};">—</span>`)}
          </table>
        </td></tr>

        <tr><td style="padding:0 26px;"><div style="height:1px;background:${BORDER};"></div></td></tr>

        <tr><td style="padding:18px 26px;">
          ${eyebrow("Requirement")}
          <table role="presentation" width="100%">${reqRows}</table>
        </td></tr>

        <tr><td style="padding:6px 26px 20px;">
          ${eyebrow("Summary")}
          <div style="border:1px solid ${BORDER};border-radius:10px;background:${PANEL};padding:16px 18px;">${fwdHtml}</div>
        </td></tr>

        <tr><td style="background:${PANEL};padding:20px 26px;border-top:1px solid ${BORDER};">
          ${eyebrow("Where this lead came from")}
          <table role="presentation" width="100%">${row("Source", `<strong style="color:${INK};">${esc(d.source)}</strong>`)}</table>
          ${campaignBlock}
          ${clickRows ? `<table role="presentation" width="100%">${clickRows}</table>` : ""}
          ${utmRows ? `<table role="presentation" width="100%" style="margin-top:2px;">${utmRows}</table>` : ""}
          ${pageRows ? `<table role="presentation" width="100%" style="margin-top:2px;">${pageRows}</table>` : ""}
        </td></tr>

        <tr><td style="background:${DARK};padding:16px 26px;">
          <div style="color:rgba(255,255,255,.55);font-size:11px;">Automated lead notification · matrixforex.in</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
  </body></html>`;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 }
    );
  }
  const d = parsed.data;

  // Honeypot tripped → pretend success, drop silently.
  if (d.company && d.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (await isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  if (!(await verifyTurnstile(d.turnstileToken, ip))) {
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please reload and try again." },
      { status: 403 }
    );
  }

  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "Matrix Forex <onboarding@resend.dev>";
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !apiKey) {
    console.error("Lead received but email is not configured (missing RESEND_API_KEY or LEAD_TO_EMAIL).");
    console.error(plainTextBody(d)); // still logged so nothing is lost in dev
    return NextResponse.json(
      { ok: false, error: "Server email is not configured yet." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const subjName = d.name.replace(/[\r\n]+/g, " ").trim();
    const subjCity = (d.city || "—").replace(/[\r\n]+/g, " ").trim();
    await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: `New ${FORM_LABEL[d.formType] || "Lead"} — ${subjName} (${subjCity})`,
      text: plainTextBody(d),
      html: htmlBody(d),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Resend send failed:", e);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please call us instead." },
      { status: 502 }
    );
  }
}
