import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Forex tips, travel-money guides, remittance how-tos and RBI updates from Matrix Forex.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <header className="mb-12">
        <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-mid-green">Matrix Forex Insights</span>
        <h1 className="mt-2 font-display text-5xl font-extrabold text-ink">The Blog</h1>
        <p className="mt-3 max-w-xl text-[15px] text-g5">
          Practical guides on buying currency, sending money abroad, forex cards, and staying compliant.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-g5">No posts yet. Add your first <code>.mdx</code> file to <code>/content/blog</code>.</p>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-g2 bg-white p-7 transition hover:border-accent hover:shadow-card">
              <span className="text-[11px] font-bold uppercase tracking-wide text-mid-green">{p.category}</span>
              <h2 className="mt-2 font-display text-2xl font-bold leading-snug text-ink group-hover:text-mid-green">{p.title}</h2>
              <p className="mt-3 line-clamp-2 text-[14px] leading-relaxed text-g5">{p.excerpt}</p>
              <p className="mt-5 text-[12px] text-g4">{p.author} · {p.date} · {p.readingTime}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
