"use client";

import { useEffect, useRef, useState } from "react";

type StatProps = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

// Indian grouping (4,000 · 2,00,000) — the right convention for this audience.
const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export default function Stat({ value, label, prefix = "", suffix = "", decimals = 0 }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — no count, just the final number.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || started.current) return;
          started.current = true;
          const duration = 1500;
          const t0 = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setDisplay(value * eased);
            if (t < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <div className="font-display text-[2.6rem] font-extrabold leading-none tracking-tight text-ink sm:text-5xl">
        {prefix}
        {fmt(decimals ? display : Math.round(display), decimals)}
        {suffix}
      </div>
      <div className="mt-2.5 text-[12.5px] font-semibold uppercase tracking-[0.16em] text-g4">{label}</div>
    </div>
  );
}
