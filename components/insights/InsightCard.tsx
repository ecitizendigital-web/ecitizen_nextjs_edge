import { Clock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDate } from "@/lib/format";
import type { InsightMeta } from "@/lib/insights";
import styles from "./InsightCard.module.css";

/** The title link is stretched over the whole card, so the card is one large tap target. */
export function InsightCard({ insight }: { insight: InsightMeta }) {
  return (
    <GlassCard as="article" interactive className={styles.card}>
      <div className={styles.badges}>
        <Badge tone="accent">{insight.category}</Badge>
        {insight.language === "bn-en" ? <Badge>Bangla and English</Badge> : null}
      </div>
      <h3 className={styles.title}>
        <Link href={`/insights/${insight.slug}`} className={styles.link}>
          {insight.title}
        </Link>
      </h3>
      <p className={styles.excerpt}>{insight.excerpt}</p>
      <p className={styles.foot}>
        <time dateTime={insight.date}>{formatDate(insight.date)}</time>
        <span className={styles.read}>
          <Clock size={14} aria-hidden="true" />
          {insight.readingMinutes} min read
        </span>
      </p>
    </GlassCard>
  );
}
