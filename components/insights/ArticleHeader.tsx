import { Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { site } from "@/data/site";
import { formatDate } from "@/lib/format";
import type { InsightMeta } from "@/lib/insights";
import styles from "./ArticleHeader.module.css";

export function ArticleHeader({ insight }: { insight: InsightMeta }) {
  const bangla = insight.language === "bn-en";
  return (
    <header className={styles.header}>
      <div className="container-narrow">
        <nav aria-label="Breadcrumb">
          <ol className={styles.crumbs}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li aria-current="page">{insight.seoTitle}</li>
          </ol>
        </nav>

        <div className={styles.badges}>
          <Badge tone="accent">{insight.category}</Badge>
          {bangla ? <Badge>Bangla and English</Badge> : null}
        </div>

        <h1 className={styles.title}>{insight.title}</h1>
        <p className={styles.dek} lang={bangla ? "bn" : undefined}>{insight.dek}</p>

        <p className={styles.meta}>
          <span>By {site.name}</span>
          <time dateTime={insight.date}>{formatDate(insight.date)}</time>
          <span className={styles.read}>
            <Clock size={14} aria-hidden="true" />
            {insight.readingMinutes} min read
          </span>
        </p>

        {insight.summary ? (
          <div className={styles.summary}>
            <p className={styles.summaryLabel}>Summary in English</p>
            <p>{insight.summary}</p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
