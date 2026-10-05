"use client";

import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/data/site";
import styles from "./not-found.module.css";

/** Shown if a page fails while rendering. The visitor can retry, go home or reach us directly. */
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container-narrow">
        <h1 className={styles.title}>Something went wrong.</h1>
        <p className={styles.lead}>The page could not be shown. Try again, or reach us directly and we will help.</p>
        <div className={styles.actions}>
          <Button variant="primary" onClick={reset}>Try again</Button>
          <Button href="/">Back to the homepage</Button>
          <Button href={whatsappUrl()} track="whatsapp_click">Message us on WhatsApp</Button>
        </div>
      </div>
    </section>
  );
}
