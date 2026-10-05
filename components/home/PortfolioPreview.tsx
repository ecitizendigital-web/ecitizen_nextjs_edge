import { MotionReveal } from "@/components/motion/MotionReveal";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio, portfolioIntro } from "@/data/portfolio";
import styles from "./PortfolioPreview.module.css";

export function PortfolioPreview() {
  return (
    <section className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          title={portfolioIntro.previewHeading}
          lead={portfolioIntro.previewLead}
          action={
            <Button href="/portfolio" track="portfolio_click">
              See the concepts
            </Button>
          }
        />
        <ul className={styles.grid}>
          {portfolio.map((item, index) => (
            <li key={item.id}>
              <MotionReveal delay={index * 80} className={styles.reveal}>
                <ProjectCard item={item} compact />
              </MotionReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
