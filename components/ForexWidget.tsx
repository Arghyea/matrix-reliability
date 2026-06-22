"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ALLOWED, CURRENCY_META, MIN_QTY, DEFAULT_MIN, PREFERRED,
  ratePrecision, tickerPrecision, type RateMap, type CurrencyCode,
} from "@/lib/currencies";
import { captureTracking, classifySource, type Tracking } from "@/lib/tracking";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

type Mode = "buy" | "sell" | "send";
const TABS: { mode: Mode; label: string }[] = [
  { mode: "buy", label: "Book Forex" },
  { mode: "sell", label: "Sell Forex" },
  { mode: "send", label: "Send Money" },
];

const inr = (n: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ForexWidget({ defaultTab = "buy" }: { defaultTab?: Mode }) {
  const [mode, setMode] = useState<Mode>(defaultTab);
  const [rates, setRates] = useState<RateMap>({});
  const [updated, setUpdated] = useState<string>("—");
  const [ratesError, setRatesError] = useState(false);

  const [currency, setCurrency] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Card + Cash");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | null>(null);
  const [siteKey, setSiteKey] = useState<string>(TURNSTILE_SITE_KEY || "");

  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const tracking = useRef<Tracking>({});

  // Capture attribution + try to autofill city once on mount.
  useEffect(() => {
    tracking.current = captureTracking();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
            .then((r) => r.json())
            .then((d) => {
              const a = d.address || {};
              const c = a.city || a.town || a.state_district || a.state;
              if (c) setCity((prev) => prev || c);
            })
            .catch(() => {});
        },
        () => {},
        { timeout: 5000 }
      );
    }
  }, []);

  // Fetch rates from our own server proxy (margins applied server-side).
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/rates")
        .then((r) => r.json())
        .then((d) => {
          if (!alive) return;
          if (d.ok && d.rates) {
            setRates(d.rates);
            setRatesError(false);
            setUpdated(new Date().toLocaleTimeString());
          } else setRatesError(true);
        })
        .catch(() => alive && setRatesError(true));
    load();
    const id = setInterval(load, 90_000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  // Get the Turnstile site key at runtime (works even if the env var is "Sensitive").
  useEffect(() => {
    if (siteKey) return;
    fetch("/api/config")
      .then((r) => r.json())
      .then((d) => { if (d.turnstileSiteKey) setSiteKey(d.turnstileSiteKey); })
      .catch(() => {});
  }, [siteKey]);

  // Cloudflare Turnstile — load script + render the widget once we have a site key.
  useEffect(() => {
    if (!siteKey) return;
    const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    const render = () => {
      const ts = window.turnstile;
      if (!ts || !turnstileRef.current || turnstileId.current) return;
      turnstileId.current = ts.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: (t: string) => setTurnstileToken(t),
        "error-callback": () => setTurnstileToken(""),
        "expired-callback": () => setTurnstileToken(""),
      });
    };
    if (window.turnstile) { render(); return; }
    let s = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
    if (!s) {
      s = document.createElement("script");
      s.src = SRC; s.async = true; s.defer = true;
      document.head.appendChild(s);
    }
    s.addEventListener("load", render);
    return () => { s?.removeEventListener("load", render); };
  }, [siteKey]);

  const options = useMemo(() => {
    const have = ALLOWED.filter((c) => rates[c]);
    const pref = PREFERRED.filter((c) => rates[c]);
    return Array.from(new Set([...pref, ...have])) as CurrencyCode[];
  }, [rates]);

  const rec = currency ? rates[currency] : null;
  const amt = parseFloat(amount) || 0;
  const rate = rec ? (mode === "sell" ? rec.sell : rec.buy) : 0;
  const total = rec ? amt * rate : 0;
  const minReq = MIN_QTY[currency] || DEFAULT_MIN;
  const meetsMin = !!currency && amt >= minReq;

  const requiredFilled =
    name.trim().length >= 2 &&
    /^\d{10}$/.test(phone) &&
    /^\S+@\S+\.\S+$/.test(email) &&
    (mode === "send" ? true : city.trim() !== "") &&
    consent;

  const canSubmit = requiredFilled && meetsMin && status !== "sending";

  async function submit() {
    if (!canSubmit) return;
    setStatus("sending");
    setErrorMsg("");
    const payload = {
      formType: mode,
      name: name.trim(),
      phone,
      email: email.trim(),
      city: city.trim(),
      service: mode === "buy" ? service : "",
      currency,
      amount,
      rate: rate ? rate.toFixed(ratePrecision(currency)) : "",
      total: total ? inr(total) : "",
      source: classifySource(tracking.current),
      tracking: tracking.current,
      company, // honeypot
      turnstileToken,
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
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

  const successCopy: Record<Mode, string> = {
    buy: "Request received. Our team will call you shortly.",
    sell: "Sell request received. We'll call you to arrange pickup.",
    send: "Remittance enquiry received. Our team will guide you.",
  };

  return (
    <div className="w-full min-w-0 max-w-full sm:max-w-[420px] rounded-xl2 bg-white shadow-card overflow-hidden">
      {/* Live ticker */}
      <div className="flex items-center gap-2 bg-deep px-3 py-2 overflow-hidden">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-accent/70 animate-ping2" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-g2 shrink-0">Live rates</span>
        <div className="flex-1 overflow-hidden">
          {Object.keys(rates).length ? (
            <div className="inline-flex whitespace-nowrap animate-marquee">
              {[0, 1].map((dup) => (
                <span key={dup} className="inline-flex">
                  {options.map((code) => {
                    const r = mode === "sell" ? rates[code].sell : rates[code].buy;
                    return (
                      <span key={dup + code} className="text-[11px] font-bold text-g2 mr-3.5">
                        <span className="text-accent mr-0.5">{code}</span>₹{r.toFixed(tickerPrecision(code))}
                      </span>
                    );
                  })}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-[11px] font-bold text-g4">
              {ratesError ? "Rates unavailable — request a custom quote" : "Connecting…"}
            </span>
          )}
        </div>
        <div className="text-[9px] font-mono text-g4 shrink-0">{updated}</div>
      </div>

      <div className="p-3.5">
        {/* Tabs */}
        <div className="flex gap-1 rounded-full bg-ink/5 p-1 mb-3" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.mode}
              type="button"
              role="tab"
              aria-selected={mode === t.mode}
              onClick={() => { setMode(t.mode); setStatus("idle"); }}
              className={`flex-1 rounded-full py-2 text-[11px] font-bold transition ${
                mode === t.mode
                  ? "bg-accent text-dark-green shadow-glow"
                  : "text-g4 hover:bg-accent/10 hover:text-dark-green"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="relative min-w-0">
            <label className="absolute top-1.5 left-3 text-[9px] font-bold uppercase tracking-[0.15em] text-g3 pointer-events-none">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full min-w-0 appearance-none rounded-xl border border-g2 bg-white pt-[22px] pb-1.5 pl-3 pr-7 text-[13px] font-bold text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
            >
              <option value="" disabled>Select</option>
              {options.map((c) => (
                <option key={c} value={c}>{CURRENCY_META[c].flag} {c} — {CURRENCY_META[c].name}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-[58%] -translate-y-1/2 text-g3">▾</span>
          </div>
          <div className="relative min-w-0">
            <label className="absolute top-1.5 left-3 text-[9px] font-bold uppercase tracking-[0.15em] text-g3 pointer-events-none">Amount</label>
            <input
              type="number" min={0} inputMode="decimal" placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl border border-g2 bg-white pt-[22px] pb-1.5 px-3 text-[13px] font-bold text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent/15"
            />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-accent/30 bg-mint px-3 py-2.5 mb-2">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-g4 mb-0.5">
              {mode === "sell" ? "You receive (INR)" : "Total cost (INR)"}
            </div>
            <div className="text-xl font-extrabold leading-none text-dark-green">{total ? inr(total) : "0.00"}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-g4 mb-0.5">Rate</div>
            <div className="font-mono text-[11px] font-bold text-dark-green">
              {rate ? rate.toFixed(ratePrecision(currency)) : "--"}
            </div>
          </div>
        </div>

        {currency && amt > 0 && !meetsMin && (
          <div className="mb-2 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-[10.5px] font-semibold leading-snug text-red-800">
            Minimum order: {minReq.toLocaleString("en-IN")} {currency}
          </div>
        )}

        {/* Form / success */}
        {status === "done" ? (
          <div className="animate-pop rounded-2xl border border-accent/35 bg-gradient-to-br from-accent/15 to-accent/5 px-4 py-4 text-center text-[13px] font-bold text-dark-green">
            ✓ {successCopy[mode]}
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); submit(); }}
            className="space-y-2"
          >
            {/* Honeypot — hidden from humans */}
            <input
              type="text" name="company" tabIndex={-1} autoComplete="off"
              value={company} onChange={(e) => setCompany(e.target.value)}
              className="hidden" aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                required placeholder="Full Name" autoComplete="name"
                value={name} onChange={(e) => setName(e.target.value)}
                className="rounded-full border border-g2 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-g3 focus:border-accent focus:ring-4 focus:ring-accent/12"
              />
              <input
                required type="tel" inputMode="numeric" maxLength={10} placeholder="Mobile Number"
                value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="rounded-full border border-g2 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-g3 focus:border-accent focus:ring-4 focus:ring-accent/12"
              />
              {mode !== "send" && (
                <input
                  required placeholder="City" autoComplete="address-level2"
                  value={city} onChange={(e) => setCity(e.target.value)}
                  className="rounded-full border border-g2 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-g3 focus:border-accent focus:ring-4 focus:ring-accent/12"
                />
              )}
              <input
                required type="email" placeholder="Email Address" autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className={`rounded-full border border-g2 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-g3 focus:border-accent focus:ring-4 focus:ring-accent/12 ${mode === "send" ? "sm:col-span-2" : "col-span-1"}`}
              />
            </div>

            {mode === "buy" && (
              <div>
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-g4">Choose service</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {["Card + Cash", "Forex Card", "Cash Only"].map((s) => (
                    <label key={s} className="cursor-pointer">
                      <input
                        type="radio" name="service" className="peer hidden"
                        checked={service === s} onChange={() => setService(s)}
                      />
                      <span className="flex items-center justify-center rounded-full border border-accent bg-white px-1 py-2 text-center text-[11px] font-semibold text-dark-green transition peer-checked:bg-accent peer-checked:ring-2 peer-checked:ring-accent/30">
                        {s}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <label className="flex items-center gap-2 text-[11.5px] font-medium text-black leading-snug cursor-pointer">
              <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="accent-accent" />
              <span>I agree to the <a href="/privacy" className="font-semibold underline whitespace-nowrap">Privacy Policy</a></span>
            </label>

            {status === "error" && (
              <div className="rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] font-semibold text-red-800">
                {errorMsg}
              </div>
            )}

            {siteKey && <div ref={turnstileRef} className="flex justify-center" />}

            <button
              type="submit"
              disabled={!canSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-[13px] font-extrabold text-dark-green shadow-glow transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {status === "sending"
                ? "Sending…"
                : mode === "buy" ? "Buy Forex" : mode === "sell" ? "Sell Forex" : "Send Money"}
              <span aria-hidden>→</span>
            </button>
            <p className="text-center text-[10px] text-g5">
              RBI-compliant · KYC-guided · No spam calls
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
