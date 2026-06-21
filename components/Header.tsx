"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-deep/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-dark-green font-display text-lg font-extrabold">M</span>
          <span className="font-display text-lg font-bold tracking-tight">Matrix<span className="text-accent">Forex</span></span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((n) => (
            <Link key={n.label} href={n.href} className="text-[14px] font-medium text-g2 transition hover:text-accent">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.phoneHref} className="hidden text-[14px] font-semibold text-white sm:block">{site.phone}</a>
          <Link href="/#book" className="rounded-full bg-accent px-5 py-2 text-[14px] font-bold text-dark-green shadow-glow transition hover:-translate-y-0.5">
            Book now
          </Link>
          <button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-white md:hidden" aria-label="Menu">
            ☰
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-deep px-5 py-3 md:hidden">
          {site.nav.map((n) => (
            <Link key={n.label} href={n.href} onClick={() => setOpen(false)} className="block py-2 text-[15px] font-medium text-g2">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
