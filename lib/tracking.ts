// Lead-source attribution, ported from the existing Shopify hero form.
// Captures Google Ads click IDs (gclid/gbraid/wbraid), Meta (fbclid),
// UTM params, and first-touch referrer — persisted in sessionStorage so a
// multi-step visit (land → browse → submit) keeps its original source.
"use client";

export type Tracking = Record<string, string>;

const KEYS = [
  "gclid", "gbraid", "wbraid", "fbclid", "msclkid",
  "gad_campaignid", "gad_source",
  "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
];

export function captureTracking(): Tracking {
  const t: Tracking = {};
  if (typeof window === "undefined") return t;
  const p = new URLSearchParams(window.location.search);
  KEYS.forEach((k) => {
    const fromUrl = p.get(k);
    if (fromUrl) {
      t[k] = fromUrl;
      try { sessionStorage.setItem("mx_" + k, fromUrl); } catch {}
    } else {
      try {
        const stored = sessionStorage.getItem("mx_" + k);
        if (stored) t[k] = stored;
      } catch {}
    }
  });
  try {
    let firstRef = sessionStorage.getItem("mx_first_referrer");
    if (!firstRef) {
      firstRef = document.referrer || "";
      sessionStorage.setItem("mx_first_referrer", firstRef);
    }
    t.referrer = firstRef;
  } catch {
    t.referrer = document.referrer || "";
  }
  try {
    let landing = sessionStorage.getItem("mx_landing_url");
    if (!landing) {
      landing = window.location.href;
      sessionStorage.setItem("mx_landing_url", landing);
    }
    if (landing) {
      t.landing_url = landing;
      try { t.landing_path = new URL(landing).pathname; } catch {}
    }
  } catch {
    t.landing_url = window.location.href;
  }
  return t;
}

export function classifySource(t: Tracking): string {
  if (t.gclid) return "Google Ads";
  if (t.gbraid) return "Google Ads (iOS app)";
  if (t.wbraid) return "Google Ads (Android app)";
  if (t.fbclid) return "Meta Ads";
  if (t.gad_campaignid || t.gad_source) return "Google Ads";
  if (t.msclkid) return "Microsoft Ads";
  if (t.utm_source) {
    const s = (t.utm_source || "").toLowerCase();
    const m = (t.utm_medium || "").toLowerCase();
    if (s === "google" && ["cpc", "paid", "ads"].includes(m)) return "Google Ads (UTM)";
    if (["facebook", "meta", "instagram"].includes(s)) return "Meta Ads (UTM)";
    return "Campaign: " + t.utm_source + (m ? " / " + m : "");
  }
  const ref = (t.referrer || "").toLowerCase();
  if (ref.includes("google.")) return "Google Organic";
  if (ref.includes("bing.")) return "Bing Organic";
  if (ref.includes("facebook.") || ref.includes("fb.")) return "Facebook Referral";
  if (ref.includes("instagram.")) return "Instagram Referral";
  if (ref.includes("linkedin.")) return "LinkedIn Referral";
  if (ref.includes("youtube.")) return "YouTube Referral";
  if (ref.includes("whatsapp.") || ref.includes("wa.me")) return "WhatsApp Referral";
  if (ref && typeof window !== "undefined" && !ref.includes(window.location.hostname))
    return "Referral: " + ref;
  return "Direct";
}

// ── Conversion signal ──
// Fires ONE unified event on every successful lead, from ANY form
// (homepage calculator, forex-card page, remittance page). Configure the
// conversion ONCE in GTM/Google Ads on the `lead_submit` dataLayer event
// (or the gtag `generate_lead` event) and it tracks every form. `lead_type`
// lets you segment buy / sell / send / card conversions if you want.
type LeadType = "buy" | "sell" | "send" | "card";
export function pushLeadEvent(leadType: LeadType, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: "lead_submit", lead_type: leadType, ...extra });
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", { lead_type: leadType, ...extra });
  }
}
