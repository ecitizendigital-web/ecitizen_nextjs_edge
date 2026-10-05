import { packages } from "./packages";

export const auditIntro = {
  eyebrow: "Free Digital Audit",
  headline: ["Find the next", "growth opportunity."],
  lead: "Give us a quick picture of your business and digital presence. We will use it to identify practical opportunities, friction points and possible next moves.",
} as const;

export const auditScope = [
  { title: "Visibility", body: "Search, social presence and discoverability." },
  { title: "Trust", body: "Brand, content and customer-facing experience." },
  { title: "Conversion", body: "Offers, landing experience and lead friction." },
  { title: "Foundation", body: "Website, tracking, SEO and digital setup." },
] as const;

/** Describes only what the source site says happens with a request. No response-time promise is made. */
export const auditNextSteps = [
  "You send the short form. Name, phone and business name are the only required details.",
  "We review your business, website or page across visibility, trust, conversion and foundation.",
  "We contact you about what we found and the practical next steps.",
] as const;

export const auditPrivacyNote =
  "We use these details only to reply to your request and prepare the audit or proposal you asked for.";

export const auditFocusOptions = [
  "Overall digital presence",
  "Facebook / Instagram",
  "Website / landing page",
  "Google visibility / SEO",
  "Brand & creative",
  "Not sure — review everything",
] as const;

export const goalOptions = [
  "Get more customers",
  "Improve online presence",
  "Generate more leads",
  "Improve brand perception",
  "Build a website / digital system",
  "Not sure yet",
] as const;

export const NO_PACKAGE = "Not sure yet";
export const packageOptions = [NO_PACKAGE, ...packages.map((p) => p.name)] as const;
