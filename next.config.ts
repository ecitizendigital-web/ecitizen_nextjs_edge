import type { NextConfig } from "next";

/**
 * Old static pages from the V6 site. Each one is redirected permanently (308) so search engines
 * and bookmarks follow to the new route. Query strings and #fragments (e.g. ?pick=Grow#free-audit) are preserved.
 */
const legacyPages: [from: string, to: string][] = [
  ["/index.html", "/"],
  ["/services.html", "/services"],
  ["/packages.html", "/packages"],
  ["/portfolio.html", "/portfolio"],
  ["/process.html", "/process"],
  ["/blog.html", "/insights"],
  ["/blog", "/insights"],
  ["/faq.html", "/faq"],
  ["/about.html", "/about"],
  ["/contact.html", "/contact"],
  ["/privacy.html", "/privacy"],
  ["/terms.html", "/terms"],
  ["/cookie.html", "/cookie"],
  ["/cookies.html", "/cookie"],
  ["/cookies", "/cookie"],
  ["/lead-data.html", "/lead-data"],
  ["/404.html", "/"],
];

/** Carried over from vercel.json. HSTS only has an effect over HTTPS, so it is harmless on localhost. */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Directives that cannot break analytics. script-src is intentionally left open for GTM, GA4 and the pixels;
  // tightening it needs per-request nonces, which would make every page dynamic.
  { key: "Content-Security-Policy", value: "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },

  async redirects() {
    return [
      ...legacyPages.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/insights/:slug.html", destination: "/insights/:slug", permanent: true },
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Logos and photos never change under the same file name, so browsers may cache them for a year.
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
