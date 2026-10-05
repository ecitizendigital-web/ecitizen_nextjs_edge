"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { getPackage, recommendations } from "@/data/packages";
import { formatBdt } from "@/lib/format";
import styles from "./PackageRecommender.module.css";

/** Not sure where to start? Pick the sentence that sounds like your business. */
export function PackageRecommender() {
  const [choice, setChoice] = useState<string | null>(null);
  const picked = recommendations.find((item) => item.id === choice);
  const pkg = picked ? getPackage(picked.packageId) : null;

  return (
    <GlassCard as="section" className={styles.card} aria-labelledby="recommender-title">
      <div className={styles.copy}>
        <h2 id="recommender-title" className={styles.title}>Not sure which package fits?</h2>
        <p className={styles.lead}>Pick the sentence that sounds most like your business right now.</p>
      </div>

      <fieldset className={styles.options}>
        <legend className="sr-only">Which describes your business best?</legend>
        {recommendations.map((item) => (
          <label key={item.id} className={styles.option}>
            <input type="radio" name="recommendation" value={item.id} checked={choice === item.id} onChange={() => setChoice(item.id)} />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>

      <div className={styles.result} aria-live="polite">
        {pkg ? (
          <>
            <p className={styles.suggest}>
              Suggested starting point: <strong>{pkg.name}</strong>
            </p>
            <p className={styles.text}>{pkg.description}</p>
            <p className={styles.price}>
              {formatBdt(pkg.price)} regular, {formatBdt(pkg.launchPrice)} with the launch offer{pkg.billing === "monthly" ? ", per month" : ", one-time"}.
            </p>
            <Button href={`/contact?pick=${encodeURIComponent(pkg.name)}#free-audit`} variant="primary" track={`package_${pkg.id}_click`}>
              {pkg.cta}
            </Button>
          </>
        ) : (
          <p className={styles.text}>Your suggestion will appear here. The free audit can confirm it for your business.</p>
        )}
      </div>
    </GlassCard>
  );
}
