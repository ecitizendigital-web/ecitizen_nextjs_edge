import { Capabilities } from "@/components/home/Capabilities";
import { FinalCta } from "@/components/home/FinalCta";
import { GrowthSystemSection } from "@/components/home/GrowthSystemSection";
import { Hero } from "@/components/home/Hero";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { PackagesPreview } from "@/components/home/PackagesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { Problem } from "@/components/home/Problem";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${site.name} | ${site.positioning}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <GrowthSystemSection />
      <Capabilities />
      <ServicesPreview />
      <PackagesPreview />
      <PortfolioPreview />
      <InsightsPreview />
      <WhyUs />
      <FinalCta />
    </>
  );
}
