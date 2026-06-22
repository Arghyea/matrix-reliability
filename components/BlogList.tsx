"use client";
import { useState, useMemo } from "react";
import type { PostMeta } from "@/lib/blog";
import PostCard from "@/components/PostCard";

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ["All Posts", ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState("All Posts");
  const filtered = active === "All Posts" ? posts : posts.filter((p) => p.category === active);

  const showFeatured = active === "All Posts" && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      {/* Category tabs */}
      <div className="relative z-10 -mt-7 mb-10 flex flex-wrap gap-1.5 rounded-2xl border border-sage bg-white p-1.5 shadow-card">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
              active === c ? "bg-leaf text-white" : "text-g5 hover:bg-mint"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <div className="mb-8">
          <PostCard post={featured} featured />
        </div>
      )}

      {rest.length === 0 && !featured ? (
        <p className="py-16 text-center text-g5">No posts in this category yet.</p>
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
