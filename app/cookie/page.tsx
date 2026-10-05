import { LegalPageView } from "@/components/legal/LegalPageView";
import { getLegalPage } from "@/lib/legal";
import { buildMetadata } from "@/lib/seo";

const page = getLegalPage("cookie");

export const metadata = buildMetadata({
  title: page.seoTitle,
  description: page.description,
  path: "/cookie",
});

export default function Page() {
  return <LegalPageView slug="cookie" />;
}
