"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { captureTracking, classifySource, pushLeadEvent, type Tracking } from "@/lib/tracking";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const PURPOSES = [
  "Education / tuition fees",
  "Family maintenance",
  "Medical treatment",
  "Travel",
  "Investment",
  "Gift to relative",
  "Other",
];

export default function RemittanceForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [agree, setAgree] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const tracking = useRef<Tracking>({});
  useEffect(() => { tracking.current = captureTracking(); }, []);

  // Turnstile (invisible)
  const [siteKey, setSiteKey] = useState<string>(TURNSTILE_SITE_KEY || "");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | null>(null);
  useEffect(() => {
    if (siteKey) return;
    fetch("/api/config").then((r) => r.json()).then((d) => { if (d.turnstileSiteKey) setSiteKey(d.turnstileSiteKey); }).catch(() => {});
  }, [siteKey]);
  useEffect(() => {
    if (!siteKey) return;
    const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    const render = () => {
      const ts = window.turnstile;
      if (!ts || !turnstileRef.current || turnstileId.current) return;
      turnstileId.current = ts.render(turnstileRef.current, {
        sitekey: siteKey, appearance: "interaction-only", size: "flexible",
        callback: (t: string) => setTurnstileToken(t),
        "error-callback": () => setTurnstileToken(""),
        "expired-callback": () => setTurnstileToken(""),
      });
    };
    if (window.turnstile) { render(); return; }
    let s = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (!s) { s = document.createElement("script"); s.src = SRC; s.async = true; s.defer = true; document.head.appendChild(s); }
    s.addEventListener("load", render);
    return () => { s?.removeEventListener("load", render); };
  }, [siteKey]);

  async function submit() {
    setErrorMsg("");
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (name.trim().length < 2) { setErrorMsg("Please enter your name."); return; }
    if (digits.length !== 10) { setErrorMsg("Please enter a valid 10-digit mobile number."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErrorMsg("Please enter a valid email address."); return; }
    if (!purpose) { setErrorMsg("Please select the purpose of your remittance."); return; }
    if (!agree) { setErrorMsg("Please accept the Privacy Policy to continue."); return; }

    setStatus("sending");
    const payload = {
      formType: "send",
      name: name.trim(),
      phone: digits,
      email: email.trim(),
      city,
      service: `Remittance — ${purpose}`.slice(0, 40),
      amount: amount.trim(),
      source: classifySource(tracking.current),
      tracking: tracking.current,
      company,
      turnstileToken,
    };
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        pushLeadEvent("send", { purpose, city });
        setStatus("done");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        if (turnstileId.current) { window.turnstile?.reset(turnstileId.current); setTurnstileToken(""); }
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or call us.");
      if (turnstileId.current) { window.turnstile?.reset(turnstileId.current); setTurnstileToken(""); }
    }
  }

  const field = "w-full rounded-xl border border-g2 bg-paper px-4 py-3 text-[15px] text-ink placeholder-ink/35 outline-none transition focus:border-leaf focus:bg-white focus:ring-2 focus:ring-leaf/15";
  const label = "mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-ink/55";

  if (status === "done") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-g2 bg-white p-10 text-center shadow-sm">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-leaf/12 text-leaf-dark">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-extrabold text-ink">Request received</h3>
        <p className="mt-2 max-w-sm text-[14px] text-g5">
          Thanks{name ? `, ${name.split(" ")[0]}` : ""}! A Matrix Forex remittance specialist will call you shortly with a live quote and the exact paperwork for your transfer.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-g2 bg-white p-7 shadow-sm sm:p-9">
      <h2 className="font-display text-2xl font-extrabold text-ink md:text-3xl">Start your transfer</h2>
      <p className="mt-1.5 text-[14px] text-g5">Share a few details and we&apos;ll call you with a live rate and the documents you&apos;ll need.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="As per your PAN" className={field} autoComplete="name" />
        </div>
        <div>
          <label className={label}>Phone / WhatsApp</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="+91 98765 43210" className={field} autoComplete="tel" />
        </div>
        <div>
          <label className={label}>Email address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" placeholder="you@example.com" className={field} autoComplete="email" />
        </div>
        <div>
          <label className={label}>Purpose of transfer</label>
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className={`${field} appearance-none ${purpose ? "" : "text-ink/35"}`}>
            <option value="">Select purpose…</option>
            {PURPOSES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className={label}>Your city</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Your city" className={field} autoComplete="address-level2" />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Approx. amount <span className="font-normal normal-case text-ink/40">(optional)</span></label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. USD 20,000 or ₹16,00,000" className={field} />
        </div>

        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

        <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-g5 sm:col-span-2">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="h-4 w-4 accent-leaf" />
          <span>I agree to the <Link href="/privacy" className="font-semibold text-leaf-dark underline-offset-2 hover:underline">Privacy Policy</Link></span>
        </label>

        {status === "error" && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-[12.5px] font-medium text-red-700 sm:col-span-2">{errorMsg}</div>
        )}

        {siteKey && <div ref={turnstileRef} className="sm:col-span-2" />}

        <button onClick={submit} disabled={status === "sending"} className="rounded-2xl bg-accent py-4 text-[14px] font-extrabold uppercase tracking-wide text-dark-green shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2">
          {status === "sending" ? "Submitting…" : "Get my live quote →"}
        </button>
        <p className="text-center text-[12px] text-ink/45 sm:col-span-2">🔒 RBI-authorised · KYC-guided · No spam calls</p>
      </div>
    </div>
  );
}
