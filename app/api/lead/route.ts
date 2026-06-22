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
  formType: z.enum(["buy", "sell", "send"]),
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
  buy: "Book Forex Lead",
  sell: "Sell Forex Lead",
  send: "Send Money Lead",
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
  for (const [k, v] of Object.entries(d.tracking || {})) {
    if (v) L.push(`${k.padEnd(10)}: ${v}`);
  }
  L.push("");
  L.push("═══════════════════════════════");
  return L.join("\n");
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
    await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: `New ${FORM_LABEL[d.formType]} — ${d.name} (${d.city || "—"})`,
      text: plainTextBody(d),
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
