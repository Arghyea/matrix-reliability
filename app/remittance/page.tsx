import type { Metadata } from "next";
import Link from "next/link";
import RemittanceForm from "@/components/RemittanceForm";
import FAQ from "@/components/FAQ";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Outward Remittance — Send Money Abroad Under LRS | Matrix Forex",
  description:
    "Send money abroad for education, family, medical, travel or investment under the RBI's Liberalised Remittance Scheme. Live rates, transparent TCS, FEMA-compliant paperwork handled. RBI-authorised AD-II.",
  alternates: { canonical: "/remittance" },
};

const useCases = [
  { t: "Family maintenance", d: "Support parents, a spouse or children living abroad with regular, hassle-free transfers.", icon: "M16 11a4 4 0 1 0-8 0M3 21a7 7 0 0 1 14 0M19 8v6M22 11h-6" },
  { t: "Medical treatment", d: "Pay hospitals and clinics overseas for treatment, with paperwork sorted quickly.", icon: "M12 5v14M5 12h14" },
  { t: "Travel & tour", d: "Settle hotels, tour operators and trip costs in the destination's local currency.", icon: "M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" },
  { t: "Overseas investment", d: "Fund foreign stocks, property or accounts within your LRS limit, fully documented.", icon: "M4 19V5M4 19h16M8 16V9M13 16V6M18 16v-4" },
  { t: "Gifts to relatives", d: "Send a gift to close relatives abroad, structured cleanly under FEMA rules.", icon: "M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7S9 2 6.5 4 9 7 12 7M12 7s3-5 5.5-3S15 7 12 7" },
  { t: "Other permitted purposes", d: "Conference fees, subscriptions, emigration and more — if it's allowed under LRS, we can send it.", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M12 8v4l3 2" },
];

const steps = [
  { n: "01", t: "Tell us the purpose & amount", d: "Education, family, medical, travel or investment — and roughly how much." },
  { n: "02", t: "We lock a live rate & TCS", d: "Fully transparent: the rate you see is the rate you get, with any TCS shown upfront." },
  { n: "03", t: "Quick KYC & A2 form", d: "Share PAN, ID and purpose proof. We prepare the A2 declaration for you." },
  { n: "04", t: "Funds sent via SWIFT", d: "Remitted to the beneficiary's bank — usually within 1–2 working days." },
  { n: "05", t: "Receipt & TCS certificate", d: "You get a SWIFT confirmation and Form 27D for your records." },
];

const tcs = [
  { p: "Education — funded by a loan (Sec-80E institution)", rate: "0%", tone: "good" },
  { p: "Education (self-funded) & Medical treatment", rate: "2% above ₹10 lakh", tone: "good" },
  { p: "Overseas tour package", rate: "2% flat (no threshold)", tone: "mid" },
  { p: "Investment, gifts, family maintenance & other", rate: "20% above ₹10 lakh", tone: "high" },
];

const docs = [
  { t: "PAN card", d: "Mandatory for every remittance under LRS." },
  { t: "Aadhaar / passport", d: "Proof of identity and address for KYC." },
  { t: "Purpose proof", d: "Admission & fee letter (education), hospital estimate (medical), invoice, etc." },
  { t: "A2 form", d: "The FEMA declaration of purpose — we provide it and help you fill it." },
  { t: "Beneficiary details", d: "Account name, SWIFT/IBAN, bank name and address of the receiver." },
  { t: "For businesses", d: "Commercial transfers may need Form 15CA / 15CB — our team guides you." },
];

const why = [
  { t: "RBI-authorised AD-II", d: "Licensed to remit and fully FEMA-compliant — not a grey-market workaround." },
  { t: "Live, transparent rates", d: "The rate you're quoted is the rate applied. No hidden margin buried in the spread." },
  { t: "Compliance handled", d: "A2 form, purpose codes and Form 27D — all prepared and filed for you." },
  { t: "Fast SWIFT transfers", d: "Most destinations land within 1–2 working days of documentation." },
  { t: "People, not bots", d: "A remittance specialist walks you through every step, start to finish." },
  { t: "Eight cities + online", d: "Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, Pune, Kanpur & Tiruppur." },
];

const faqs = [
  { q: "How much money can I send abroad in a year?", a: "Under the RBI's Liberalised Remittance Scheme, a resident individual can remit up to USD 250,000 (or equivalent) per financial year — April to March — across all permitted purposes combined." },
  { q: "Will I have to pay TCS on my transfer?", a: "There's no TCS on your cumulative remittances up to ₹10 lakh in a financial year. Above ₹10 lakh, the rate depends on purpose: 2% for education and medical (0% if education is funded by a Section-80E loan), a flat 2% for overseas tour packages, and 20% for investments, gifts and other general remittances." },
  { q: "Is TCS an extra charge I lose?", a: "No. TCS is an advance tax, not a fee. It's adjustable against your total income-tax liability, or fully refundable when you file your ITR if your liability is lower. It shows up in your Form 26AS, and we issue Form 27D as proof." },
  { q: "Which documents do I need?", a: "Your PAN, an ID/address proof (Aadhaar or passport), proof of the purpose (such as an admission and fee letter for education), and the beneficiary's bank details. We prepare the A2 declaration with you." },
  { q: "How long does a transfer take?", a: "Once your documents are in order, most transfers reach the beneficiary's bank within 1–2 working days, depending on the destination country and bank." },
  { q: "What exchange rate will I get?", a: "A live, transparent rate — the rate you're quoted is the rate applied to your transfer, with no hidden margin. You'll see exactly what reaches the beneficiary." },
  { q: "Does spending on my credit card abroad count toward this?", a: "Currently, international credit-card spending while you are physically abroad is kept outside LRS, so no TCS applies to it. Forex-card loads and outward bank remittances, however, do fall under LRS." },
  { q: "Can a business send money abroad through you?", a: "Yes. Commercial remittances follow a different route and may require Form 15CA/15CB certification — our team will guide you through the documentation." },
];

function rateClasses(tone: string) {
  if (tone === "good") return "bg-leaf/10 text-leaf-dark";
  if (tone === "mid") return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
}

export default function RemittancePage() {
  return (
    <div className="bg-paper">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-deep text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/pages/newyork.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,24,14,.6) 0%, rgba(0,52,27,.78) 55%, #05180e 100%)" }} />
        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center md:py-32">
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">RBI-Authorised Dealer · LRS Remittance</span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">Send money abroad,<br /><span className="text-accent">the simple way.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            Pay university fees, support family, fund medical care or a trip — remitted securely under the RBI&apos;s Liberalised Remittance Scheme at live rates, with the FEMA paperwork handled for you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="#start" className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-bold text-dark-green shadow-glow transition hover:-translate-y-0.5">Start a transfer →</Link>
            <Link href="#rules" className="rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-bold text-white transition hover:border-accent">LRS &amp; TCS rules</Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/55">
            <span>RBI AD-II authorised</span><span className="opacity-40">·</span>
            <span>USD 250,000 / year</span><span className="opacity-40">·</span>
            <span>Live rates</span><span className="opacity-40">·</span>
            <span>A2 &amp; purpose code handled</span>
          </div>
        </div>
      </section>

      {/* EDUCATION FEATURE + USE CASES */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">What we send for</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">One window for every overseas payment</h2>
        </div>

        {/* Education feature */}
        <div className="mt-10 grid items-center gap-8 overflow-hidden rounded-3xl border border-g2 bg-white shadow-sm md:grid-cols-2">
          <div className="relative h-64 md:h-full md:min-h-[320px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/pages/university.webp" alt="The Radcliffe Camera at the University of Oxford" className="h-full w-full object-cover" />
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-dark-green">Most popular</span>
          </div>
          <div className="p-8 md:p-10">
            <h3 className="font-display text-3xl font-extrabold text-ink">Education abroad</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-g5">
              The biggest reason Indian families remit overseas. We send tuition straight to the university, plus living expenses to your child — at live rates, with the lowest TCS of any category. If your fees are funded by a Section-80E education loan, that TCS is <strong className="text-ink">zero</strong>.
            </p>
            <Link href="#start" className="mt-5 inline-block rounded-full bg-leaf px-6 py-3 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-leaf-dark">Pay fees abroad →</Link>
          </div>
        </div>

        {/* Other use cases */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <div key={u.t} className="rounded-2xl border border-g2 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-leaf-dark">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={u.icon} /></svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{u.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-g5">{u.d}</p>
            </div>
          ))}
        </div>

        {/* Study-abroad imagery */}
        <div className="mt-12 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">From orientation to graduation</span>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-ink">We fund every step abroad</h3>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { src: "/img/pages/students.webp", cap: "Campus life, sorted" },
            { src: "/img/pages/graduation.webp", cap: "All the way to graduation day" },
          ].map((g) => (
            <div key={g.src} className="group relative aspect-[16/9] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.cap} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(7,16,10,.82) 100%)" }} />
              <div className="absolute bottom-0 left-0 p-5 font-display text-lg font-bold text-white">{g.cap}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-sage/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">How it works</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">From rupees to abroad in five steps</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-5">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-g2 bg-white p-5">
                <div className="font-display text-2xl font-extrabold text-accent">{s.n}</div>
                <h3 className="mt-2 font-display text-[15px] font-bold leading-snug text-ink">{s.t}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-g5">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LRS & TCS RULES */}
      <section id="rules" className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">LRS &amp; TCS, made clear</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">The rules, in plain English</h2>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-g2 bg-dark-green p-8 text-white">
            <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent">Your yearly limit</div>
            <div className="mt-2 font-display text-5xl font-extrabold">USD 250,000</div>
            <p className="mt-3 text-[14px] leading-relaxed text-white/75">The most a resident individual can remit abroad per financial year (April–March), across all permitted purposes combined, under the RBI&apos;s Liberalised Remittance Scheme.</p>
          </div>
          <div className="rounded-3xl border border-g2 bg-white p-8 shadow-sm">
            <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-leaf-dark">TCS-free, every year</div>
            <div className="mt-2 font-display text-5xl font-extrabold text-ink">₹10 lakh</div>
            <p className="mt-3 text-[14px] leading-relaxed text-g5">No tax is collected on your cumulative remittances up to this amount each financial year. TCS only begins once you cross it — and even then, it&apos;s recoverable.</p>
          </div>
        </div>

        {/* TCS table */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-g2 bg-white shadow-sm">
          <div className="border-b border-g2 px-6 py-4">
            <h3 className="font-display text-lg font-extrabold text-ink">TCS rates by purpose <span className="font-normal text-ink/45">· effective 1 April 2026</span></h3>
          </div>
          <div className="divide-y divide-g2">
            {tcs.map((r) => (
              <div key={r.p} className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="text-[14.5px] font-medium text-ink">{r.p}</span>
                <span className={`shrink-0 rounded-full px-3 py-1 text-[13px] font-bold ${rateClasses(r.tone)}`}>{r.rate}</span>
              </div>
            ))}
          </div>
        </div>

        {/* reassurance */}
        <div className="mt-6 rounded-3xl border border-leaf/30 bg-leaf/[0.06] p-7">
          <h3 className="font-display text-xl font-extrabold text-ink">TCS is not an extra cost</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-g5">
            It&apos;s an advance tax — fully adjustable against your income-tax liability, or refundable through your ITR if your liability is lower. It appears in your Form 26AS, and we issue Form 27D as proof. Many travellers also keep total remittances under ₹10 lakh per person to avoid it entirely.
          </p>
          <p className="mt-3 text-[12px] text-ink/45">Rates reflect the Finance Act 2026. Matrix Forex is not a tax advisor; please confirm specifics for your situation.</p>
        </div>
      </section>

      {/* DOCUMENTATION */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">What you&apos;ll need</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold">Documents, kept simple</h2>
          </div>
          <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((d) => (
              <div key={d.t} className="bg-ink p-6">
                <h3 className="font-display text-lg font-bold text-accent">{d.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/65">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MATRIX */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">Why Matrix Forex</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Remittance done right</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {why.map((w) => (
            <div key={w.t} className="rounded-2xl border border-g2 bg-white p-6">
              <div className="flex items-center gap-2 text-leaf-dark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <h3 className="font-display text-lg font-bold text-ink">{w.t}</h3>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-g5">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section id="start" className="bg-sage/40 py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 lg:grid-cols-[1fr_1.1fr]">
          <div className="lg:pt-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">Start now</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight text-ink">Get a live quote in minutes</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-g5">
              Tell us where the money&apos;s going and why. A Matrix Forex specialist will call you with today&apos;s rate, the exact TCS (if any) and the short list of documents for your transfer.
            </p>
            <ul className="mt-6 space-y-2.5 text-[14px] text-ink">
              {["No hidden margin in the rate", "TCS shown upfront, and it's reclaimable", "A2 form & compliance handled for you", "Funds usually delivered in 1–2 working days"].map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-leaf/15 text-leaf-dark"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <RemittanceForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="text-center font-display text-4xl font-extrabold text-ink">Remittance questions, answered</h2>
        <div className="mt-9"><FAQ items={faqs} /></div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-5 py-16 text-center">
          <h2 className="font-display text-4xl font-extrabold text-dark-green">Money to send abroad?</h2>
          <p className="max-w-md text-[15px] text-dark-green/75">Get a transparent live quote and let us handle the paperwork.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="#start" className="rounded-full bg-dark-green px-7 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5">Start a transfer →</Link>
            <a href={site.phoneHref} className="rounded-full border border-dark-green/30 px-7 py-3.5 text-[15px] font-bold text-dark-green transition hover:bg-dark-green/5">Call {site.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
