import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, getGuideSlugs, getAllGuides } from "@/lib/travelGuides";

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = getGuide(params.slug);
  if (!g) return {};
  return {
    title: g.meta_title,
    description: g.meta_desc,
    openGraph: { title: g.meta_title, description: g.meta_desc, images: [`/img/travel/${g.slug}.webp`] },
  };
}

function paragraphs(text: string) {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

export default function TravelGuidePage({ params }: { params: { slug: string } }) {
  const g = getGuide(params.slug);
  if (!g) notFound();

  const others = getAllGuides()
    .filter((x) => x.slug !== g.slug)
    .sort((a, b) => Number(b.region === g.region) - Number(a.region === g.region))
    .slice(0, 3);

  return (
    <div className="bg-paper">
      {/* ── Premium image hero ── */}
      <section className="relative isolate overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/img/travel/${g.slug}.webp`}
          alt={`${g.name} — travel guide`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/75 to-deep/25" />
        <div className="absolute inset-0 bg-dark-green/20" />

        <div className="relative mx-auto flex min-h-[58vh] max-w-5xl flex-col justify-end px-5 pb-12 pt-24 md:min-h-[64vh] md:pb-16 md:pt-32">
          <nav className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/travel-guide" className="hover:text-white">Travel Guides</Link>
            <span>›</span>
            <span className="text-white/90">{g.name}</span>
          </nav>

          <span className="mt-5 inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent backdrop-blur-sm">
            Travel Guide for Indians
          </span>

          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
            <span className="text-accent">{g.name}</span> Travel Guide
          </h1>

          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/85 md:text-base">
            {g.meta_desc}
          </p>
        </div>
      </section>

      {/* ── Article body (light editorial) ── */}
      <article className="mx-auto max-w-3xl px-5 py-12 md:py-16">
        <div className="prose-mx">
          {g.intro && paragraphs(g.intro).map((p, i) => <p key={`intro-${i}`}>{p}</p>)}
          {g.sections.map((s, si) => (
            <section key={si}>
              <h2>{s.title}</h2>
              {paragraphs(s.body).map((p, pi) => (
                <p key={pi}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-sage bg-gradient-to-br from-mint to-mint/40 p-8 text-center md:p-10">
          <span className="text-3xl">{g.flag}</span>
          <h3 className="mt-2 font-display text-2xl font-extrabold text-forest md:text-3xl">
            Heading to {g.name}? Sort your forex first.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-g5">
            Lock in a zero-markup rate online in under a minute, with doorstep delivery across India.
          </p>
          <Link
            href="/#book"
            className="mt-5 inline-block rounded-full bg-leaf px-7 py-3 text-[14px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-leaf-dark"
          >
            Book forex →
          </Link>
        </div>

        <p className="mt-8 text-center text-[11px] text-g4">
          Destination photography via Wikimedia Commons &amp; Openverse.
        </p>
      </article>

      {/* ── Other guides (image cards) ── */}
      {others.length > 0 && (
        <section className="border-t border-sage bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-leaf">More destinations</span>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-forest">Other travel guides</h2>
              </div>
              <Link href="/travel-guide" className="text-[14px] font-semibold text-leaf-dark hover:text-leaf">View all →</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/travel-guide/${o.slug}`}
                  className="group relative isolate overflow-hidden rounded-2xl border border-sage"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/img/travel/${o.slug}.webp`}
                    alt={o.name}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                    <span className="text-xl">{o.flag}</span>
                    <h3 className="font-display text-lg font-bold text-white">{o.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
