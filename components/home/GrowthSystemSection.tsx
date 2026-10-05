import { GrowthSystem } from "@/components/process/GrowthSystem";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processIntro } from "@/data/process";

export function GrowthSystemSection() {
  return (
    <section className="section" aria-labelledby="growth-title">
      <div className="container">
        <SectionHeading
          id="growth-title"
          title={processIntro.homeHeading}
          lead={processIntro.homeLead}
          action={
            <Button href="/process" track="process_click">
              See how we work
            </Button>
          }
        />
        <GrowthSystem />
      </div>
    </section>
  );
}
