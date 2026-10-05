export type ServiceId = "customers" | "presence" | "professional" | "ideas";
export type DisciplineId = "marketing" | "web" | "brand";

export type Service = {
  /** Doubles as the URL anchor on /services (kept from the V6 site: #customers, #presence ...). */
  id: ServiceId;
  name: string;
  headline: string;
  /** One line for compact cards. */
  summary: string;
  /** Short description used at the top of the service section. */
  description: string;
  detail: string;
  deliverables: string[];
  idealFor: string;
  outcome: string;
  related: ServiceId[];
  /** Pre-selects the "Main goal" field when the visitor continues to the audit form. */
  auditGoal: string;
  cta: string;
  track: string;
};

export const services: Service[] = [
  {
    id: "customers",
    name: "Get more customers",
    headline: "Reach the right people.",
    summary: "Reach, campaigns, search, content and conversion support.",
    description:
      "Digital marketing systems built around audience, offer, distribution and conversion, not random boosting.",
    detail:
      "We start with who should buy, what they are being offered and where they already look: Google Search, Maps, Facebook, Instagram and direct messaging. Then we connect paid media, search, content and a clear next step so attention turns into enquiries you can measure.",
    deliverables: [
      "Meta & Google Ads",
      "SEO & Local SEO",
      "Social media strategy",
      "Content marketing",
      "Lead generation",
      "Campaign optimization",
    ],
    idealFor:
      "Businesses with something worth selling that still rely on word of mouth or the occasional boosted post.",
    outcome: "More of the right enquiries, tracked from first click to first conversation.",
    related: ["presence", "professional"],
    auditGoal: "Get more customers",
    cta: "Discuss getting more customers",
    track: "service_outcome_customers",
  },
  {
    id: "presence",
    name: "Build digital presence",
    headline: "Make the business credible online.",
    summary: "Websites, landing pages, e-commerce and digital foundations.",
    description: "Web experiences that make your offer easier to understand, trust and act on.",
    detail:
      "Customers check a business online before they call or visit. We build the pages they land on: a clear offer, proof that can be verified, and more than one easy way to enquire by form, phone or WhatsApp, on pages that load fast on a phone.",
    deliverables: [
      "Business websites",
      "Landing pages",
      "E-commerce",
      "Web applications",
      "Conversion UX",
      "Maintenance & hosting",
    ],
    idealFor:
      "Businesses whose customers look them up online first, but whose presence today is a Facebook page or an outdated site.",
    outcome: "A website that explains the offer, earns trust and gives every visitor a clear way to enquire.",
    related: ["customers", "professional"],
    auditGoal: "Improve online presence",
    cta: "Discuss building a presence",
    track: "service_outcome_presence",
  },
  {
    id: "professional",
    name: "Look more professional",
    headline: "Make the brand feel consistent.",
    summary: "Brand identity, design, content and campaign creative.",
    description:
      "Identity and creative systems that bring clarity across social, campaigns and customer touchpoints.",
    detail:
      "Quality that customers cannot see does not sell. We bring the profile, posts, ads and website into one recognisable look and voice, then produce the content that keeps it consistent month after month.",
    deliverables: [
      "Brand identity",
      "Graphic design",
      "Campaign creative",
      "Content production",
      "Photography & video",
      "Motion design",
    ],
    idealFor: "Businesses whose real quality is better than the way they currently appear online.",
    outcome: "One consistent look and voice across profile, posts, ads and website.",
    related: ["customers", "presence"],
    auditGoal: "Improve brand perception",
    cta: "Discuss brand and creative",
    track: "service_outcome_professional",
  },
  {
    id: "ideas",
    name: "Turn an idea real",
    headline: "Build what does not exist yet.",
    summary: "Custom digital products, automation and AI-enabled solutions.",
    description: "Digital products and automation for businesses that need more than an off-the-shelf service.",
    detail:
      "Some problems do not fit a standard package. We scope a specific product, integration or automated workflow around the business problem it should solve, then build it in stages so you can see progress early.",
    deliverables: ["Custom software", "Automation", "AI solutions", "Web apps", "Integrations", "Digital workflows"],
    idealFor:
      "Founders and teams with a specific workflow or product idea that off-the-shelf tools do not cover.",
    outcome: "A working digital product or automated workflow, scoped around the problem it solves.",
    related: ["presence", "customers"],
    auditGoal: "Build a website / digital system",
    cta: "Discuss a custom build",
    track: "service_outcome_ideas",
  },
];

export const disciplines: {
  id: DisciplineId;
  name: string;
  description: string;
  serviceIds: ServiceId[];
}[] = [
  {
    id: "marketing",
    name: "Marketing & Growth",
    description:
      "Digital marketing, SEO, paid media, content, campaigns, lead generation and performance optimization.",
    serviceIds: ["customers"],
  },
  {
    id: "web",
    name: "Web & Technology",
    description:
      "Business websites, landing pages, e-commerce, web applications, automation and AI-enabled workflows.",
    serviceIds: ["presence", "ideas"],
  },
  {
    id: "brand",
    name: "Brand & Creative",
    description:
      "Identity, graphic design, campaign creative, content production, photography, video and motion.",
    serviceIds: ["professional"],
  },
];

export const servicesIntro = {
  eyebrow: "Services",
  headline: ["Tell us where", "you want to go."],
  lead: "We'll build the right combination of strategy, marketing, technology and creative execution to get you there.",
  note: { title: "Outcome first. Capability second.", body: "Choose a business outcome below, then explore the services behind it." },
  combine: {
    eyebrow: "How we combine services",
    heading: "One business problem can need several capabilities.",
    body: "We do not force every client into a fixed service bundle. The mix follows the objective, stage and resources available.",
    path: "Strategy, Build, Reach, Convert, Optimize, Grow",
    caption: "Connected by one commercial objective.",
  },
} as const;

export const getService = (id: ServiceId) => services.find((s) => s.id === id);
