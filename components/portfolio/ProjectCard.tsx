import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import type { PortfolioItem } from "@/data/portfolio";
import { ConceptVisual } from "./ConceptVisual";
import styles from "./ProjectCard.module.css";

type Props = { item: PortfolioItem; compact?: boolean };

export function ProjectCard({ item, compact = false }: Props) {
  return (
    <GlassCard as="article" className={`${styles.card} ${compact ? styles.compact : ""}`} aria-labelledby={`project-${item.id}`}>
      <figure className={styles.figure}>
        <ConceptVisual kind={item.visual} />
        <figcaption>Concept sketch, not a client result.</figcaption>
      </figure>
      <div className={styles.body}>
        <p className={styles.meta}>
          <Badge tone="accent">{item.status}</Badge>
          <span>{item.category}</span>
        </p>
        <h3 id={`project-${item.id}`} className={styles.title}>{item.title}</h3>

        {compact ? (
          <p className={styles.summary}>{item.summary}</p>
        ) : (
          <dl className={styles.story}>
            <div>
              <dt>The problem</dt>
              <dd>{item.problem}</dd>
            </div>
            <div>
              <dt>The approach</dt>
              <dd>{item.approach}</dd>
            </div>
            <div>
              <dt>Intended outcome</dt>
              <dd>{item.intendedOutcome}</dd>
            </div>
          </dl>
        )}

        <ul className={styles.services} aria-label="Services used">
          {item.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>

        {compact ? (
          <Link href="/portfolio" className={styles.link} aria-label={`See the concept: ${item.title}`}>
            See the concept
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    </GlassCard>
  );
}
