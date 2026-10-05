import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/data/site";
import { isProductionSite } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments must never compete with the real site in search results.
  if (!isProductionSite) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
