export type PackageId = "starter" | "grow" | "professional" | "advanced" | "enterprise";
export type Billing = "one-time" | "monthly";

export type Package = {
  id: PackageId;
  /** Also the value sent as /contact?pick=NAME. */
  name: string;
  billing: Billing;
  /** Regular reference price in BDT (Starter: one-time price). */
  price: number;
  /** Price during the launch offer, in BDT. */
  launchPrice: number;
  /** Position in the ladder, shown as a badge on the card. */
  role: string;
  /** Visual emphasis (one card only). */
  highlighted?: boolean;
  title?: string;
  description: string;
  /** Four items for compact cards (home preview). */
  highlights: string[];
  /** Full list for the packages page. */
  features: string[];
  cta: string;
};

export const launchOffer = { percent: 25, label: "25% launch offer" } as const;

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    billing: "one-time",
    price: 5000,
    launchPrice: 3750,
    role: "Entry option",
    title: "Build your digital foundation before you start marketing.",
    description:
      "A one-time setup package for a new business that needs its social profiles, business listings and online marketplace presence configured correctly.",
    highlights: [
      "Facebook, Instagram & LinkedIn setup",
      "Google Business Profile",
      "WhatsApp Business connection",
      "Digital shop setup",
    ],
    features: [],
    cta: "Set up my business",
  },
  {
    id: "grow",
    name: "Grow",
    billing: "monthly",
    price: 7500,
    launchPrice: 5625,
    role: "Monthly foundation",
    description: "For businesses ready to maintain a consistent digital presence.",
    highlights: [
      "15 social post designs",
      "3 reels / short videos",
      "Basic Meta Ads management",
      "Basic on-page SEO",
    ],
    features: [
      "15 social post designs / month",
      "3 reels / short videos",
      "Basic Meta Ads management",
      "Meta Pixel foundation",
      "Google Business Profile support",
      "Content writing & planning",
      "Basic On-Page SEO",
      "Monthly report",
    ],
    cta: "Choose Grow",
  },
  {
    id: "professional",
    name: "Professional",
    billing: "monthly",
    price: 10000,
    launchPrice: 7500,
    role: "Recommended",
    highlighted: true,
    description:
      "For businesses that want content, campaigns and stronger digital visibility working together.",
    highlights: [
      "30 social post designs",
      "5 reels / short videos",
      "Advanced Meta + Google Ads",
      "Technical SEO support",
    ],
    features: [
      "30 social post designs / month",
      "5 reels / short videos",
      "Advanced Meta Ads management",
      "Google Ads management",
      "Meta Pixel & Google Tag setup",
      "Google Business Profile support",
      "Content writing & analysis",
      "Advanced On-Page SEO",
      "Technical SEO support",
      "Monthly report",
    ],
    cta: "Choose Professional",
  },
  {
    id: "advanced",
    name: "Advanced",
    billing: "monthly",
    price: 15000,
    launchPrice: 11250,
    role: "Advanced option",
    description:
      "For businesses that need broader multi-channel execution and stronger optimization.",
    highlights: [
      "60 social post designs",
      "8 reels / short videos",
      "Meta, Google & TikTok Ads",
      "On-page, technical & off-page SEO",
    ],
    features: [
      "60 social post designs / month",
      "8 reels / short videos",
      "Pro Meta Ads management",
      "Google Ads management",
      "TikTok Ads management",
      "Meta & TikTok Pixel setup",
      "Google Tag setup",
      "Google Business Profile management",
      "On-Page + Technical SEO",
      "Off-Page SEO support",
      "Biweekly reporting / review",
    ],
    cta: "Choose Advanced",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    billing: "monthly",
    price: 25000,
    launchPrice: 18750,
    role: "Enterprise option",
    description:
      "For businesses that need comprehensive digital marketing and ongoing growth management.",
    highlights: [
      "60+ social post designs",
      "10 reels / short videos",
      "Pro and funnel-focused campaigns",
      "Complete SEO + website updates",
    ],
    features: [
      "60+ social post designs / month",
      "10 reels / short videos",
      "Pro & funnel-focused Meta Ads",
      "Google Ads management",
      "TikTok Ads management",
      "Meta & TikTok Pixel setup",
      "Google Tag setup",
      "Google Business Profile management",
      "Complete SEO support",
      "Website content updates & customization",
      "Weekly reporting / review",
    ],
    cta: "Choose Enterprise",
  },
];

