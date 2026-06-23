import type { Metadata } from "next";
import Link from "next/link";
import ForexCard from "@/components/ForexCard";
import FAQ from "@/components/FAQ";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Forex Card — Zero Markup Multi-Currency Travel Card | Matrix Forex",
  description:
    "Load 40+ currencies at a locked-in rate and spend worldwide on the Visa network with zero forex markup. RBI-authorised, multi-currency, instant block, 24-hour issuance. Apply free.",
  alternates: { canonical: "/forex-card" },
};

const benefits = [
  { t: "Zero forex markup", d: "Spend at the rate you locked in — not the 2.5–3.5% inflated rate banks add to every swipe.", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { t: "One card, many currencies", d: "Hold up to 14+ currencies on a single card and switch seamlessly as you cross borders.", icon: "M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" },
  { t: "Lock your rate", d: "Load today and a falling rupee can't touch your travel budget. No surprises abroad.", icon: "M6 10V8a6 6 0 0 1 12 0v2M5 10h14v10H5z" },
  { t: "Safer than cash", d: "Not linked to your bank account. Chip-and-PIN protected, and freeze it instantly from the app if lost.", icon: "M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" },
  { t: "Reload in minutes", d: "Top up online or from the app — even mid-trip — without visiting a branch.", icon: "M21 12a9 9 0 1 1-3-6.7M21 4v5h-5" },
  { t: "Your money back", d: "Withdraw or refund any unused balance once you're home. Nothing goes to waste.", icon: "M3 7h18v12H3zM3 11h18M7 15h4" },
  { t: "Accepted everywhere", d: "Shops, hotels, restaurants, ATMs and online checkouts across 150+ countries on the Visa network.", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M2 12h20" },
  { t: "Ready in 24 hours", d: "Apply today and travel-ready tomorrow, with doorstep delivery across our eight cities.", icon: "M12 6v6l4 2M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20" },
];

const steps = [
  { n: "01", t: "Apply in minutes", d: "Share your passport, visa and ticket. We handle the KYC and FEMA paperwork." },
  { n: "02", t: "Load your currency", d: "Pick the currencies you need and lock in today's live rate, markup-free." },
  { n: "03", t: "Spend & withdraw abroad", d: "Tap, swipe or withdraw local cash from ATMs in 150+ countries." },
  { n: "04", t: "Reload or refund", d: "Top up on the go, or get any unused balance back when you return." },
];

const compare = [
  { f: "Forex markup", card: "0%", debit: "2.5%–3.5%", credit: "~2%–3.5%", cash: "Poor counter rates" },
  { f: "Exchange rate", card: "Locked when you load", debit: "Fluctuates daily", credit: "Fluctuates + interest", cash: "Fixed once bought" },
  { f: "Multiple currencies", card: "Up to 14+ on one card", debit: "No", credit: "No", cash: "One at a time" },
  { f: "If lost or stolen", card: "Freeze instantly · not linked to your bank", debit: "Your bank balance is exposed", credit: "Your credit line is exposed", cash: "Gone for good" },
  { f: "ATM withdrawals abroad", card: "Yes · low fees", debit: "Yes · high fees", credit: "Cash-advance fee + interest", cash: "—" },
  { f: "Reloadable", card: "Yes · from the app", debit: "—", credit: "—", cash: "No" },
  { f: "Leftover money", card: "Refundable", debit: "—", credit: "—", cash: "Hard to reconvert" },
];

const destinations = [
  { src: "/img/travel/london.webp", label: "London", sub: "United Kingdom" },
  { src: "/img/travel/schengen.webp", label: "Paris", sub: "Schengen" },
  { src: "/img/travel/switzerland.webp", label: "Zürich", sub: "Switzerland" },
  { src: "/img/travel/singapore.webp", label: "Singapore", sub: "Singapore" },
  { src: "/img/travel/japan.webp", label: "Tokyo", sub: "Japan" },
  { src: "/img/pages/bali.webp", label: "Bali", sub: "Indonesia" },
  { src: "/img/pages/sydney.webp", label: "Sydney", sub: "Australia" },
  { src: "/img/travel/vietnam.webp", label: "Hanoi", sub: "Vietnam" },
];

const faqs = [
  { q: "What exactly is a forex card?", a: "It's a prepaid travel card you load with foreign currency before you travel. You spend it abroad like a debit card — at shops, online and at ATMs — but at the locked-in rate you got when loading, instead of paying your bank's foreign-transaction markup." },
  { q: "How is it cheaper than my regular bank card?", a: "Standard Indian debit and credit cards add a forex markup of roughly 2.5–3.5% on every overseas transaction, plus ATM charges. A Matrix Forex Card removes that markup. On a €2,000 trip that difference alone is around ₹4,600–6,440." },
  { q: "What documents do I need to apply?", a: "Your passport is mandatory, and for most cards we'll also need your visa and confirmed travel ticket. We complete the KYC for you — it takes only a few minutes." },
  { q: "How many currencies can I load?", a: "Our multi-currency card holds 14+ major currencies at once — USD, EUR, GBP, AED, SGD, AUD and more. Loading the currency of the country you're visiting also avoids cross-currency conversion fees of around 3.5%." },
  { q: "Can I withdraw cash from ATMs abroad?", a: "Yes. You can withdraw local currency from ATMs worldwide. RBI rules cap the cash component of your forex to under ₹50,000 per trip, so the card is the ideal way to carry the rest." },
  { q: "What happens if I lose the card?", a: "Because it isn't linked to your bank account, your other money is never exposed. You can freeze and replace it instantly from the app, and we'll help arrange an emergency replacement abroad." },
  { q: "What happens to unused balance?", a: "Any balance left over after your trip can be withdrawn or refunded back to you in rupees. Some cards also let you spend the leftover balance back in India." },
  { q: "Is there any tax (TCS) on loading a forex card?", a: "Forex-card loads count toward the RBI Liberalised Remittance Scheme. There's no TCS on the first ₹10 lakh you load across a financial year; above that a small TCS may apply depending on purpose — and it's adjustable against your income tax or refundable when you file your return. We'll explain it for your situation." },
];

export default function ForexCardPage() {
  return (
    <div className="bg-paper">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-deep text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/pages/dubai-night.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,24,14,.55) 0%, rgba(0,52,27,.75) 55%, #05180e 100%)" }} />
        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center md:py-32">
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">RBI-Authorised · Zero Markup</span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.04] md:text-6xl">One card. Every currency.<br /><span className="text-accent">Zero markup.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            Load 40+ world currencies at a locked-in rate and spend anywhere Visa is accepted — without the 2.5–3.5% markup your bank quietly adds to every swipe abroad.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="#apply" className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-bold text-dark-green shadow-glow transition hover:-translate-y-0.5">Apply free — ready in 24 hrs →</Link>
            <Link href="#how" className="rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-bold text-white transition hover:border-accent">How it works</Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/55">
            <span>150+ countries</span><span className="opacity-40">·</span>
            <span>Instant lock &amp; block</span><span className="opacity-40">·</span>
            <span>Reload from the app</span><span className="opacity-40">·</span>
            <span>★ 4.9 · 2.5 Lakh+ customers</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">The hidden cost</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight text-ink">Your bank charges you to travel</h2>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-g5">
              Every time you swipe a regular Indian debit or credit card abroad, a forex markup of 2.5–3.5% is quietly added on top of the exchange rate — before you even count ATM fees. Spend in a currency your card doesn&apos;t hold and you&apos;re hit again with a cross-currency fee of around 3.5%. It adds up fast, and most travellers never see it.
            </p>
          </div>
          <div className="rounded-3xl border border-g2 bg-white p-8 text-center shadow-sm">
            <div className="text-[13px] font-semibold uppercase tracking-wide text-ink/50">Lost on a €2,000 Europe trip</div>
            <div className="mt-2 font-display text-5xl font-extrabold text-leaf-dark">₹4,600–6,440</div>
            <div className="mt-2 text-[13px] text-g5">in markup alone — money a zero-markup card keeps in your pocket.</div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-sage/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">Why the Matrix Forex Card</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Built for how Indians travel</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.t} className="rounded-2xl border border-g2 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-leaf-dark">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon} /></svg>
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{b.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-g5">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">How it works</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">From apply to abroad in four steps</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-g2 bg-white p-6">
              <div className="font-display text-3xl font-extrabold text-accent">{s.n}</div>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{s.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-g5">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">Side by side</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold">Forex card vs the rest</h2>
          </div>
          <div className="mt-9 overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-[14px]">
              <thead>
                <tr className="text-white/60">
                  <th className="py-3 pr-4 font-medium"></th>
                  <th className="rounded-t-xl bg-accent/15 px-4 py-3 font-display text-[15px] font-extrabold text-accent">Matrix Forex Card</th>
                  <th className="px-4 py-3 font-semibold">Bank debit card</th>
                  <th className="px-4 py-3 font-semibold">Credit card</th>
                  <th className="px-4 py-3 font-semibold">Cash</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((r, i) => (
                  <tr key={r.f} className="align-top">
                    <td className="border-t border-white/10 py-4 pr-4 font-semibold text-white">{r.f}</td>
                    <td className={`border-t border-accent/20 bg-accent/10 px-4 py-4 font-medium text-white ${i === compare.length - 1 ? "rounded-b-xl" : ""}`}>{r.card}</td>
                    <td className="border-t border-white/10 px-4 py-4 text-white/65">{r.debit}</td>
                    <td className="border-t border-white/10 px-4 py-4 text-white/65">{r.credit}</td>
                    <td className="border-t border-white/10 px-4 py-4 text-white/65">{r.cash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">Goes where you go</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">One tap, anywhere in the world</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-g5">From Europe&apos;s boulevards to Asia&apos;s night markets, your card works the moment you land — in local currency, at the rate you locked.</p>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
          {destinations.map((d) => (
            <div key={d.label} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={d.src} alt={`${d.label}, ${d.sub}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 35%, rgba(7,16,10,.85) 100%)" }} />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="font-display text-xl font-extrabold text-white">{d.label}</div>
                <div className="text-[12px] font-medium uppercase tracking-wide text-white/70">{d.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPLY — interactive card + form */}
      <div id="apply">
        <ForexCard />
      </div>

      {/* TCS NOTE */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="rounded-3xl border border-g2 bg-white p-8 shadow-sm">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">Good to know</span>
          <h2 className="mt-2 font-display text-2xl font-extrabold text-ink">A quick word on TCS</h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-g5">
            Forex-card loads count toward the RBI Liberalised Remittance Scheme — up to USD 250,000 per person per financial year. There&apos;s <strong className="text-ink">no TCS on the first ₹10 lakh</strong> you load across the year. Above that, a small TCS (2% for most travel-related loads, up to 20% for investment purposes) may apply — but it isn&apos;t an extra cost. It&apos;s an advance tax, fully adjustable against your income-tax liability or refundable when you file your return.
          </p>
          <p className="mt-3 text-[12px] text-ink/45">Rates reflect the Finance Act 2026. Matrix Forex is not a tax advisor; please confirm specifics for your situation.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sage/40 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-center font-display text-4xl font-extrabold text-ink">Forex card questions, answered</h2>
          <div className="mt-9"><FAQ items={faqs} /></div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-5 py-16 text-center">
          <h2 className="font-display text-4xl font-extrabold text-dark-green">Ready to travel smarter?</h2>
          <p className="max-w-md text-[15px] text-dark-green/75">Get your zero-markup Matrix Forex Card delivered free in 24 hours.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="#apply" className="rounded-full bg-dark-green px-7 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5">Apply for your card →</Link>
            <a href={site.phoneHref} className="rounded-full border border-dark-green/30 px-7 py-3.5 text-[15px] font-bold text-dark-green transition hover:bg-dark-green/5">Call {site.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
