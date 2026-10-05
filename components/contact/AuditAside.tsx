import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { auditNextSteps, auditPrivacyNote, auditScope } from "@/data/audit";
import { mailtoHref, phoneHref, site, whatsappUrl } from "@/data/site";
import styles from "./AuditAside.module.css";

/** Everything a visitor wants to know before filling in the form. */
export function AuditAside() {
  return (
    <div className={styles.aside}>
      <section aria-labelledby="audit-scope-title">
        <h2 id="audit-scope-title" className={styles.title}>What the audit covers</h2>
        <dl className={styles.scope}>
          {auditScope.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="audit-next-title">
        <h2 id="audit-next-title" className={styles.title}>What happens after you send it</h2>
        <ol className={styles.steps}>
          {auditNextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="audit-data-title">
        <h2 id="audit-data-title" className={styles.title}>How your information is handled</h2>
        <p className={styles.text}>
          {auditPrivacyNote} <Link href="/lead-data">Read the lead data notice</Link>.
        </p>
      </section>

      <section aria-labelledby="audit-talk-title" className={styles.talk}>
        <h2 id="audit-talk-title" className={styles.title}>Prefer to talk first?</h2>
        <div className={styles.actions}>
          <Button href={whatsappUrl()} track="whatsapp_click">
            <WhatsAppIcon size={18} />
            WhatsApp
          </Button>
          <Button href={phoneHref} track="phone_click">
            <Phone size={17} aria-hidden="true" />
            {site.contact.phone.display}
          </Button>
          <Button href={mailtoHref}>
            <Mail size={17} aria-hidden="true" />
            {site.contact.email}
          </Button>
        </div>
      </section>
    </div>
  );
}
