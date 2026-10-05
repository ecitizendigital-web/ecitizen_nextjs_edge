"use client";

import { useState } from "react";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { monthlyPackages } from "@/data/packages";
import { LaunchToggle } from "./LaunchToggle";
import { PricingCard } from "./PricingCard";
import { StarterCard } from "./StarterCard";
import styles from "./PricingSection.module.css";

/** Starter (entry) above the four monthly packages. One piece of state drives every price on screen. */
export function PricingSection({ variant = "full" }: { variant?: "full" | "preview" }) {
  const [launch, setLaunch] = useState(true);
  const compact = variant === "preview";

  return (
    <div className={styles.section}>
      <LaunchToggle checked={launch} onChange={setLaunch} />
      <StarterCard launch={launch} compact={compact} />
      <ul className={styles.grid}>
        {monthlyPackages.map((pkg, index) => (
          <li key={pkg.id}>
            <MotionReveal delay={index * 70} className={styles.reveal}>
              <PricingCard pkg={pkg} launch={launch} compact={compact} />
            </MotionReveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
