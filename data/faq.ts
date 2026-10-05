export type Faq = { id: string; question: string; answer: string };

/** Single source of truth for the FAQ page and its FAQPage structured data. */
export const faqs: Faq[] = [
  {
    id: "only-facebook-ads",
    question: "Do you only run Facebook ads?",
    answer:
      "No. Digital marketing is one part of the system. Services can include strategy, paid media, SEO, content, web and creative depending on the business objective.",
  },
  {
    id: "small-package",
    question: "Can I start with a small package?",
    answer:
      "Yes. The current package structure starts with Starter at ৳5,000 regular price (৳3,750 launch offer) as a one-time setup, followed by Grow, Professional, Advanced and Enterprise monthly packages.",
  },
  {
    id: "websites",
    question: "Do you build websites?",
    answer:
      "Yes. Website, landing page, e-commerce, web application and related digital foundation work are part of the service system.",
  },
  {
    id: "case-studies",
    question: "Will you show real case studies?",
    answer:
      "As evidence becomes available, real work can be added. Concept and demo work is labelled clearly rather than presented as client proof.",
  },
  {
    id: "audit-covers",
    question: "What does the free digital audit cover?",
    answer:
      "Four areas: visibility (search, social presence and discoverability), trust (brand, content and customer-facing experience), conversion (offers, landing experience and lead friction) and foundation (website, tracking, SEO and digital setup).",
  },
  {
    id: "ad-spend",
    question: "Is advertising budget included in the package price?",
    answer:
      "No. Advertising media spend is separate from the package fee. Marketplace platform fees, domain, hosting and third-party subscriptions are also separate where they apply.",
  },
  {
    id: "guarantees",
    question: "Do you guarantee leads or sales?",
    answer:
      "No. Results depend on the business, offer, market, competition, budget and execution, so no fixed sales or lead guarantee is implied.",
  },
  {
    id: "outside-package",
    question: "What if I need something outside a package?",
    answer: "Custom requirements outside the selected package can be scoped separately.",
  },
];

export const faqIntro = {
  eyebrow: "FAQ",
  headline: ["Clear answers.", "No agency fog."],
  lead: "Common questions about services, packages and how we work.",
} as const;
