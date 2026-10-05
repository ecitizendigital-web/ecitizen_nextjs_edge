import { InsightCard } from "@/components/insights/InsightCard";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insightsPreviewIntro } from "@/data/home";
import { getFeaturedInsights } from "@/lib/insights";
import styles from "./InsightsPreview.module.css";

export function InsightsPreview() {
  const insights = getFeaturedInsights(3);
  return (
    <section className="section" aria-labelledby="insights-title">
      <div className="container">
        <SectionHeading
          id="insights-title"
          title={insightsPreviewIntro.heading}
          lead={insightsPreviewIntro.lead}
          action={
            <Button href="/insights" track="insights_click">
              All insights
            </Button>
          }
        />
        <ul className={styles.grid}>
          {insights.map((insight, index) => (
            <li key={insight.slug}>
              <MotionReveal delay={index * 70} className={styles.reveal}>
                <InsightCard insight={insight} />
              </MotionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
