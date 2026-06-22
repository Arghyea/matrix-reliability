import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Insights — Forex Tips, Travel Money & Remittance Guides",
  description: "Guides on buying currency, sending money abroad, forex cards, rate trends and RBI updates — written for Indians moving money across borders.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="bg-paper">
      {/* Soft, airy hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg, #eef5f0 0%, #f6f9f6 100%)" }}
      >
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full" style={{ background: "rgba(15,164,95,.10)", filter: "blur(80px)" }} />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf/25 bg-white px-3 py-1 text-[12px] font-semibold text-leaf-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" /> Matrix Forex Insights
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-forest sm:text-5xl md:text-6xl">
            Travel smart. Send safer. <span className="text-leaf">Save more.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-g5">
            Guides, rate trends, ATM tips, and remittance know-how — written for Indians moving money across borders.
          </p>
        </div>
      </section>

      <BlogList posts={posts} />
    </div>
  );
}
