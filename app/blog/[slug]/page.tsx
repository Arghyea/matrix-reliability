import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPost } from "@/lib/blog";

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

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/blog" className="text-[13px] font-semibold text-mid-green hover:text-accent">← Back to blog</Link>
      <header className="mt-6 mb-10 border-b border-g2 pb-8">
        <span className="text-[12px] font-bold uppercase tracking-wide text-mid-green">{post.category}</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-[13px] text-g4">{post.author} · {post.date} · {post.readingTime}</p>
      </header>
      <div className="prose-mx">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-14 rounded-2xl bg-dark-green p-8 text-white">
        <h3 className="font-display text-2xl font-bold">Need forex for your next trip?</h3>
        <p className="mt-2 text-[14px] text-g3">Lock in a zero-markup rate in under a minute.</p>
        <Link href="/#book" className="mt-5 inline-block rounded-full bg-accent px-6 py-3 text-[14px] font-bold text-dark-green">Book forex →</Link>
      </div>
    </article>
  );
}
