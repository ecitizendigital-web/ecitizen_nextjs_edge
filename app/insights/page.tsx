import { FounderNote } from "@/components/about/FounderNote";
import { InsightsExplorer } from "@/components/insights/InsightsExplorer";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { getAllInsights, getFeaturedInsights, getInsightCategories } from "@/lib/insights";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Evidence-led analysis on local SEO, websites, content and measurement for businesses in Kishoreganj and across Bangladesh.",
  path: "/insights",
});

export default function InsightsPage() {
  const insights = getAllInsights();
  const featured = getFeaturedInsights(1)[0] ?? insights[0];

  return (
    <>
      <PageHero
        eyebrow="Insights"
        headline={["Practical thinking for", "Bangladesh businesses."]}
        lead="Evidence-led analysis on local SEO, websites, content and measurement, written for businesses in Kishoreganj and across Bangladesh."
      />

      <section className="section--tight">
        <div className="container">
          <InsightsExplorer insights={insights} categories={getInsightCategories()} featuredSlug={featured.slug} />
        </div>
      </section>

      <section className="section--tight">
        <div className="container">
          <FounderNote />
        </div>
      </section>

      <CtaBand
        title="Turn insight into action."
        body="Request a free digital audit and we will review where your business can improve visibility, trust and conversion."
        actions={
          <Button href="/contact#free-audit" variant="primary" size="lg" track="free_audit_click">
            Request a free audit
          </Button>
        }
      />
    </>
  );
}
