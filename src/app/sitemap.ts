import type { MetadataRoute } from "next";

/*
 * Sitemap for search engines. Only public pages get listed; member surfaces
 * (/dashboard, /library, /video, /admin) are explicitly excluded both here
 * and in robots.ts. Future Phase 2: dynamic entries for /preview/[slug]
 * (Professor's Preview public videos).
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://primroseknowledgestudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
