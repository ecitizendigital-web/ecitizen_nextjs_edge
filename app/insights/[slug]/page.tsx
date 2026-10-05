import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/insights/ArticleHeader";
import { InsightCard } from "@/components/insights/InsightCard";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { MdxContent } from "@/components/ui/MdxContent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articleLd, breadcrumbLd } from "@/lib/jsonld";
import { getAllInsights, getInsight, getRelatedInsights } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";
import styles from "./article.module.css";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

/** Every article is built at deploy time. An unknown slug is a 404, not a runtime render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInsights().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  const { meta } = insight;
  return buildMetadata({
    title: meta.seoTitle,
    description: meta.description,
    path: `/insights/${meta.slug}`,
    socialTitle: meta.title,
    type: "article",
    publishedTime: meta.date,
    modifiedTime: meta.updated,
    tags: meta.tags,
  });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const { meta, content } = insight;
  const related = getRelatedInsights(slug, 3);

  return (
    <>
      <JsonLd data={articleLd(meta)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: meta.seoTitle, path: `/insights/${meta.slug}` },
        ])}
      />

      <article>
        <ArticleHeader insight={meta} />
        <div className={`container ${styles.layout}`}>
          <MdxContent source={content} lang={meta.language === "bn-en" ? "bn" : undefined} />
          <aside className={styles.aside} aria-labelledby="related-services">
            <h2 id="related-services" className={styles.asideTitle}>Related services</h2>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/packages">Packages</Link></li>
              <li><Link href="/contact#free-audit">Free digital audit</Link></li>
            </ul>
          </aside>
        </div>
      </article>

      <section className="section--tight" aria-labelledby="related-title">
        <div className="container">
          <SectionHeading id="related-title" title="Keep reading" />
          <ul className={styles.related}>
            {related.map((item) => (
              <li key={item.slug}>
                <InsightCard insight={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Find the next digital opportunity."
        body="Request a free digital audit and we will review visibility, trust, conversion and foundation."
        actions={
          <Button href="/contact#free-audit" variant="primary" size="lg" track="free_audit_click">
            Request a free audit
          </Button>
        }
      />
    </>
  );
}
