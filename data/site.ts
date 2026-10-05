/**
 * Central business configuration — the one place to change contact details.
 * Deployment-specific values come from environment variables (see .env.example).
 *
 * KNOWN INCONSISTENCY carried over from the V6 README: the contact email is
 * hi@ecitizen.digital, but the website domain is ecitizendigital.com. The source value
 * is kept as the default; set NEXT_PUBLIC_CONTACT_EMAIL to change it everywhere at once.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://ecitizendigital.com").replace(/\/+$/, "");

export const site = {
  name: "eCitizen Digital",
  shortName: "eCitizen",
  url: siteUrl,
  tagline: "We Grow Brands, You Grow Business.",
  positioning: "Digital growth partner for SMEs",
  description:
    "Digital growth partner for Bangladesh SMEs. Strategy, marketing, websites, creative and technology connected around measurable business outcomes.",
  shortDescription: "Strategy, marketing, websites, creative and technology connected around business outcomes.",
  footerStatement:
    "Digital growth partner for SMEs. Strategy, technology and creative execution built around business outcomes.",
  themeColor: "#05070c",
  /** Used for sitemap lastModified and legal "last updated" dates. */
  lastUpdated: "2026-10-03",
  contact: {
    phone: { display: "+880 1313 886828", e164: "+8801313886828" },
    whatsapp: {
      number: "8801313886828",
      message: "Hello eCitizen Digital, I'd like to talk about my business.",
    },
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hi@ecitizen.digital",
  },
  assets: {
    logo: { src: "/assets/ecitizen-lockup-horizontal-reversed.png", width: 2000, height: 212, alt: "eCitizen Digital" },
    mark: { src: "/assets/ecitizen-mark-reversed.png", width: 1200, height: 616 },
    ogImage: { src: "/assets/ecitizen-social-share-1200x630.png", width: 1200, height: 630, alt: "eCitizen Digital" },
    founder: { src: "/assets/founder-ecitizen-digital.webp", width: 360, height: 360, alt: "Founder of eCitizen Digital" },
  },
  founderNote: {
    heading: "Digital growth should be practical, measurable, and built for the market you actually serve.",
    paragraphs: [
      "At eCitizen Digital, I believe businesses in Kishoreganj and across Bangladesh deserve more than disconnected posts, boosts, or empty promises. Our approach brings together digital marketing, SEO, web development, branding, content, and technology to build a stronger online presence and turn attention into meaningful business opportunities.",
      "This Insights section is where we share useful, evidence-led thinking on digital marketing, local SEO, websites, branding, and business growth, with a focus on ideas businesses can actually apply.",
    ],
    signature: "Founder, eCitizen Digital",
  },
} as const;

export const phoneHref = `tel:${site.contact.phone.e164}`;
export const mailtoHref = `mailto:${site.contact.email}`;

export function whatsappUrl(message: string = site.contact.whatsapp.message): string {
  return `https://wa.me/${site.contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
