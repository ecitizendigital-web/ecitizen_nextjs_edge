export type GrowthStage = {
  id: string;
  name: string;
  /** The question this stage answers. */
  question: string;
  description: string;
  /** One-line version used where space is tight. */
  brief: string;
  focus: string[];
  outcome: string;
};

export const growthStages: GrowthStage[] = [
  {
    id: "understand",
    name: "Understand",
    question: "What is actually holding growth back?",
    description:
      "Start with the business: audience, offer, market position, competition and the bottleneck limiting growth.",
    brief: "Research, audience, offer, market position and objectives.",
    focus: ["Research", "Positioning", "Audience", "Objectives"],
    outcome: "Clarity",
  },
  {
    id: "build",
    name: "Build",
    question: "Is the business credible where customers look?",
    description:
      "Turn the strategy into credible digital assets: brand, website, landing pages, content systems and conversion foundations.",
    brief: "Brand, website, content and conversion foundations.",
    focus: ["Website", "Brand", "Content", "Conversion"],
    outcome: "Credibility",
  },
  {
    id: "reach",
    name: "Reach",
    question: "Are the right people seeing the right message?",
    description:
      "Put the right message in front of the right people through organic distribution, paid media, search and targeted campaigns.",
    brief: "Distribution through organic channels, paid media and search.",
    focus: ["Meta", "Google", "SEO", "Distribution"],
    outcome: "Attention",
  },
  {
    id: "convert",
    name: "Convert",
    question: "Does attention turn into an enquiry?",
    description:
      "Connect attention to action with clear offers, landing experiences, lead capture and a journey that reduces friction.",
    brief: "Offers, landing experiences, lead capture and customer journey.",
    focus: ["Offers", "Landing pages", "Lead capture", "UX"],
    outcome: "Action",
  },
  {
    id: "optimize",
    name: "Optimize",
    question: "What deserves more investment, and where does the journey leak?",
    description:
      "Use performance signals to see what deserves more investment, what should change and where the customer journey leaks.",
    brief: "Performance review, testing, reporting and iteration.",
    focus: ["Analytics", "Testing", "Iteration", "Reporting"],
    outcome: "Intelligence",
  },
  {
    id: "grow",
    name: "Grow",
    question: "What should the next cycle do better?",
    description:
      "Feed the intelligence back into the system. The next cycle becomes more informed, more focused and more scalable.",
    brief: "Scale what works and feed learning into the next cycle.",
    focus: ["Compounding", "Scale", "Retention", "Next move"],
    outcome: "Compounding",
  },
];

export const processIntro = {
  eyebrow: "Process",
  headline: ["A disciplined route", "from idea to growth."],
  lead: "We keep the customer journey simple while the work behind it stays structured and measurable.",
  homeHeading: "Understand. Build. Reach. Convert. Optimize. Grow.",
  homeLead: "A loop that turns business context into action, evidence and the next better move.",
  loopNote: "Grow feeds back into Understand. Each cycle starts with more evidence than the last.",
} as const;
