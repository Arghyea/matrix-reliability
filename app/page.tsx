import ForexWidget from "@/components/ForexWidget";
import FloatingContact from "@/components/FloatingContact";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

function Ic({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const STEPS = [
  {
    n: "01",
    t: "Pick your currency & lock the rate",
    d: "Choose from 40+ currencies, enter the amount, and lock the live interbank rate online — no haggling, no surprises.",
    d2: "M3 7h18M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7l2-3h14l2 3M7 13h4",
  },
  {
    n: "02",
    t: "Share details & pay securely",
    d: "Upload KYC in minutes and pay by bank transfer, UPI or net banking. Every order is fully documented and RBI-compliant.",
    d2: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM9 12l2 2 4-4",
  },
  {
    n: "03",
    t: "Doorstep delivery or branch pickup",
    d: "Get forex cash or a card delivered to your door the same day, or collect from your nearest branch. Order before the 2 PM cut-off.",
    d2: "M2.5 6h19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z",
  },
];

const PILLARS = [
  { t: "Zero Markup", d: "The rate you see is the live interbank rate. We apply zero spread, with no hidden margin inside the rate.", p: "M4 18 9 12l3.5 3.5L20 7M20 7h-5M20 7v5" },
  { t: "RBI Cat-II Authorised", d: "Licence No. NDL-ADII-0023-2023. We hold our own RBI Category-II licence and transact directly.", p: "M3 7h18M3 7l9-4 9 4M5 7v10m14-10v10M3 17h18M9 11v4m6-4v4" },
  { t: "Doorstep Delivery", d: "Foreign currency delivered the same day across India. Order before the 2 PM cut-off.", p: "M1 6h13v9H1zM14 9h4l3 3v3h-7M5.5 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm12 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" },
  { t: "Direct Branch Access", d: "When you call, you reach our branch team directly — not a call-centre queue.", p: "M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z" },
];

const COMPARE: [string, string, string][] = [
  ["Exchange rate", "Marked up 2–5% inside the rate", "Live interbank rate · 0% markup"],
  ["Hidden charges", "Common, surface at pickup", "None — the rate is all-in"],
  ["Getting it", "Visit in person, wait in queue", "Same-day doorstep delivery"],
  ["Documentation", "Manual paperwork at the counter", "Fully digital KYC, upload online"],
  ["Support", "Call-centre queue", "Direct branch team"],
  ["Rate lock", "Changes by the minute", "Lock your rate online instantly"],
  ["Buy-back on return", "Low, unfavourable rates", "Fair, competitive buy-back"],
];

const REVIEWS = [
  { q: "Reliable and transparent currency exchange with competitive rates. The process is smooth and customer support is responsive.", n: "Harish Srini", l: "Verified Customer", c: "#02e375" },
  { q: "Well structured and smooth process. They gave me the best price in the market. Definitely suggest Matrix for travel needs.", n: "Shivam Krishnam", l: "Verified Customer · Delhi", c: "#10b981" },
  { q: "Very fast and efficient unlike other platforms who put you in a lot of hassle. Matrix is my preferred forex platform.", n: "Ashita Panda", l: "Verified Customer · Pune", c: "#f59e0b" },
  { q: "Excellent service. The staff was friendly and helpful. I got my card activated instantly.", n: "Pooja Kohli", l: "Verified Customer · Delhi", c: "#3b82f6" },
  { q: "Best currency exchange in town. Wanted INR to Malaysian Ringgit — delivered same day. Best service and pricing in Bangalore.", n: "Madhusudan B N", l: "Verified Customer · Bangalore", c: "#8b5cf6" },
  { q: "Got my USD delivered in 4 hours at better rates than the local forex shop. Won't go anywhere else.", n: "Arjun K", l: "Verified Customer · Bangalore", c: "#ef4444" },
];

const FAQS = [
  { q: "How do I buy forex online in India?", a: "Buying forex online with Matrix Forex takes under two minutes. Select your currency, enter the amount, lock your rate, and choose between doorstep delivery or pickup. We support 40+ currencies." },
  { q: "Can I get forex home delivery in my city?", a: "Yes. Matrix Forex offers forex home delivery across major Indian cities, including Bangalore, Mumbai, Delhi, Hyderabad, Chennai and Pune. Most metro orders before 2 PM are delivered the same day." },
  { q: "Is it safe to exchange money online?", a: "Absolutely. Matrix Forex is an RBI-authorised Category-II dealer. Every transaction is fully documented; the platform uses bank-grade encryption and verified delivery personnel with sealed currency packets." },
  { q: "What documents do I need to exchange currency in India?", a: "Aadhaar, PAN card, and a passport with valid visa and air ticket. Matrix Forex handles all documentation digitally — upload online and we take care of the rest." },
  { q: "Where can I exchange foreign currency after returning from a trip?", a: "Matrix Forex buys back all major foreign currencies at competitive rates. Place a sell order on our platform and schedule a pickup from your home or office." },
  { q: "How does Matrix Forex compare to airport currency exchange?", a: "Airport counters typically add a 2–5% markup inside the rate. Matrix Forex gives you the live interbank rate with zero markup. On a $1,000 exchange, that's a saving of roughly ₹1,700 to ₹4,300." },
  { q: "Do you offer forex for businesses and corporates?", a: "Yes. We offer currency exchange and forex cards for employee business travel, with FEMA-compliant documentation." },
  { q: "Can I exchange money on weekends or holidays?", a: "You can place orders on our online exchange platform at any time. Doorstep deliveries are scheduled Monday to Saturday." },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section
        id="book"
        className="relative overflow-hidden bg-deep"
        style={{ backgroundImage: "radial-gradient(115% 95% at 78% 8%, #0b3d27 0%, #00341B 38%, #05180e 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute right-[6%] top-[16%] h-[440px] w-[440px] rounded-full" style={{ background: "rgba(2,227,117,.16)", filter: "blur(120px)" }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[12px] font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> RBI Authorised Dealer · Category-II
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
              India&apos;s Smarter Way to <span className="text-accent">Exchange Currency</span>
            </h1>

            {/* Google rating badge. When ready, link this to your Google Business Profile reviews. */}
            <div className="mt-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-2">
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
                <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
              </svg>
              <span className="font-display text-base font-extrabold text-white">4.9</span>
              <span className="flex items-center gap-0.5" aria-label="rated 4.9 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04" aria-hidden="true"><path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.06 1.1-6.47-4.7-4.58 6.5-.95L12 2.5z" /></svg>
                ))}
              </span>
              <span className="text-[12px] text-g3">2.5 Lakh+ customers</span>
            </div>

            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-g2">
              Buy forex, sell foreign currency, and transfer money abroad from the comfort of your home. Zero markup, with same-day doorstep delivery across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              {[["40+", "currencies"], ["RBI", "AD-II authorised"], ["0%", "hidden markup"]].map(([big, small]) => (
                <div key={small}>
                  <div className="font-display text-3xl font-extrabold text-white">{big}</div>
                  <div className="text-[12px] uppercase tracking-wide text-g4">{small}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <ForexWidget defaultTab="buy" />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-g2 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-9 gap-y-3 px-5 py-6 text-[13px] font-semibold text-g5">
          <span className="inline-flex items-center gap-2"><Ic d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" /> 100% RBI-compliant</span>
          <span className="inline-flex items-center gap-2"><Ic d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /> Same-day delivery</span>
          <span className="inline-flex items-center gap-2"><Ic d="M3 7h18M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7l2-3h14l2 3M7 13h4" /> Forex cards in 40+ currencies</span>
          <span className="inline-flex items-center gap-2"><Ic d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z" /> No spam calls — ever</span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-accent py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-dark-green/70">How it works</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-dark-green">Exchange currency in 3 steps</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-dark-green/80">
              Forget hunting for money changers. Our online process is built for speed, transparency, and zero surprises.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl bg-deep p-7 text-white">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#02e375" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.d2} /></svg>
                  </span>
                  <span className="font-display text-3xl font-extrabold text-white/15">{s.n}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-g3">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Our services</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Every forex service on one platform</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-g5">From cash delivery to international wire transfers, Matrix Forex handles it all — transparently.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Buy Forex", d: "Cash and forex cards in 40+ currencies, delivered to your door at live rates.", path: "M2.5 6h19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM2 9.5h20M6 14h4" },
            { t: "Send Money Abroad", d: "Outward remittance for education, family maintenance, travel and more — fully documented.", path: "M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM2.5 12h19M12 2.5c2.5 2.7 3.8 6 3.8 9.5S14.5 18.8 12 21.5C9.5 18.8 8.2 15.5 8.2 12S9.5 5.2 12 2.5Z" },
            { t: "Sell Forex", d: "Returning from a trip? Sell your leftover currency at fair, transparent buy-back rates.", path: "M4 9h13l-3-3M20 15H7l3 3" },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-g2 bg-white p-7 transition hover:-translate-y-1 hover:border-accent hover:shadow-card">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-mint">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00341B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.path} /></svg>
              </div>
              <h3 className="font-display text-xl font-bold text-ink">{s.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-g5">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE MATRIX */}
      <section className="bg-dark-green py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 max-w-2xl">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">Why choose us</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold">Why choose Matrix Forex?</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-g3">The pillars that make Matrix Forex the go-to platform for forex exchange and international money transfers in India.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent/15">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#02e375" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={p.p} /></svg>
                </span>
                <h3 className="font-display text-lg font-bold">{p.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-g3">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="mb-10 max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Why Matrix?</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Matrix vs traditional dealers</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-g5">See why thousands switch from banks, airports, and street changers to Matrix Forex every month.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-g2">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-g1 text-[12px] font-bold uppercase tracking-wide text-g5">
            <div className="px-4 py-3.5 sm:px-6"></div>
            <div className="px-4 py-3.5 sm:px-6">Traditional / Airport</div>
            <div className="bg-dark-green px-4 py-3.5 text-accent sm:px-6">Matrix Forex ✓</div>
          </div>
          {COMPARE.map(([label, trad, matrix], i) => (
            <div key={label} className={`grid grid-cols-[1.2fr_1fr_1fr] text-[13.5px] ${i % 2 ? "bg-white" : "bg-g1/40"}`}>
              <div className="px-4 py-3.5 font-semibold text-ink sm:px-6">{label}</div>
              <div className="px-4 py-3.5 text-g5 sm:px-6">{trad}</div>
              <div className="border-l border-g2 bg-mint/40 px-4 py-3.5 font-semibold text-dark-green sm:px-6">{matrix}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOREX CARD */}
      <section className="overflow-hidden bg-ink py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">Zero markup card</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold leading-tight">The traveller&apos;s superpower card</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-g3">
              Stop paying 2–5% extra to banks on every foreign transaction. Load any currency and spend globally at live interbank rates with zero forex markup. Accepted in 180+ countries.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/#book" className="rounded-full bg-accent px-6 py-3 text-[14px] font-bold text-dark-green transition hover:-translate-y-0.5">Get card in 24 hrs →</Link>
              <Link href="/services" className="rounded-full border border-white/20 px-6 py-3 text-[14px] font-bold text-white transition hover:border-accent">Learn more</Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative aspect-[1.586/1] w-full max-w-[360px] rounded-2xl p-6 shadow-2xl" style={{ background: "linear-gradient(135deg, #00b85e 0%, #00341B 100%)" }}>
              <div className="flex items-center justify-between">
                <span className="font-display text-xl font-extrabold text-white">Matrix</span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/70">Forex Card</span>
              </div>
              <div className="mt-8 h-9 w-12 rounded-md bg-white/25" />
              <div className="mt-5 font-mono text-lg tracking-widest text-white">•••• •••• •••• 4781</div>
              <div className="mt-5 flex items-end justify-between text-white/85">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-white/55">Card holder</div>
                  <div className="text-[13px] font-semibold">YOUR NAME</div>
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-white/55">Expires</div>
                  <div className="text-[13px] font-semibold">12/27</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-12 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Trusted by global Indians</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Rated 4.9 / 5 by 2.5 Lakh+ customers</h2>
          <p className="mt-3 text-[15px] text-g5">Real stories from travellers, students, and families.</p>
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
      </section>

      {/* FAQ */}
      <section className="bg-g1/50 py-20">
        <div className="mx-auto max-w-3xl px-5">
          <div className="mb-10 text-center">
            <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Got questions?</span>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Frequently asked questions</h2>
          </div>
          <FAQ items={FAQS} />
        </div>
      </section>

      {/* LATEST FROM BLOG */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Insights</span>
              <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">From the blog</h2>
            </div>
            <Link href="/blog" className="text-[14px] font-semibold text-mid-green hover:text-accent">All articles →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-g2 bg-white p-6 transition hover:border-accent hover:shadow-card">
                <span className="text-[11px] font-bold uppercase tracking-wide text-mid-green">{p.category}</span>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-mid-green">{p.title}</h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-g5">{p.excerpt}</p>
                <p className="mt-4 text-[12px] text-g4">{p.date} · {p.readingTime}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-accent">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-3xl font-extrabold text-dark-green">Ready for live interbank rates with zero markup?</h2>
            <p className="mt-2 text-[14px] text-dark-green/80">Stop overpaying. Matrix Forex is transparent and RBI-authorised, with doorstep delivery across India.</p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Link href="/#book" className="rounded-full bg-dark-green px-7 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5">Buy forex now</Link>
            <Link href="/services" className="rounded-full border border-dark-green/30 px-7 py-3.5 text-[15px] font-bold text-dark-green transition hover:bg-dark-green/5">Explore services</Link>
          </div>
        </div>
      </section>

      <FloatingContact />
    </>
  );
}
