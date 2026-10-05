import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");
const WORDS_PER_MINUTE = 200;

export type InsightMeta = {
  slug: string;
  /** H1 and social title. */
  title: string;
  /** Short title for the <title> tag, so Google does not truncate it. */
  seoTitle: string;
  excerpt: string;
  description: string;
  category: string;
  /** "bn-en" articles are written mainly in Bangla with English terms and an English summary. */
  language: "en" | "bn-en";
  /** ISO date (YYYY-MM-DD). */
  date: string;
  updated: string;
  order: number;
  featured: boolean;
  tags: string[];
  keywords: string[];
  focus: string;
  /** Opening paragraph shown under the title. */
  dek: string;
  /** English summary for Bangla articles. */
  summary?: string;
  readingMinutes: number;
};

export type Insight = { meta: InsightMeta; content: string };

type Frontmatter = Record<string, unknown>;

function text(data: Frontmatter, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`content/insights/${file}: frontmatter field "${key}" is required and must be text.`);
  }
  return value.trim();
}

function list(data: Frontmatter, key: string, file: string): string[] {
  const value = data[key];
  if (!Array.isArray(value) || value.some((v) => typeof v !== "string")) {
    throw new Error(`content/insights/${file}: frontmatter field "${key}" must be a list of text values.`);
  }
  return value as string[];
}

function parseFile(file: string): Insight {
  const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const language = data.language === "bn-en" ? "bn-en" : "en";
  const date = text(data, "date", file);
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

  return {
    content,
    meta: {
      slug: file.replace(/\.mdx$/, ""),
      title: text(data, "title", file),
      seoTitle: text(data, "seoTitle", file),
      excerpt: text(data, "excerpt", file),
      description: text(data, "description", file),
      category: text(data, "category", file),
      language,
      date,
      updated: typeof data.updated === "string" ? data.updated : date,
      order: typeof data.order === "number" ? data.order : 999,
      featured: data.featured === true,
      tags: list(data, "tags", file),
      keywords: list(data, "keywords", file),
      focus: text(data, "focus", file),
      dek: text(data, "dek", file),
      summary: typeof data.summary === "string" ? data.summary : undefined,
      readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    },
  };
}

let cache: Insight[] | null = null;

function loadAll(): Insight[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".mdx"));
  cache = files
    .map(parseFile)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date) || a.meta.order - b.meta.order);
  return cache;
}

export const getAllInsights = (): InsightMeta[] => loadAll().map((i) => i.meta);

export const getInsight = (slug: string): Insight | null => loadAll().find((i) => i.meta.slug === slug) ?? null;

export const getFeaturedInsights = (limit = 3): InsightMeta[] =>
  getAllInsights()
    .filter((i) => i.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);

export function getRelatedInsights(slug: string, limit = 3): InsightMeta[] {
  const all = getAllInsights();
  const current = all.find((i) => i.slug === slug);
  const others = all.filter((i) => i.slug !== slug).sort((a, b) => a.order - b.order);
  const sameCategory = others.filter((i) => i.category === current?.category);
  const rest = others.filter((i) => i.category !== current?.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getInsightCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const { category } of getAllInsights()) counts.set(category, (counts.get(category) ?? 0) + 1);
  return [...counts].map(([name, count]) => ({ name, count }));
}
