import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPost, getRelatedPosts } from "@/lib/blog";
import PostCard from "@/components/PostCard";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const related = getRelatedPosts(params.slug, 3);

  return (
    <div className="bg-paper">
      {/* Title block */}
      <div className="mx-auto max-w-3xl px-5 pb-8 pt-10">
        <nav className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-g4">
          <Link href="/" className="hover:text-leaf-dark">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-leaf-dark">Insights</Link>
          <span>/</span>
          <span className="text-g5">{post.category}</span>
        </nav>

        <span className="mt-6 inline-block text-[12px] font-bold uppercase tracking-[0.12em] text-leaf">{post.category}</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-forest md:text-5xl">{post.title}</h1>
        <div className="mt-5 flex items-center gap-2.5 text-[13px] text-g4">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-mint font-display text-sm font-bold text-leaf-dark">
            {(post.author || "M").charAt(0)}
          </span>
          <span className="font-semibold text-g5">{post.author}</span>
          <span>· {post.date}</span>
          <span>· {post.readingTime}</span>
        </div>
      </div>

      {/* Cover */}
      {post.cover && (
        <div className="mx-auto max-w-4xl px-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover} alt={post.title} className="aspect-[1.9/1] w-full rounded-2xl border border-sage object-cover" />
        </div>
      )}

      {/* Body */}
      <article className="mx-auto max-w-3xl px-5 py-12">
        <div className="prose-mx">
          <MDXRemote source={post.content} />
        </div>

        {/* Soft inline CTA */}
        <div className="mt-14 rounded-2xl border border-sage bg-mint/50 p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-forest">Need forex for your next trip?</h3>
          <p className="mx-auto mt-2 max-w-md text-[14px] text-g5">Lock in a zero-markup rate online in under a minute, with doorstep delivery.</p>
          <Link href="/#book" className="mt-5 inline-block rounded-full bg-leaf px-6 py-3 text-[14px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-leaf-dark">
            Book forex →
          </Link>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-sage bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-leaf">Keep reading</span>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-forest">Related articles</h2>
              </div>
              <Link href="/blog" className="text-[14px] font-semibold text-leaf-dark hover:text-leaf">View all →</Link>
            </div>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
