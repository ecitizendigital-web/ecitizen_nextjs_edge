export type ConceptVisualKind = "growth-system" | "website";

export type PortfolioItem = {
  id: string;
  title: string;
  /** Concept and demo work is labelled as such. No client results are claimed. */
  status: "Concept project" | "Demo project";
  category: string;
  summary: string;
  problem: string;
  approach: string;
  intendedOutcome: string;
  services: string[];
  visual: ConceptVisualKind;
};

export const portfolio: PortfolioItem[] = [
  {
    id: "local-sme-growth-campaign",
    title: "Local SME Growth Campaign",
    status: "Concept project",
    category: "Growth system",
    summary:
      "Concept system connecting positioning, social content, paid media and conversion for a local service business.",
    problem:
      "A local service business posts regularly and boosts now and then, but cannot say which activity brings enquiries.",
    approach:
      "Positioning first, then one connected plan: content that answers customer questions, paid media pointed at one offer, and a conversion path by phone, WhatsApp and form.",
    intendedOutcome:
      "One plan the owner can read on a page, with every channel tied to an enquiry action that can be measured.",
    services: ["Social media strategy", "Meta & Google Ads", "Content marketing", "Lead generation"],
    visual: "growth-system",
  },
  {
    id: "conversion-first-website",
    title: "Conversion-first Website",
    status: "Demo project",
    category: "Web and UX",
    summary: "Modular website concept built around trust, service discovery and lead generation.",
    problem:
      "Visitors land on a site that does not say what the business sells, why to trust it or what to do next.",
    approach:
      "A modular page system: a first screen that answers what, for whom and why to trust it; service pages for specific needs; several ways to enquire.",
    intendedOutcome:
      "Fewer steps between a visitor's question and an enquiry, on a structure search engines can read.",
    services: ["Business websites", "Landing pages", "Conversion UX", "SEO"],
    visual: "website",
  },
];

export const portfolioIntro = {
  eyebrow: "Portfolio / Concepts",
  headline: ["Show the thinking.", "Then show the evidence."],
  lead: "Launch-stage work is clearly labelled. No fabricated client results, logos or testimonials are presented as proof.",
  previewHeading: "Concept work, clearly labelled.",
  previewLead: "Real client results, logos and testimonials appear here only once they are verified and approved.",
  evidenceNote: {
    title: "What will replace these concepts",
    body: "Verified client work, with the problem, the approach and the measured outcome, once each client has approved it.",
  },
} as const;
