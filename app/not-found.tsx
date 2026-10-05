import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className={`section ${styles.wrap}`}>
      <div className="container-narrow">
        <Badge tone="accent">404</Badge>
        <h1 className={styles.title}>This page is not here.</h1>
        <p className={styles.lead}>The link may be old or mistyped. These are the places most visitors are looking for.</p>
        <div className={styles.actions}>
          <Button href="/" variant="primary">Back to the homepage</Button>
          <Button href="/services">Services</Button>
          <Button href="/insights">Insights</Button>
          <Button href="/contact#free-audit" track="free_audit_click">Request a free audit</Button>
        </div>
      </div>
    </section>
  );
}
