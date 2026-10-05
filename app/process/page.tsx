import { GrowthSystem } from "@/components/process/GrowthSystem";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { processIntro } from "@/data/process";
import { buildMetadata } from "@/lib/seo";
import styles from "./process.module.css";

export const metadata = buildMetadata({
  title: "Our Process",
  description:
    "A growth system in six stages: understand, build, reach, convert, optimize and grow. See how strategy turns into measurable action.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow={processIntro.eyebrow} headline={processIntro.headline} lead={processIntro.lead} />

      <section className="section--tight" aria-labelledby="stages-title">
        <div className="container">
          <h2 id="stages-title" className="sr-only">The six stages</h2>
          <GrowthSystem variant="full" />
          <p className={styles.loop}>{processIntro.loopNote}</p>
        </div>
      </section>

      <CtaBand
        title="See where your business sits in the loop."
        body="The free audit shows which stage is holding growth back, so the first move is the right one."
        actions={
          <>
            <Button href="/contact#free-audit" variant="primary" size="lg" track="free_audit_click">
              Request a free audit
            </Button>
            <Button href="/services" size="lg" track="services_click">
              Explore services
            </Button>
          </>
        }
      />
    </>
  );
}
