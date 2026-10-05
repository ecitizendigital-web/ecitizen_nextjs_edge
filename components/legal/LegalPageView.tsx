import { CtaBand } from "@/components/ui/CtaBand";
import { MdxContent } from "@/components/ui/MdxContent";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { getLegalPage, type LegalSlug } from "@/lib/legal";
import styles from "./LegalPageView.module.css";

/**
 * Renders a legal page from content/legal/*.mdx. While a page's frontmatter says
 * `status: draft-for-review`, a visible notice reminds the owner (and visitors) that it awaits legal review.
 */
export function LegalPageView({ slug }: { slug: LegalSlug }) {
  const page = getLegalPage(slug);
  return (
    <>
      <PageHero eyebrow="Legal" headline={[page.title]} lead={page.intro} />
      <section className="section--tight">
        <div className="container-narrow">
          {page.status === "draft-for-review" ? (
            <p className={styles.notice} role="note">
              <strong>Draft for legal review.</strong> This page is a plain-language description of how this site works. It has not yet been reviewed by a lawyer.
            </p>
          ) : null}
          <MdxContent source={page.content} />
        </div>
      </section>
      <CtaBand
        title="Questions about this page?"
        body="Tell us what you would like clarified and we will reply directly."
        actions={
          <Button href="/contact#free-audit" variant="primary" track="free_audit_click">
            Contact us
          </Button>
        }
      />
    </>
  );
}
