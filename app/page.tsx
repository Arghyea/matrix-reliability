import ForexWidget from "@/components/ForexWidget";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

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
            "radial-gradient(120% 90% at 15% 0%, #00341B 0%, #07100a 60%)",
        }}
      >
        {/* faint grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#02e375 1px,transparent 1px),linear-gradient(90deg,#02e375 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[12px] font-semibold text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Zero-markup live rates
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-7xl">
              Send Money<br />Abroad Quick<br />
              <span className="text-accent">& Securely</span>
            </h1>
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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 text-[13px] font-semibold text-g5">
          <span>🔒 100% RBI-compliant</span>
          <span>⚡ Same-day delivery</span>
          <span>💳 Forex cards in 28+ currencies</span>
          <span>📞 No spam calls — ever</span>
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
            { t: "Buy Forex", d: "Cash and forex cards in 28+ currencies, delivered to your door at live rates.", icon: "💵" },
            { t: "Send Money Abroad", d: "Outward remittance for education, family maintenance, travel and more — fully documented.", icon: "🌍" },
            { t: "Sell Forex", d: "Returning from a trip? Sell your leftover currency at fair, transparent buy-back rates.", icon: "🔁" },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border border-g2 bg-g1 p-7 transition hover:border-accent hover:shadow-card">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-2xl">{s.icon}</div>
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
    </>
  );
}
