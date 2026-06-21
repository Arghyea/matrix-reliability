import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Services", description: "Forex services from Matrix Forex." };

const services = [
  { t: "Buy Forex", d: "Order foreign currency cash or load a multi-currency forex card in 28+ currencies. Live rates, doorstep delivery." },
  { t: "Sell Forex", d: "Sell leftover currency from your trip at fair buy-back rates. Quick payout to your account." },
  { t: "Send Money Abroad", d: "Outward remittance for education fees, family maintenance, medical and travel — fully documented under LRS." },
  { t: "Forex Cards", d: "Prepaid travel cards that lock your rate and work worldwide. Reload on the go." },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Services</span>
      <h1 className="mt-2 font-display text-5xl font-extrabold text-ink">Foreign exchange, done right</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.t} className="rounded-2xl border border-g2 bg-g1 p-7">
            <h2 className="font-display text-2xl font-bold text-ink">{s.t}</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-g5">{s.d}</p>
            <Link href="/#book" className="mt-4 inline-block text-[14px] font-semibold text-mid-green hover:text-accent">Get a quote →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
