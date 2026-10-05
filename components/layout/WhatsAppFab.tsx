import { WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/data/site";
import styles from "./WhatsAppFab.module.css";

/** Floating WhatsApp shortcut. Rises above the cookie banner via --consent-offset, which the banner sets. */
export function WhatsAppFab() {
  return (
    <aside aria-label="Quick contact">
      <a
        className={styles.fab}
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        data-track="whatsapp_click"
        aria-label="Let's talk on WhatsApp (opens in a new tab)"
      >
        <WhatsAppIcon size={24} />
        <span className={styles.label}>Let&apos;s talk</span>
      </a>
    </aside>
  );
}
