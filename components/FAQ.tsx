"use client";
import { useState } from "react";

type QA = { q: string; a: string };

export default function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-g2 overflow-hidden rounded-2xl border border-g2 bg-white">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-g1/60"
              aria-expanded={isOpen}
            >
              <span className="text-[14.5px] font-semibold text-ink">{it.q}</span>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-mid-green transition ${isOpen ? "rotate-45 bg-accent/15" : "bg-g1"}`}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </button>
            <div className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[14px] leading-relaxed text-g5">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
