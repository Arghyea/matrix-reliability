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
      <div className="mx-auto max-w-4xl px-5 pb-10 pt-14 text-center">
        <span className="inline-block text-[12px] font-bold uppercase tracking-[0.14em] text-leaf">
          Travel Guides
        </span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-forest md:text-5xl">
          Money, cards &amp; cash — sorted before you fly
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-g5">
          Practical, India-specific guides to spending abroad: what to carry, where cards
          actually work, and how to dodge the markups nobody mentions.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20">
        {regions.map((r) => {
          const list = guides.filter((g) => g.region === r);
          if (!list.length) return null;
          return (
            <div key={r} className="mt-12 first:mt-0">
              <h2 className="mb-6 font-display text-2xl font-extrabold text-forest">{r}</h2>
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/travel-guide/${g.slug}`}
                    className="group rounded-2xl border border-sage bg-white p-6 transition hover:-translate-y-0.5 hover:border-leaf/40 hover:shadow-sm"
                  >
                    <div className="text-4xl">{g.flag}</div>
                    <h3 className="mt-3 font-display text-xl font-bold text-forest group-hover:text-leaf-dark">
                      {g.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-g5">
                      {g.meta_desc}
                    </p>
                    <span className="mt-4 inline-block text-[13px] font-semibold text-leaf-dark">
                      Read guide →
                    </span>
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
