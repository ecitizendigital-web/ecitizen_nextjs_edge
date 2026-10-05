import { PricingSection } from "@/components/packages/PricingSection";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { packagesIntro } from "@/data/packages";

export function PackagesPreview() {
  return (
    <section className="section" aria-labelledby="packages-title">
      <div className="container">
        <SectionHeading
          id="packages-title"
          title={packagesIntro.previewHeading}
          lead={packagesIntro.previewLead}
          action={
            <Button href="/packages" track="packages_click">
              Compare all packages
            </Button>
          }
        />
        <PricingSection variant="preview" />
      </div>
    </section>
  );
}
