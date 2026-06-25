import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import Stat from "@/components/Stat";
import AboutTimeline from "@/components/AboutTimeline";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Matrix Forex has simplified foreign exchange for Indian travellers since 2011 — 2 lakh+ customers, 8 branches, ₹4,000 crore exchanged, and zero markup. Read our story.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Matrix Forex — Fifteen Years of Trust",
    description:
      "From a single Forex Card in 2011 to a country-wide, RBI-authorised platform. Two lakh customers, ₹4,000 crore exchanged, zero markup.",
    url: "/about",
    type: "website",
  },
};

// FinancialService + breadcrumb structured data. Kept to facts we can stand
// behind (no aggregateRating in schema — that needs verifiable review counts).
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    foundingDate: "2011",
    description:
      "RBI-Authorised Dealer Category-II foreign exchange and remittance company. Buy and sell foreign currency, order multi-currency forex cards, and send money abroad at transparent, zero-markup rates.",
    areaServed: "IN",
    telephone: "+919560807781",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "7, Khullar Farms, Mandi Road, Mehrauli",
      addressLocality: "New Delhi",
      postalCode: "110030",
      addressRegion: "DL",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/_matrix_forex_",
      "https://www.facebook.com/share/17ehJ3iz4W/",
      "https://x.com/matrixforex_in",
      "https://www.linkedin.com/company/matrixforex/",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "About", item: site.url + "/about" },
    ],
  },
];

const TICKER = ["USD", "EUR", "GBP", "AED", "SGD", "JPY", "AUD", "CAD", "CHF", "THB", "SAR", "NZD"];

const VALUES = [
  {
    t: "Zero hidden markup",
    d: "The rate you see is the live interbank rate. No spread baked in, no margin hidden inside the number — what you are quoted is what you pay.",
    icon: "M4 18 9 12l3.5 3.5L20 7M20 7h-5M20 7v5",
  },
  {
    t: "Regulated by design",
    d: "We hold our own RBI Authorised Dealer Category-II licence and document every transaction to FEMA standards. Compliance is not an add-on; it is the foundation.",
    icon: "M3 7h18M3 7l9-4 9 4M5 7v10m14-10v10M3 17h18M9 11v4m6-4v4",
  },
  {
    t: "Real people, direct",
    d: "Call us and you reach our branch team, not a call-centre queue. Foreign exchange is personal — a trip, a tuition, a treatment — and our service is too.",
    icon: "M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z",
  },
  {
    t: "Built for how India travels",
    d: "Same-day doorstep delivery in the metros, one card for 15+ currencies, and every channel you use — designed around the Indian traveller, student and business.",
    icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  },
];

