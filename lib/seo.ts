import type { Metadata } from "next";
import { absoluteUrl, site } from "@/data/site";

type PageSeo = {
  title: string;
  description: string;
  /** Path starting with "/". Used for the canonical URL and og:url. */
  path: string;
  /** Use the title as-is instead of adding "| eCitizen Digital". */
  absoluteTitle?: boolean;
  socialTitle?: string;
  socialDescription?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

/** One place to build per-page metadata so every route gets a unique canonical, Open Graph and Twitter card. */
export function buildMetadata(page: PageSeo): Metadata {
  const fullTitle = page.absoluteTitle ? page.title : `${page.title} | ${site.name}`;
  const socialTitle = page.socialTitle ?? fullTitle;
  const socialDescription = page.socialDescription ?? page.description;
  const { ogImage } = site.assets;
  const images = [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt }];
  const url = absoluteUrl(page.path);
  const base = { title: socialTitle, description: socialDescription, url, siteName: site.name, locale: "en_BD", images };

  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: url },
    ...(page.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph:
      page.type === "article"
        ? {
            ...base,
            type: "article",
            publishedTime: page.publishedTime,
            modifiedTime: page.modifiedTime,
            authors: [site.name],
            tags: page.tags,
          }
        : { ...base, type: "website" },
    twitter: { card: "summary_large_image", title: socialTitle, description: socialDescription, images: [ogImage.src] },
  };
}
