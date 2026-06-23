"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

type Svc = { label: string; desc: string; href: string; icon: React.ReactNode };

const SERVICES: Svc[] = [
  {
    label: "Buy Forex",
    desc: "Cash & forex cards in 40+ currencies, delivered to your door.",
    href: "/#book",
    icon: <path d="M2.5 6h19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM2 9.5h20M6 14h4" />,
  },
  {
    label: "Sell Forex",
    desc: "Sell leftover foreign currency at live, fair rates.",
    href: "/#book",
    icon: <path d="M3 7h13l-3-3m3 3-3 3M21 17H8l3 3m-3-3 3-3" />,
  },
  {
    label: "Send Money Abroad",
    desc: "Outward remittance for tuition, family & travel.",
    href: "/remittance",
    icon: <path d="M2 12h20M2 12l8-8M2 12l8 8" />,
  },
  {
    label: "Forex Card",
    desc: "Multi-currency travel card with zero markup.",
    href: "/forex-card",
    icon: <path d="M2.5 6h19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM2 10h20" />,
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false); // mobile services accordion

  return (
    <header className="sticky top-0 z-40 border-b border-g2 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="Matrix Forex home" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/matrix-logo.png" alt="Matrix Forex" className="h-8 w-auto" />
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {/* Services mega-menu */}
          <div className="group relative">
            <button className="flex items-center gap-1 text-[14px] font-medium text-ink/80 transition group-hover:text-mid-green">
              Services
              <svg className="mt-0.5 transition group-hover:rotate-180" width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>

            {/* dropdown */}
            <div className="invisible absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-[1.5fr_1fr] gap-2 rounded-2xl border border-g2 bg-white p-2.5 shadow-xl shadow-ink/10">
                <div className="grid grid-cols-2 gap-1">
                  {SERVICES.map((s) => (
                    <Link key={s.label} href={s.href} className="group/i flex gap-3 rounded-xl p-3 transition hover:bg-mint/60">
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mint text-leaf-dark transition group-hover/i:bg-accent group-hover/i:text-dark-green">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold text-ink">{s.label}</span>
                        <span className="mt-0.5 block text-[12px] leading-snug text-ink/55">{s.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>

                {/* promo */}
                <Link href="/#book" className="relative flex flex-col justify-between overflow-hidden rounded-xl p-5 text-white" style={{ background: "radial-gradient(120% 100% at 80% 0%, #0b3d27 0%, #00341B 45%, #05180e 100%)" }}>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Live rates</div>
                    <div className="mt-2 font-display text-lg font-extrabold leading-tight">Check today&apos;s best rates</div>
                    <p className="mt-1.5 text-[12px] text-white/65">Lock a zero-markup rate in under a minute.</p>
                  </div>
                  <div>
                    <div className="mt-4 inline-flex w-fit rounded-full bg-accent px-4 py-2 text-[13px] font-bold text-dark-green">Get rates →</div>
                    <div className="mt-3 text-[11px] text-white/55">★ 4.9 · 2.5 Lakh+ customers</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {site.nav.map((n) => (
            <Link key={n.label} href={n.href} className="text-[14px] font-medium text-ink/80 transition hover:text-mid-green">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/#book" className="rounded-full bg-accent px-5 py-2 text-[14px] font-bold text-dark-green shadow-glow transition hover:-translate-y-0.5">
            Get rates →
          </Link>
          <button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-lg bg-ink/5 text-ink md:hidden" aria-label="Menu">☰</button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <nav className="border-t border-g2 bg-white px-5 py-3 md:hidden">
          <button onClick={() => setSvcOpen(!svcOpen)} className="flex w-full items-center justify-between py-2 text-[15px] font-semibold text-ink">
            Services
            <svg className={`transition ${svcOpen ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {svcOpen && (
            <div className="mb-1 ml-1 border-l border-g2 pl-3">
              {SERVICES.map((s) => (
                <Link key={s.label} href={s.href} onClick={() => setOpen(false)} className="block py-1.5 text-[14px] text-ink/70">{s.label}</Link>
              ))}
            </div>
          )}

          {site.nav.map((n) => (
            <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="block py-2 text-[15px] font-medium text-ink/80">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
