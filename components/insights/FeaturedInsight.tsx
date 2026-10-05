import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/format";
import type { InsightMeta } from "@/lib/insights";
import styles from "./FeaturedInsight.module.css";

export function FeaturedInsight({ insight }: { insight: InsightMeta }) {
  return (
    <GlassCard as="article" highlighted className={styles.card}>
      <div className={styles.badges}>
        <Badge tone="solid">Featured</Badge>
        <Badge tone="accent">{insight.category}</Badge>
        {insight.language === "bn-en" ? <Badge>Bangla and English</Badge> : null}
      </div>
      <h2 className={styles.title}>
        <Link href={`/insights/${insight.slug}`} className={styles.link}>
          {insight.title}
        </Link>
      </h2>
      <p className={styles.excerpt}>{insight.excerpt}</p>
      <p className={styles.foot}>
        <time dateTime={insight.date}>{formatDate(insight.date)}</time>
        <span className={styles.read}>
          <Clock size={14} aria-hidden="true" />
          {insight.readingMinutes} min read
        </span>
        <span className={styles.cta} aria-hidden="true">
          Read the analysis
          <ArrowRight size={16} />
        </span>
      </p>
    </GlassCard>
  );
}
