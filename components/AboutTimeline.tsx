"use client";

import { useEffect, useRef, useState } from "react";

type Milestone = {
  year: string;
  title: string;
  body: string;
  metric: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2011",
    title: "We started as an FFMC",
    body:
      "Matrix Forex was founded as a Full-Fledged Money Changer and issued its first multi-currency Forex Card — built to make international travel simpler for Indian families.",
    metric: "The first Matrix Forex Card",
  },
  {
    year: "2012–14",
    title: "Official forex partner of KKR",
    body:
      "We became the official foreign-exchange partner of the Kolkata Knight Riders — putting the Matrix Forex card in the hands of cricket fans across the country.",
    metric: "Official KKR partner",
  },
  {
    year: "2016",
    title: "Fifteen currencies, one card",
    body:
      "We expanded the card to 15 currencies — Dollar, Pound, Baht, Dirham, Yen, Yuan, Won, Dong, Krona, Riyal, Franc, Krone and more — so a single card covered the whole trip.",
    metric: "15 currencies loaded",
  },
  {
    year: "2019",
    title: "One lakh families served",
    body:
      "One lakh families had trusted us with their travel money — proof that transparent, markup-free forex was exactly what Indian travellers had been waiting for.",
    metric: "1,00,000 families",
  },
  {
    year: "2020",
    title: "Upgraded to an RBI AD-II licence",
    body:
      "We earned our Authorised Dealer Category-II licence from the Reserve Bank of India — adding student, medical and hotel remittance to everything we already did.",
    metric: "RBI Authorised Dealer · Cat-II",
  },
  {
    year: "2025",
    title: "Eight cities. ₹4,000 crore.",
    body:
      "Today Matrix Forex spans eight cities and every channel you use — phone, app, website, WhatsApp and in person — with ₹4,000 crore exchanged and counting.",
    metric: "₹4,000 Cr+ · 8 cities",
  },
];

const CURRENCIES = [
  "Dollar", "Pound", "Baht", "Dirham", "Yen", "Yuan", "Won",
  "Dong", "Krona", "Riyal", "Franc", "Krone", "Ringgit", "Lira", "Rand",
];

