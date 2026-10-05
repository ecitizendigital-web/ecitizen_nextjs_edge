import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/lib/legal";
import { buildMetadata } from "@/lib/seo";

const page = getLegalPage("lead-data");

export const metadata = buildMetadata({
  title: page.seoTitle,
  description: page.description,
  path: "/lead-data",
});

export default function Page() {
  return <LegalPageView slug="lead-data" />;
}
