import Link from "next/link";
import type { Metadata } from "next";
import { getAllGuides } from "@/lib/travelGuides";

export const metadata: Metadata = {
  title: "Travel Guides for Indian Travellers | Matrix Forex",
  description:
    "Practical money, card, and cash guides for popular destinations — written for Indian travellers. From the yen to the euro, Bali to London.",
};

export default function TravelGuidesIndex() {
  const guides = getAllGuides();
  const regions: Array<"Asia" | "Europe"> = ["Asia", "Europe"];

  return (
    <div className="bg-paper">
      {/* Hero */}
      <div className="mx-auto max-w-4xl px-5 pb-12 pt-16 text-center md:pt-20">
        <span className="inline-block text-[12px] font-bold uppercase tracking-[0.16em] text-leaf">
          Travel Guides
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] text-forest md:text-6xl">
          Money, cards &amp; cash —<br className="hidden sm:block" /> sorted before you fly
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-g5">
          Practical, India-specific guides to spending abroad: what to carry, where cards
          actually work, and how to dodge the markups nobody mentions.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24">
        {regions.map((r) => {
          const list = guides.filter((g) => g.region === r);
          if (!list.length) return null;
          return (
            <div key={r} className="mt-14 first:mt-0">
              <div className="mb-7 flex items-center gap-3">
                <h2 className="font-display text-2xl font-extrabold text-forest">{r}</h2>
                <span className="h-px flex-1 bg-sage" />
                <span className="text-[12.5px] font-semibold text-g4">{list.length} guides</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/travel-guide/${g.slug}`}
                    className="group overflow-hidden rounded-2xl border border-sage bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-forest/5"
                  >
                    <div className="relative isolate overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/img/travel/${g.slug}.webp`}
                        alt={g.name}
                        className="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
                        <span className="text-2xl drop-shadow">{g.flag}</span>
                        <h3 className="font-display text-xl font-bold text-white drop-shadow">{g.name}</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="line-clamp-3 text-[13.5px] leading-relaxed text-g5">{g.meta_desc}</p>
                      <span className="mt-3 inline-block text-[13px] font-semibold text-leaf-dark group-hover:text-leaf">
                        Read guide →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
