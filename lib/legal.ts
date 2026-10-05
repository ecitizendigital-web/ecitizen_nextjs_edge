import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { mailtoHref, phoneHref, site } from "@/data/site";

const LEGAL_DIR = path.join(process.cwd(), "content", "legal");

export type LegalSlug = "privacy" | "terms" | "cookie" | "lead-data";

export type LegalPage = {
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  updated: string;
  /** "draft-for-review" shows a review notice on the page. Change it to "reviewed" once a lawyer has signed off. */
  status: string;
  content: string;
};

/** Contact details in legal copy come from data/site.ts, so they can be changed in one place. */
function fillContactTokens(source: string): string {
  return source
    .replaceAll("{{email}}", site.contact.email)
    .replaceAll("{{emailHref}}", mailtoHref)
    .replaceAll("{{phone}}", site.contact.phone.display)
    .replaceAll("{{phoneHref}}", phoneHref);
}

export function getLegalPage(slug: LegalSlug): LegalPage {
  const raw = fs.readFileSync(path.join(LEGAL_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return {
    title: String(data.title),
    seoTitle: String(data.seoTitle),
    description: String(data.description),
    intro: String(data.intro),
    updated: String(data.updated),
    status: String(data.status ?? ""),
    content: fillContactTokens(content),
  };
}
