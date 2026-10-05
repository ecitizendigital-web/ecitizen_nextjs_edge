import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { faqIntro, faqs } from "@/data/faq";
import { whatsappUrl } from "@/data/site";
import { faqLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description: "Answers about eCitizen Digital's services, packages, the free digital audit, advertising budgets and results.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <PageHero eyebrow={faqIntro.eyebrow} headline={faqIntro.headline} lead={faqIntro.lead} />
      <section className="section--tight" aria-label="Frequently asked questions">
        <div className="container-narrow">
          <h2 className="sr-only">Questions and answers</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>
      <CtaBand
        title="Still have a question?"
        body="Ask us directly, or start with the free audit and we will answer it with your business in mind."
        actions={
          <>
            <Button href="/contact#free-audit" variant="primary" size="lg" track="free_audit_click">
              Request a free audit
            </Button>
            <Button href={whatsappUrl()} size="lg" track="whatsapp_click">
              <WhatsAppIcon size={18} />
              Ask on WhatsApp
            </Button>
          </>
        }
      />
    </>
  );
}