export const starter = packages[0];
export const monthlyPackages = packages.filter((p) => p.billing === "monthly");

export const starterIncludes: { title: string; items: string[] }[] = [
  {
    title: "Digital presence",
    items: ["Facebook", "Instagram", "LinkedIn", "Google Business Profile", "WhatsApp"],
  },
  {
    title: "Digital shop setup",
    items: ["Daraz and relevant Bangladeshi marketplace / commerce shop setup"],
  },
  {
    title: "Profile foundation",
    items: ["Business details", "Bio", "Category", "CTA", "Username", "Profile/cover setup"],
  },
  {
    title: "Business infrastructure",
    items: ["Basic Meta Business setup", "Tracking foundation where applicable"],
  },
  {
    title: "Launch guidance",
    items: ["Digital presence checklist and practical guidance for the first stage"],
  },
];

/** true = included, false = not included, string = level or quantity. Order matches monthlyPackages. */
export type ComparisonCell = string | boolean;
export type ComparisonRow = { feature: string; values: [ComparisonCell, ComparisonCell, ComparisonCell, ComparisonCell] };
export type ComparisonGroup = { title: string; rows: ComparisonRow[] };

export const comparison: ComparisonGroup[] = [
  {
    title: "Content",
    rows: [
      { feature: "Monthly social post designs", values: ["15", "30", "60", "60+"] },
      { feature: "Reels / short videos", values: ["3", "5", "8", "10"] },
      { feature: "Content writing & analysis", values: [true, true, true, true] },
    ],
  },
  {
    title: "Advertising",
    rows: [
      { feature: "Facebook & Instagram Ads", values: ["Basic", "Advanced", "Pro", "Pro + Funnel"] },
      { feature: "Google Ads management", values: [false, true, true, true] },
      { feature: "TikTok Ads management", values: [false, false, true, true] },
    ],
  },
  {
    title: "Tracking",
    rows: [
      { feature: "Meta Pixel", values: [true, true, true, true] },
      { feature: "TikTok Pixel", values: [false, false, true, true] },
      { feature: "Google Tag setup", values: [false, true, true, true] },
    ],
  },
  {
    title: "Search & local",
    rows: [
      { feature: "Google Business Profile", values: ["Support", "Support", "Management", "Management"] },
      { feature: "On-Page SEO", values: ["Basic", "Advanced", "Advanced", "Complete"] },
      { feature: "Technical SEO", values: [false, "Support", true, true] },
      { feature: "Off-Page SEO", values: [false, false, "Support", true] },
    ],
  },
  {
    title: "Website",
    rows: [
      { feature: "Website content updates", values: [false, true, true, true] },
      { feature: "Website customization", values: [false, "Support", true, true] },
    ],
  },
  {
    title: "Reporting",
    rows: [{ feature: "Reporting / review", values: ["Monthly", "Monthly", "Biweekly", "Weekly"] }],
  },
];

export const packageNotes = [
  "Advertising media spend is separate from the package fee.",
  "Marketplace platform fees, domain, hosting and third-party subscription costs are separate where applicable.",
  "Deliverable quantities are monthly unless explicitly marked one-time.",
  "Results depend on the business, offer, market, competition, budget and execution; no fixed sales or lead guarantee is implied.",
  "Custom requirements outside the selected package can be scoped separately.",
];

export const packagesIntro = {
  eyebrow: "Packages & pricing",
  headline: ["Start right.", "Grow with a system."],
  lead: "One-time digital setup for new businesses, followed by monthly marketing packages built around consistent content, advertising, SEO and measurement.",
  previewHeading: "Choose the level of support that fits your stage.",
  previewLead:
    "Reference pricing with a visible 25% launch offer. Starter is a one-time setup; Grow to Enterprise are monthly.",
} as const;

/** Maps a visitor's situation to a package. Wording follows each package's own description. */
export const recommendations: { id: string; label: string; packageId: PackageId }[] = [
  { id: "new", label: "I am setting up a new business", packageId: "starter" },
  { id: "steady", label: "I need a steady content and ads routine", packageId: "grow" },
  { id: "together", label: "I want content, campaigns and search working together", packageId: "professional" },
  { id: "multi", label: "I run several channels and need deeper optimization", packageId: "advanced" },
  { id: "full", label: "I want ongoing growth management, including the website", packageId: "enterprise" },
];

export const getPackage = (id: PackageId) => packages.find((p) => p.id === id) as Package;
