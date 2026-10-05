import { FounderNote } from "@/components/about/FounderNote";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageHero } from "@/components/ui/PageHero";
import { aboutCards, aboutIntro, aboutPromise } from "@/data/about";
import { buildMetadata } from "@/lib/seo";
import styles from "./about.module.css";

export const metadata = buildMetadata({
  title: "About",
  description:
    "eCitizen Digital is a growth partner, not a task vendor: strategy, execution, data and growth for Bangladesh SMEs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutIntro.eyebrow} headline={aboutIntro.headline} lead={aboutIntro.lead} />

      <section className="section--tight" aria-label="About eCitizen Digital">
        <div className="container">
          <ul className={styles.grid}>
            {aboutCards.map((card) => (
              <li key={card.label}>
                <GlassCard as="article" className={styles.card}>
                  <p className={styles.label}>{card.label}</p>
                  <h2 className={styles.title}>{card.title}</h2>
                  <p className={styles.body}>{card.body}</p>
                </GlassCard>
              </li>
            ))}
          </ul>
          <GlassCard as="div" highlighted className={styles.promise}>
            <p className={styles.label}>{aboutPromise.label}</p>
            <p className={styles.promiseText}>
              {aboutPromise.lines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <FounderNote />
        </div>
      </section>

      <CtaBand
        title="Let's look at your business together."
        body="The free digital audit is the simplest way to see how we think and where your business can grow."
        actions={
          <>
            <Button href="/contact#free-audit" variant="primary" size="lg" track="free_audit_click">
              Request a free audit
            </Button>
            <Button href="/process" size="lg" track="process_click">
              See how we work
            </Button>
          </>
        }
      />
    </>
  );
}
