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
  return { title: g.meta_title, description: g.meta_desc };
}

function paragraphs(text: string) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
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
      {/* Title block */}
      <div className="mx-auto max-w-3xl px-5 pb-6 pt-10">
        <nav className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-g4">
          <Link href="/" className="hover:text-leaf-dark">Home</Link>
          <span>/</span>
          <Link href="/travel-guide" className="hover:text-leaf-dark">Travel Guides</Link>
          <span>/</span>
          <span className="text-g5">{g.name}</span>
        </nav>

        <span className="mt-6 inline-block text-[12px] font-bold uppercase tracking-[0.12em] text-leaf">
          Travel Guide
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-forest md:text-5xl">
          <span className="mr-2">{g.flag}</span>
          {g.h1}
        </h1>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-5 py-10">
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

        {/* Soft inline CTA */}
        <div className="mt-14 rounded-2xl border border-sage bg-mint/50 p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-forest">
            Heading to {g.name}? Sort your forex first.
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-g5">
            Lock in a zero-markup rate online in under a minute, with doorstep delivery across India.
          </p>
          <Link
            href="/#book"
            className="mt-5 inline-block rounded-full bg-leaf px-6 py-3 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-leaf-dark"
          >
            Book forex →
          </Link>
        </div>
      </article>

      {/* Other guides */}
      {others.length > 0 && (
        <section className="border-t border-sage bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-leaf">
                  More destinations
                </span>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-forest">
                  Other travel guides
                </h2>
              </div>
              <Link href="/travel-guide" className="text-[14px] font-semibold text-leaf-dark hover:text-leaf">
                View all →
              </Link>
            </div>
            <div className="grid gap-7 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/travel-guide/${o.slug}`}
                  className="group rounded-2xl border border-sage bg-paper p-6 transition hover:-translate-y-0.5 hover:border-leaf/40"
                >
                  <div className="text-3xl">{o.flag}</div>
                  <h3 className="mt-3 font-display text-lg font-bold text-forest group-hover:text-leaf-dark">
                    {o.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[13.5px] text-g5">{o.meta_desc}</p>
                  <span className="mt-3 inline-block text-[13px] font-semibold text-leaf-dark">
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
