import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/data/site";
import { getAllInsights } from "@/lib/insights";

const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/packages", priority: 0.9 },
  { path: "/contact", priority: 0.9 },
  { path: "/portfolio", priority: 0.7 },
  { path: "/process", priority: 0.7 },
  { path: "/insights", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/faq", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/cookie", priority: 0.2 },
  { path: "/lead-data", priority: 0.2 },
];

/** Built from the same data as the pages, so a new insight appears here automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.lastUpdated);
  return [
    ...pages.map(({ path, priority }) => ({ url: absoluteUrl(path), lastModified, priority })),
    ...getAllInsights().map((insight) => ({
      url: absoluteUrl(`/insights/${insight.slug}`),
      lastModified: new Date(insight.updated),
      priority: 0.7,
    })),
  ];
}
