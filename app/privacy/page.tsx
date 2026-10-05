import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/lib/legal";
import { buildMetadata } from "@/lib/seo";

const page = getLegalPage("privacy");

export const metadata = buildMetadata({
  title: page.seoTitle,
  description: page.description,
  path: "/privacy",
});

export default function Page() {
  return <LegalPageView slug="privacy" />;
}
