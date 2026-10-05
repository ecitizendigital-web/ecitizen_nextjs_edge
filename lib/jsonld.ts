import type { Faq } from "@/data/faq";
import { absoluteUrl, site } from "@/data/site";
import type { InsightMeta } from "@/lib/insights";

const ORG_ID = absoluteUrl("/#organization");

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl(site.assets.logo.src),
  description: "Digital growth partner for SMEs in Bangladesh.",
  areaServed: { "@type": "Country", name: "Bangladesh" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: site.contact.phone.e164,
    email: site.contact.email,
  },
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: absoluteUrl("/"),
  publisher: { "@id": ORG_ID },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const articleLd = (insight: InsightMeta) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: insight.title,
  description: insight.description,
  datePublished: insight.date,
  dateModified: insight.updated,
  inLanguage: insight.language === "bn-en" ? ["bn", "en"] : "en",
  keywords: insight.keywords,
  image: absoluteUrl(site.assets.ogImage.src),
  author: { "@type": "Organization", name: site.name, url: absoluteUrl("/") },
  publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl(site.assets.mark.src) } },
  mainEntityOfPage: absoluteUrl(`/insights/${insight.slug}`),
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export const contactPageLd = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Free Digital Audit — ${site.name}`,
  url: absoluteUrl("/contact"),
});
