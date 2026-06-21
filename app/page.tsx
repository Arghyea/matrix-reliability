import ForexWidget from "@/components/ForexWidget";
import FloatingContact from "@/components/FloatingContact";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

function Ic({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00b85e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section
        id="book"
        className="relative overflow-hidden bg-deep"
        style={{
          backgroundImage:
            "radial-gradient(115% 95% at 78% 8%, #0b3d27 0%, #00341B 38%, #05180e 100%)",
        }}
      >
        {/* soft accent glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-[16%] h-[440px] w-[440px] rounded-full"
          style={{ background: "rgba(2,227,117,.16)", filter: "blur(120px)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[12px] font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Zero-markup live rates
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
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#fbbc04" aria-hidden="true">
                    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.06 1.1-6.47-4.7-4.58 6.5-.95L12 2.5z" />
                  </svg>
                ))}
              </span>
              <span className="text-[12px] text-g3">Google Reviews</span>
            </div>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-g2">
              Buy, sell, and remit foreign currency at transparent, bank-beating
              rates. RBI-authorised, KYC-guided, and delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                ["28+", "currencies"],
                ["RBI", "AD-II authorised"],
                ["0%", "hidden markup"],
              ].map(([big, small]) => (
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
          <span className="inline-flex items-center gap-2"><Ic d="M3 7h18M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7l2-3h14l2 3M7 13h4" /> Forex cards in 28+ currencies</span>
          <span className="inline-flex items-center gap-2"><Ic d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 14l5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z" /> No spam calls — ever</span>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">What we do</span>
          <h2 className="mt-2 font-display text-4xl font-extrabold text-ink">Everything foreign exchange, in one place</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { t: "Buy Forex", d: "Cash and forex cards in 28+ currencies, delivered to your door at live rates.", path: "M2.5 6h19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1ZM2 9.5h20M6 14h4" },
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

      {/* WHY MATRIX */}
      <section className="bg-dark-green py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-12 max-w-xl font-display text-4xl font-extrabold">Why thousands choose Matrix Forex</h2>
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            {[
              ["Transparent pricing", "The rate you see is the rate you get. No buried markups, no surprise charges at pickup."],
              ["RBI-authorised", "Matrix Forex is an RBI-Authorised Dealer Category-II — every transaction is fully compliant."],
              ["Doorstep delivery", "Currency and forex cards delivered across major cities, same day where available."],
              ["Real humans", "A dedicated team guides your KYC and paperwork. Questions answered on call, not by a bot."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-4">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-dark-green text-sm font-bold">✓</span>
                <div>
                  <h3 className="font-display text-lg font-bold">{t}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-g3">{d}</p>
                </div>
              </div>
            ))}
          </div>
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
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-12 text-center md:flex-row md:text-left">
          <h2 className="font-display text-3xl font-extrabold text-dark-green">Ready to lock in your rate?</h2>
          <Link href="/#book" className="rounded-full bg-dark-green px-8 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-0.5">
            Get started →
          </Link>
        </div>
      </section>

      <FloatingContact />
    </>
  );
}
