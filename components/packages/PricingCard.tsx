import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import type { Package } from "@/data/packages";
import { PriceBlock } from "./PriceBlock";
import styles from "./PricingCard.module.css";

type Props = { pkg: Package; launch: boolean; compact?: boolean };

/** Every "Choose" button sends the visitor to /contact?pick=NAME, where the audit form is pre-filled. */
export function PricingCard({ pkg, launch, compact = false }: Props) {
  const features = compact ? pkg.highlights : pkg.features;
  return (
    <GlassCard as="article" highlighted={pkg.highlighted} className={styles.card} aria-labelledby={`pkg-${pkg.id}`}>
      <div className={styles.top}>
        <Badge tone={pkg.highlighted ? "solid" : "neutral"}>{pkg.role}</Badge>
        <h3 id={`pkg-${pkg.id}`} className={styles.name}>{pkg.name}</h3>
        {compact ? null : <p className={styles.description}>{pkg.description}</p>}
      </div>
      <PriceBlock pkg={pkg} launch={launch} />
      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature}>
            <Check size={16} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href={`/contact?pick=${encodeURIComponent(pkg.name)}#free-audit`}
        variant={pkg.highlighted ? "primary" : "secondary"}
        block
        track={`package_${pkg.id}_click`}
      >
        {pkg.cta}
      </Button>
    </GlassCard>
  );
}
