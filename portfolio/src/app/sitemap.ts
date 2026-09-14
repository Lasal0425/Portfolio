import type { MetadataRoute } from "next";
import { projects, posts } from "@/lib/content";

const siteUrl = "https://portfolio-murex-five-37.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/timeline", "/projects", "/writing", "/ask"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const sitePostRoutes = posts
    .filter((p) => p.source === "site")
    .map((p) => ({
      url: `${siteUrl}${p.url}`,
      lastModified: new Date(p.publishedAt),
    }));

  return [...staticRoutes, ...projectRoutes, ...sitePostRoutes];
}
