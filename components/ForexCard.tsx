"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { captureTracking, classifySource, pushLeadEvent, type Tracking } from "@/lib/tracking";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const CITIES = [
  "Delhi NCR", "Mumbai", "Bangalore", "Chennai", "Hyderabad",
  "Pune", "Kanpur", "Tiruppur", "Other",
];

export default function ForexCard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [agree, setAgree] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const tracking = useRef<Tracking>({});
  useEffect(() => { tracking.current = captureTracking(); }, []);

  // ── Turnstile (invisible) ──
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
        sitekey: siteKey, appearance: "interaction-only", theme: "dark", size: "flexible",
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

  // ── 3D tilt (direct DOM writes, no re-render) ──
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const REST = "rotateX(6deg) rotateY(-14deg)";
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const wrap = e.currentTarget;
    const r = wrap.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotY = (px - 0.5) * 30;
    const rotX = (0.5 - py) * 30;
    if (cardRef.current) cardRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    if (glareRef.current) glareRef.current.style.background =
      `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.4), rgba(255,255,255,0) 45%)`;
  }
  function onLeave() {
    if (cardRef.current) cardRef.current.style.transform = REST;
    if (glareRef.current) glareRef.current.style.background = "transparent";
  }

  const displayName = (name || "").toUpperCase().slice(0, 26);

  async function submit() {
    setErrorMsg("");
    const digits = phone.replace(/\D/g, "").slice(-10);
    if (name.trim().length < 2) { setErrorMsg("Please enter the name to emboss on the card."); return; }
    if (digits.length !== 10) { setErrorMsg("Please enter a valid 10-digit mobile number."); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErrorMsg("Please enter a valid email address."); return; }
    if (!agree) { setErrorMsg("Please accept the Privacy Policy to continue."); return; }

    setStatus("sending");
    const payload = {
      formType: "card",
      name: name.trim(),
      phone: digits,
      email: email.trim(),
      city,
      service: "Forex Card",
      source: classifySource(tracking.current),
      tracking: tracking.current,
      company,
      turnstileToken,
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        pushLeadEvent("card", { city });
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

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-[15px] text-white placeholder-white/30 outline-none transition focus:border-accent/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-accent/20";

  return (
    <section
      id="card"
      className="relative isolate overflow-hidden bg-[#04100a] py-20 text-white md:py-28"
    >
      {/* grid + glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(80% 60% at 50% 40%, #000 40%, transparent 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -left-20 top-1/3 h-[420px] w-[420px] rounded-full" style={{ background: "rgba(2,227,117,.14)", filter: "blur(130px)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-8">
        {/* ── Card ── */}
        <div className="flex justify-center lg:justify-start">
          <div className="card-float" style={{ perspective: "1200px" }}>
            <div
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              className="[transform-style:preserve-3d]"
            >
              <div
                ref={cardRef}
                className="relative h-[460px] w-[290px] rounded-[26px] shadow-[0_40px_80px_-20px_rgba(0,0,0,.7)] transition-transform duration-200 ease-out sm:h-[500px] sm:w-[316px] [transform-style:preserve-3d]"
                style={{
                  transform: REST,
                  background:
                    "linear-gradient(150deg, #0a3d24 0%, #0d8a4f 32%, #06d36e 52%, #0a7544 70%, #052e1c 100%)",
                }}
              >
                {/* sheen */}
                <div className="pointer-events-none absolute inset-0 rounded-[26px]" style={{ background: "linear-gradient(120deg, transparent 28%, rgba(255,255,255,.22) 46%, transparent 62%)" }} />
                {/* inner border */}
                <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/15" />

                <div className="relative flex h-full flex-col justify-between p-6">
                  {/* top row */}
                  <div className="flex items-start justify-between">
                    <div className="leading-none">
                      <div className="font-display text-2xl font-extrabold tracking-tight text-white">Matrix</div>
                      <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">Forex</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* chip */}
                      <svg width="38" height="30" viewBox="0 0 38 30" fill="none" aria-hidden>
                        <rect x="1" y="1" width="36" height="28" rx="5" fill="#E9C86A" />
                        <rect x="1" y="1" width="36" height="28" rx="5" stroke="#C9A94A" />
                        <path d="M13 1v28M25 1v28M1 10h36M1 20h36" stroke="#B8983E" strokeWidth="1" />
                        <rect x="13" y="10" width="12" height="10" rx="2" fill="#D8B85A" stroke="#B8983E" />
                      </svg>
                      {/* contactless */}
                      <svg width="20" height="26" viewBox="0 0 20 26" fill="none" aria-hidden>
                        <path d="M4 7c3 3 3 9 0 12M9 4c5 4.5 5 13.5 0 18M14 1c7 6 7 18 0 24" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
                      </svg>
                    </div>
                  </div>

                  {/* bottom row */}
                  <div className="flex items-end justify-between">
                    <div className="min-w-0">
                      <div className="truncate font-display text-[17px] font-semibold uppercase tracking-[0.12em] text-white drop-shadow-sm">
                        {displayName || "YOUR NAME"}
                      </div>
                    </div>
                    <div className="font-display text-xl font-extrabold italic tracking-tight text-white">VISA</div>
                  </div>
                </div>

                {/* moving glare */}
                <div ref={glareRef} className="pointer-events-none absolute inset-0 rounded-[26px]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Form ── */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm sm:p-9">
          {status === "done" ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold">Application received</h3>
              <p className="mt-2 max-w-sm text-[14px] text-white/60">
                Thanks{name ? `, ${name.split(" ")[0]}` : ""}! Our team will reach out shortly to issue your Matrix Forex Card.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">Personalise your card</h2>
              <p className="mt-1.5 text-[14px] text-white/55">Your name will be embossed on your Matrix Forex Card.</p>

              <div className="mt-7 space-y-5">
                {/* Name */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">Name on card</label>
                  <div className="relative">
                    <Icon className="left-3.5">
                      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </Icon>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={26}
                      placeholder="e.g. RAHUL SHARMA"
                      className={inputCls}
                      autoComplete="name"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-white/35">Max 26 characters · Will appear in CAPITALS</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">Phone / WhatsApp</label>
                  <div className="relative">
                    <Icon className="left-3.5">
                      <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    </Icon>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputMode="tel"
                      placeholder="+91 98765 43210"
                      className={inputCls}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">Email address</label>
                  <div className="relative">
                    <Icon className="left-3.5">
                      <path d="M3 6h18v12H3zM3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    </Icon>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      inputMode="email"
                      placeholder="you@example.com"
                      className={inputCls}
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">Your city</label>
                  <div className="relative">
                    <Icon className="left-3.5">
                      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                    </Icon>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`${inputCls} appearance-none pr-10 ${city ? "" : "text-white/30"}`}
                    >
                      <option value="" className="text-black">Select city…</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c} className="text-black">{c}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>

                {/* honeypot */}
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                {/* agree */}
                <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-white/70">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="h-4 w-4 accent-accent" />
                  <span>I agree to the <Link href="/privacy" className="font-semibold text-accent underline-offset-2 hover:underline">Privacy Policy</Link></span>
                </label>

                {status === "error" && (
                  <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-[12.5px] font-medium text-red-200">{errorMsg}</div>
                )}

                {siteKey && <div ref={turnstileRef} />}

                <button
                  onClick={submit}
                  disabled={status === "sending"}
                  className="w-full rounded-2xl bg-accent py-4 text-[14px] font-extrabold uppercase tracking-wide text-deep shadow-[0_10px_30px_-8px_rgba(2,227,117,.6)] transition hover:-translate-y-0.5 hover:bg-mid-green disabled:opacity-60"
                >
                  {status === "sending" ? "Submitting…" : "Apply for card — free & instant →"}
                </button>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-[12px] text-white/45">
                  <span>🔒 RBI-secured</span><span>·</span>
                  <span>⚡ 24-hr issuance</span><span>·</span>
                  <span>🚚 Free delivery</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Icon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg className={`absolute top-1/2 -translate-y-1/2 text-accent ${className}`} width="18" height="18" viewBox="0 0 24 24" fill="none">
      {children}
    </svg>
  );
}
