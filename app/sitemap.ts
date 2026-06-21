import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticPages = ["", "/services", "/about", "/contact", "/blog"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
  const posts = getAllSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
  }));
  return [...staticPages, ...posts];
}
