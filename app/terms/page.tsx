import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/lib/legal";
import { buildMetadata } from "@/lib/seo";

const page = getLegalPage("terms");

export const metadata = buildMetadata({
  title: page.seoTitle,
  description: page.description,
  path: "/terms",
});

export default function Page() {
  return <LegalPageView slug="terms" />;
}
