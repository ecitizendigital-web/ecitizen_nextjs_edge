import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { starter, starterIncludes } from "@/data/packages";
import { PriceBlock } from "./PriceBlock";
import styles from "./StarterCard.module.css";

export function StarterCard({ launch, compact = false }: { launch: boolean; compact?: boolean }) {
  return (
    <GlassCard as="article" className={styles.card} aria-labelledby="pkg-starter">
      <div className={styles.main}>
        <div className={styles.badges}>
          <Badge tone="accent">{starter.role}</Badge>
          <Badge>One-time setup</Badge>
        </div>
        <h3 id="pkg-starter" className={styles.name}>{starter.name}</h3>
        <p className={styles.lead}>{starter.title}</p>
        {compact ? null : <p className={styles.description}>{starter.description}</p>}
        <PriceBlock pkg={starter} launch={launch} />
        <Button href={`/contact?pick=${encodeURIComponent(starter.name)}#free-audit`} variant="primary" track="package_starter_click">
          {starter.cta}
        </Button>
      </div>

      {compact ? (
        <ul className={styles.highlights}>
          {starter.highlights.map((item) => (
            <li key={item}>
              <Check size={16} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <dl className={styles.includes}>
          {starterIncludes.map((group) => (
            <div key={group.title}>
              <dt>{group.title}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      )}
    </GlassCard>
  );
}
