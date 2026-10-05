import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { portfolio, portfolioIntro } from "@/data/portfolio";
import { buildMetadata } from "@/lib/seo";
import styles from "./portfolio.module.css";

export const metadata = buildMetadata({
  title: "Portfolio and Concepts",
  description:
    "Concept and demo work from eCitizen Digital, clearly labelled. Real client results appear only once they are verified and approved.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero eyebrow={portfolioIntro.eyebrow} headline={portfolioIntro.headline} lead={portfolioIntro.lead} />

      <section className="section--tight">
        <div className="container">
          <h2 className="sr-only">Concept projects</h2>
          <ul className={styles.list}>
            {portfolio.map((item) => (
              <li key={item.id}>
                <ProjectCard item={item} />
              </li>
            ))}
          </ul>
          <p className={styles.evidence}>
            <strong>{portfolioIntro.evidenceNote.title}.</strong> {portfolioIntro.evidenceNote.body}
          </p>
        </div>
      </section>

      <CtaBand
        title="Start with your own business problem."
        body="The free audit applies the same thinking to your business: what to fix first and what to leave alone."
        actions={
          <Button href="/contact#free-audit" variant="primary" size="lg" track="free_audit_click">
            Request a free audit
          </Button>
        }
      />
    </>
  );
}