const CREDENTIALS = [
  { t: "RBI Authorised Dealer", s: "Category-II — our own licence", icon: "M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z" },
  { t: "Licence No. NDL-ADII-0023-2023", s: "Held directly by Matrix Forex", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h4" },
  { t: "FEMA-compliant", s: "Documented on every transaction", icon: "M20 6 9 17l-5-5" },
  { t: "Registered in New Delhi", s: "Mehrauli — serving all of India", icon: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" },
];

const BRANCHES = [
  { city: "Delhi", area: "Mehrauli" },
  { city: "Mumbai", area: "Andheri East" },
  { city: "Bangalore", area: "Tasker Town" },
  { city: "Chennai", area: "Royapettah" },
  { city: "Hyderabad", area: "Kondapur" },
  { city: "Pune", area: "Hadapsar" },
  { city: "Kanpur", area: "The Mall Road" },
  { city: "Tiruppur", area: "Avinashi Road" },
];

const REVIEWS = [
  { q: "Reliable and transparent currency exchange with competitive rates. The process is smooth and customer support is responsive.", n: "Harish Srini", l: "Verified Customer", c: "#02e375" },
  { q: "Well structured and smooth process. They gave me the best price in the market. Definitely suggest Matrix for travel needs.", n: "Shivam Krishnam", l: "Verified Customer · Delhi", c: "#10b981" },
  { q: "Very fast and efficient unlike other platforms who put you in a lot of hassle. Matrix is my preferred forex platform.", n: "Ashita Panda", l: "Verified Customer · Pune", c: "#f59e0b" },
  { q: "Excellent service. The staff was friendly and helpful. I got my card activated instantly.", n: "Pooja Kohli", l: "Verified Customer · Delhi", c: "#3b82f6" },
  { q: "Wanted INR to Malaysian Ringgit, delivered same day. Best service and pricing in Bangalore.", n: "Madhusudan B N", l: "Verified Customer · Bangalore", c: "#8b5cf6" },
  { q: "Got my USD delivered in 4 hours at better rates than the local forex shop. Will not go anywhere else.", n: "Arjun K", l: "Verified Customer · Bangalore", c: "#ef4444" },
];

function Glyph({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function About() {
  return (
    <div className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-deep text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/pages/newyork.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-[0.22]" />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,24,14,.62) 0%, rgba(0,52,27,.78) 55%, #05180e 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute right-[8%] top-[14%] h-[420px] w-[420px] rounded-full" style={{ background: "rgba(2,227,117,.16)", filter: "blur(120px)" }} />

        <div className="relative mx-auto max-w-5xl px-5 pb-28 pt-20 text-center md:pb-32 md:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Our story · since 2011
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-extrabold leading-[1.04] md:text-6xl">
            Fifteen years of trust,<br />
            <span className="text-accent">one rate at a time.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            Matrix Forex began with a single travel card and one belief: Indians deserve the real exchange rate, with nothing hidden inside it. Fifteen years on, that belief has scaled to a country-wide, RBI-authorised platform.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
            {[
              ["15", "Years"],
              ["8", "Cities"],
              ["2 L+", "Customers"],
              ["₹4,000 Cr+", "Exchanged"],
            ].map(([big, small]) => (
              <div key={small}>
                <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">{big}</div>
                <div className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-g4">{small}</div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="#journey" className="rounded-full bg-accent px-7 py-3.5 text-[15px] font-bold text-dark-green shadow-glow transition hover:-translate-y-0.5">Read our journey →</Link>
            <Link href="/contact" className="rounded-full border border-white/25 px-7 py-3.5 text-[15px] font-bold text-white transition hover:border-accent">Talk to us</Link>
          </div>
        </div>

        {/* Ambient currency ticker */}
        <div aria-hidden className="relative overflow-hidden border-t border-white/10 py-3">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0">
                {TICKER.map((c) => (
                  <span key={dup + c} className="mx-5 font-mono text-[13px] font-medium uppercase tracking-[0.3em] text-white/15">
                    {c} / INR
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">Who we are</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight text-ink">Foreign exchange, without the fine print</h2>
          </div>
          <div className="space-y-4 text-[15.5px] leading-relaxed text-g5">
            <p>
              Matrix Forex Services Pvt. Ltd. is an RBI-Authorised Dealer Category-II foreign exchange and remittance company. We help travellers, students and businesses buy currency, sell leftover forex, order multi-currency forex cards, and send money abroad — at the live interbank rate, with zero markup.
            </p>
            <p>
              The model is deliberately simple. We hold our own RBI licence, so every order is handled and documented by us directly. There is no spread quietly added to the rate, no call-centre between you and an answer, and no surprise at pickup. Just the right rate, the right paperwork, and a real person when you need one.
            </p>
          </div>
        </div>
      </section>

      {/* JOURNEY — cinematic scroll-driven story */}
      <section id="journey" className="scroll-mt-20 bg-deep text-white">
        <AboutTimeline />
      </section>

      {/* NUMBERS */}
      <section className="bg-sage/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">By the numbers</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Fifteen years, measured</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            <Stat value={15} label="Years in forex" />
            <Stat value={8} label="Cities across India" />
            <Stat value={4000} prefix="₹" suffix=" Cr+" label="Exchanged to date" />
            <Stat value={200000} suffix="+" label="Customers served" />
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">What we stand for</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Four principles, held since day one</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.t} className="rounded-2xl border border-g2 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-mint text-leaf-dark">
                <Glyph d={v.icon} />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{v.t}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-g5">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="relative overflow-hidden bg-deep text-white" style={{ backgroundImage: "radial-gradient(115% 95% at 80% 0%, #0b3d27 0%, #00341B 42%, #05180e 100%)" }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">Trust &amp; compliance</span>
              <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight">Regulated, documented, accountable</h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
                Foreign exchange runs on trust, so we put the credentials up front. Matrix Forex is licensed by the Reserve Bank of India and reachable on every channel you already use.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Phone", "App", "Website", "WhatsApp", "In person"].map((ch) => (
                  <span key={ch} className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] font-medium text-white/80">{ch}</span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {CREDENTIALS.map((c) => (
                <div key={c.t} className="rounded-2xl border border-white/12 bg-white/[0.05] p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Glyph d={c.icon} />
                  </span>
                  <div className="mt-3.5 font-display text-[15px] font-bold leading-snug text-white">{c.t}</div>
                  <div className="mt-1 text-[12.5px] text-white/55">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-leaf-dark">Where to find us</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Walk into any of our eight branches</h2>
          </div>
          <Link href="/locations" className="text-[14px] font-semibold text-mid-green transition hover:text-accent">See all addresses →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {BRANCHES.map((b) => (
            <Link
              key={b.city}
              href="/locations"
              className="group flex items-center gap-3 rounded-2xl border border-g2 bg-white p-5 transition hover:-translate-y-1 hover:border-accent hover:shadow-md"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint text-leaf-dark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <span>
                <span className="block font-display text-[15px] font-bold text-ink group-hover:text-mid-green">{b.city}</span>
                <span className="block text-[12px] text-g4">{b.area}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-paper py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Trusted by global Indians</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Rated 4.9 / 5 by 2.5 lakh+ customers</h2>
            <p className="mt-3 text-[15px] text-g5">Real stories from travellers, students and families.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <div key={r.n} className="rounded-2xl border border-g2 bg-white p-6">
                <div className="mb-3 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#fbbc04" aria-hidden="true"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.06 1.1-6.47-4.7-4.58 6.5-.95L12 2.5z" /></svg>
                  ))}
                </div>
                <p className="text-[14px] leading-relaxed text-g5">&ldquo;{r.q}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full font-display text-sm font-bold text-white" style={{ background: r.c }}>{r.n.charAt(0)}</span>
                  <div>
                    <div className="text-[13px] font-bold text-ink">{r.n}</div>
                    <div className="text-[11.5px] text-g4">{r.l}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-5 py-16 text-center">
          <h2 className="font-display text-4xl font-extrabold text-dark-green">Experience the Matrix difference</h2>
          <p className="max-w-md text-[15px] text-dark-green/75">Zero markup, doorstep delivery, RBI-authorised — India&apos;s most trusted forex platform since 2011.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="rounded-full bg-dark-green px-7 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5">Get the best rate →</Link>
            <Link href="/locations" className="rounded-full border border-dark-green/30 px-7 py-3.5 text-[15px] font-bold text-dark-green transition hover:bg-dark-green/5">Find a branch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
