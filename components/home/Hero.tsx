import { Check } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxHero } from "@/components/motion/ParallaxHero";
import { Badge } from "@/components/ui/Badge";
import { hero } from "@/data/home";
import { HeroScene } from "./HeroScene";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <ParallaxHero className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Badge tone="accent">
            <span className={styles.dot} aria-hidden="true" />
            {hero.eyebrow}
          </Badge>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.muted}>{hero.headline[0]}</span>
            <span className={styles.strong}>{hero.headline[1]}</span>
          </h1>
          <p className={styles.lead}>
            {hero.lead} <strong>{hero.contrast}</strong>
          </p>
          <div className={styles.actions}>
            <MagneticButton href={hero.primaryCta.href} track={hero.primaryCta.track}>
              {hero.primaryCta.label}
            </MagneticButton>
            <MagneticButton href={hero.secondaryCta.href} track={hero.secondaryCta.track} variant="secondary">
              {hero.secondaryCta.label}
            </MagneticButton>
          </div>
          <ul className={styles.trust}>
            {hero.trust.map((item) => (
              <li key={item}>
                <Check size={15} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <HeroScene />
      </ParallaxHero>
    </section>
  );
}
