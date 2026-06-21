"use client";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-g2 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" aria-label="Matrix Forex home" className="flex items-center">
          <img src="/img/matrix-logo.png" alt="Matrix Forex" className="h-8 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
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

      {open && (
        <nav className="border-t border-g2 bg-white px-5 py-3 md:hidden">
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
