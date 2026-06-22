import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

// Soft fallback cover when a post has no image yet.
function Fallback({ category }: { category: string }) {
  return (
    <div
      className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden"
      style={{ backgroundImage: "linear-gradient(145deg, #eef5f0 0%, #dcebe1 60%, #cfe7d8 100%)" }}
    >
      <span className="font-display text-2xl font-extrabold tracking-tight text-forest/80">
        Matrix<span className="text-leaf">Forex</span>
      </span>
      <span className="absolute -bottom-2 right-3 font-display text-6xl font-extrabold leading-none text-forest/[0.06]">
        {category}
      </span>
    </div>
  );
}

export default function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-3xl border border-sage bg-white transition hover:shadow-card md:grid-cols-2"
      >
        <div className="md:order-2">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover} alt={post.title} className="h-full min-h-[240px] w-full object-cover" />
          ) : (
            <div className="h-full min-h-[240px]"><Fallback category={post.category} /></div>
          )}
        </div>
        <div className="flex flex-col justify-center p-8 md:order-1 md:p-10">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-leaf">
            <span className="rounded-full bg-mint px-2.5 py-1">{post.category}</span>
            <span className="text-g4">Featured</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-forest group-hover:text-leaf-dark md:text-4xl">
            {post.title}
          </h2>
          <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-g5">{post.excerpt}</p>
          <div className="mt-6 flex items-center gap-2.5 text-[12.5px] text-g4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-mint font-display text-[13px] font-bold text-leaf-dark">
              {(post.author || "M").charAt(0)}
            </span>
            <span className="font-semibold text-g5">{post.author}</span>
            <span>· {post.date}</span>
            <span>· {post.readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sage bg-white transition hover:-translate-y-1 hover:shadow-card"
    >
      {post.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover} alt={post.title} className="aspect-[16/10] w-full object-cover" />
      ) : (
        <Fallback category={post.category} />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-leaf">
          <span>{post.category}</span>
          {post.date && <span className="font-medium text-g4">· {post.date}</span>}
          {post.readingTime && <span className="font-medium text-g4">· {post.readingTime}</span>}
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-snug text-forest group-hover:text-leaf-dark">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-g5">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-mint font-display text-[13px] font-bold text-leaf-dark">
              {(post.author || "M").charAt(0)}
            </span>
            <span className="text-[12.5px] font-semibold text-g5">{post.author}</span>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-paper text-leaf transition group-hover:bg-leaf group-hover:text-white" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M14 6l6 6-6 6" /></svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