/* ----------------------------------------------------------------------------
   Scenes — one cinematic visual per milestone. All original CSS/SVG (no
   celebrity imagery or third-party logos). `active` lets a scene kick off its
   entrance animation only when it is the one on stage; `reduced` disables motion.
---------------------------------------------------------------------------- */
function Scene({ i, active, reduced }: { i: number; active: boolean; reduced: boolean }) {
  const on = active || reduced;

  // 2011 — the first Forex Card
  if (i === 0) {
    return (
      <div className="relative grid h-full w-full place-items-center">
        <Glow color="rgba(2,227,117,.20)" />
        <div
          className="relative w-[78%] max-w-[320px]"
          style={!reduced ? { animation: "mfx-float 6s ease-in-out infinite" } : undefined}
        >
          <div
            className="aspect-[1.585/1] w-full rounded-2xl p-5 shadow-2xl ring-1 ring-white/15"
            style={{
              background:
                "linear-gradient(135deg,#0b3a22 0%,#062417 55%,#04160d 100%)",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                Matrix<span className="text-accent">·</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45">
                Forex Card
              </span>
            </div>
            <div className="mt-5 h-7 w-10 rounded-md bg-gradient-to-br from-amber-200 to-amber-400/80 ring-1 ring-amber-300/40" />
            <div className="mt-5 font-mono text-[13px] tracking-[0.18em] text-white/80">
              5282 •••• •••• 2011
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <div className="text-[7.5px] uppercase tracking-[0.18em] text-white/40">Member since</div>
                <div className="font-mono text-[12px] text-white/85">2011</div>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">FFMC</div>
            </div>
          </div>
        </div>
        <SceneTag>Full-Fledged Money Changer</SceneTag>
      </div>
    );
  }

  // 2012–14 — KKR partnership (typographic; no likeness, no logo)
  if (i === 1) {
    return (
      <div className="relative grid h-full w-full place-items-center px-6 text-center">
        <Glow color="rgba(124,77,255,.20)" />
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
            Official forex partner of
          </div>
          <div className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
            Kolkata
            <br />
            Knight Riders
          </div>
          <div className="mx-auto mt-5 flex items-center justify-center gap-2 text-accent">
            {/* cricket ball */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M7 5.5c2.5 3 2.5 10 0 13M17 5.5c-2.5 3-2.5 10 0 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="h-px w-10 bg-accent/50" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em]">2012–2014</span>
          </div>
        </div>
        <SceneTag>In the hands of cricket fans across India</SceneTag>
      </div>
    );
  }

  // 2016 — 15 currencies (signature animated reel)
  if (i === 2) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <Glow color="rgba(2,227,117,.16)" />
        {/* centre marker */}
        <div aria-hidden className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2">
          <div className="mx-auto h-[52px] w-[80%] rounded-xl border border-accent/30 bg-accent/[0.05]" />
        </div>
        {/* drifting reel, masked top + bottom */}
        <div
          className="absolute inset-0 flex justify-center"
          style={{
            maskImage: "linear-gradient(180deg,transparent 0%,#000 30%,#000 70%,transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg,transparent 0%,#000 30%,#000 70%,transparent 100%)",
          }}
        >
          <ul
            className="py-[40%] text-center"
            style={!reduced ? { animation: "mfx-vscroll 20s linear infinite" } : undefined}
          >
            {[...CURRENCIES, ...CURRENCIES].map((c, k) => (
              <li
                key={k}
                className="py-1.5 font-display text-3xl font-bold leading-tight text-white/70 sm:text-4xl"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-5 left-6 z-20">
          <div className="font-display text-5xl font-extrabold leading-none text-accent">15</div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
            currencies, one card
          </div>
        </div>
      </div>
    );
  }

  // 2019 — one lakh families (dot field)
  if (i === 3) {
    return (
      <div className="relative grid h-full w-full place-items-center px-7">
        <Glow color="rgba(2,227,117,.16)" />
        <div className="w-full">
          <div className="grid grid-cols-12 gap-[7px]">
            {Array.from({ length: 96 }).map((_, k) => (
              <span
                key={k}
                className="aspect-square rounded-full bg-accent"
                style={{
                  opacity: on ? 0.32 + ((k * 37) % 60) / 100 : 0,
                  transform: on ? "scale(1)" : "scale(0.4)",
                  transition: reduced ? undefined : `opacity .5s ease ${(k % 24) * 22}ms, transform .5s ease ${(k % 24) * 22}ms`,
                }}
              />
            ))}
          </div>
          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="font-display text-4xl font-extrabold leading-none text-white sm:text-5xl">
                1,00,000
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                families served
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2020 — RBI AD-II licence (credential seal)
  if (i === 4) {
    return (
      <div className="relative grid h-full w-full place-items-center text-center">
        <Glow color="rgba(2,227,117,.18)" />
        <div>
          <div className="relative mx-auto grid h-36 w-36 place-items-center">
            <svg
              viewBox="0 0 160 160"
              className="absolute inset-0 h-full w-full text-accent"
              style={!reduced ? { animation: "mfx-spin 26s linear infinite" } : undefined}
              aria-hidden="true"
            >
              <circle cx="80" cy="80" r="74" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="2 6" />
              <circle cx="80" cy="80" r="60" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" />
            </svg>
            <div className="grid h-24 w-24 place-items-center rounded-full border border-accent/40 bg-accent/10">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#02e375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
          <div className="mt-6 font-display text-2xl font-extrabold text-white">RBI Authorised Dealer</div>
          <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">Category-II</div>
          <div className="mt-3 inline-block rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-white/70">
            NDL-ADII-0023-2023
          </div>
        </div>
      </div>
    );
  }

  // 2025 — the scale today (rising growth chart)
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Glow color="rgba(2,227,117,.20)" />
      <svg viewBox="0 0 320 220" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="mfxArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#02e375" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#02e375" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* baseline grid */}
        {[60, 110, 160].map((y) => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
        ))}
        <path
          d="M6 178 L58 160 L104 166 L150 120 L196 128 L244 72 L314 30 L314 200 L6 200 Z"
          fill="url(#mfxArea)"
          style={{ opacity: on ? 1 : 0, transition: reduced ? undefined : "opacity .6s ease .25s" }}
        />
        <path
          d="M6 178 L58 160 L104 166 L150 120 L196 128 L244 72 L314 30"
          fill="none"
          stroke="#02e375"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: on ? 0 : 1,
            transition: reduced ? undefined : "stroke-dashoffset 1.1s ease",
          }}
        />
      </svg>
      <div className="absolute bottom-6 left-6 z-10">
        <div className="font-display text-5xl font-extrabold leading-none text-white">₹4,000<span className="text-accent"> Cr+</span></div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11.5px] font-semibold text-white/80">8 cities</span>
          <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11.5px] font-semibold text-white/80">2 lakh customers</span>
        </div>
      </div>
    </div>
  );
}

function Glow({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: color, filter: "blur(90px)" }}
    />
  );
}

function SceneTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[11.5px] font-medium text-white/65">
      {children}
    </div>
  );
}

/* ---- The stage frame, reused on desktop (one, sticky) and mobile (per card) ---- */
function Stage({ i, active, reduced }: { i: number; active: boolean; reduced: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#06120b]">
      <Scene i={i} active={active} reduced={reduced} />
    </div>
  );
}

export default function AboutTimeline() {
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;

    // A thin band at the viewport centre decides which milestone is "on stage".
    const center = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && center.observe(el));
    return () => center.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      {/* keyframes (rendered once) */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes mfx-vscroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}" +
            "@keyframes mfx-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}" +
            "@keyframes mfx-spin{to{transform:rotate(360deg)}}",
        }}
      />

      {/* Header */}
      <div className="max-w-2xl">
        <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">The journey</span>
        <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight text-white sm:text-[2.75rem]">
          From one card to a country-wide platform
        </h2>
        <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-white/60">
          Every line on a forex chart tells a story. Scroll through ours — plotted year by year, from a single travel card to an RBI-authorised platform.
        </p>
      </div>

      {/* ---------- DESKTOP: sticky media stage + scrolling steps ---------- */}
      <div className="mt-14 hidden lg:grid lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        {/* Stage (left, pinned) */}
        <div className="relative">
          <div className="sticky top-[13vh] h-[74vh]">
            {MILESTONES.map((_, i) => (
              <div
                key={i}
                aria-hidden
                className="absolute inset-0 transition-opacity duration-500 ease-out"
                style={{ opacity: active === i ? 1 : 0, pointerEvents: active === i ? "auto" : "none" }}
              >
                <Stage i={i} active={active === i} reduced={reduced} />
              </div>
            ))}

            {/* progress rail */}
            <div className="pointer-events-none absolute -left-6 top-2 bottom-2 hidden w-[3px] rounded-full bg-white/10 xl:block">
              <div
                className="w-full rounded-full bg-gradient-to-b from-accent to-mid-green transition-all duration-500"
                style={{ height: `${((active + 1) / MILESTONES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps (right, drive the scroll) */}
        <ol className="relative">
          {MILESTONES.map((m, i) => {
            const isActive = active === i;
            return (
              <li
                key={m.year}
                data-idx={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex min-h-[74vh] flex-col justify-center"
              >
                <div
                  className="transition-all duration-500"
                  style={{ opacity: isActive ? 1 : 0.32, transform: isActive ? "translateY(0)" : "translateY(6px)" }}
                >
                  <span
                    className={`inline-flex items-center rounded-full border px-3.5 py-1 font-mono text-[12.5px] font-semibold tracking-[0.12em] transition-colors duration-300 ${
                      isActive ? "border-accent/50 bg-accent/10 text-accent" : "border-white/15 text-white/50"
                    }`}
                  >
                    {m.year}
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight text-white">{m.title}</h3>
                  <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70">{m.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {m.metric}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ---------- MOBILE: stacked scene + text per milestone ---------- */}
      <ol className="mt-12 space-y-14 lg:hidden">
        {MILESTONES.map((m, i) => (
          <MobileMilestone key={m.year} m={m} i={i} reduced={reduced} />
        ))}
      </ol>
    </div>
  );
}

function MobileMilestone({ m, i, reduced }: { m: Milestone; i: number; reduced: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const [show, setShow] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setShow(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <li
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(22px)" }}
    >
      <div className="h-60 w-full">
        <Stage i={i} active={show} reduced={reduced} />
      </div>
      <div className="mt-5">
        <span className="inline-flex items-center rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[12px] font-semibold tracking-[0.12em] text-accent">
          {m.year}
        </span>
        <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white">{m.title}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{m.body}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {m.metric}
        </span>
      </div>
    </li>
  );
}
