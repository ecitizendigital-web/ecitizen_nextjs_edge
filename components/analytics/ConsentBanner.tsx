"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { closeCookieSettings, getConsent, getSettingsOpen, setConsent, subscribeConsent, type ConsentStatus } from "@/lib/consent";
import { trackingConfigured } from "@/lib/tracking";
import styles from "./ConsentBanner.module.css";

/** Publishes the banner height as --consent-offset so floating buttons can sit above it. */
function Frame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const update = () => root.style.setProperty("--consent-offset", `${Math.ceil(el.getBoundingClientRect().height) + 12}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-offset");
    };
  }, []);

  return (
    <aside ref={ref} className={styles.banner} role="region" aria-label="Cookie and measurement preferences">
      {children}
    </aside>
  );
}

export function ConsentBanner() {
  const consent = useSyncExternalStore<ConsentStatus | "unknown">(subscribeConsent, getConsent, () => "unknown");
  const settingsOpen = useSyncExternalStore(subscribeConsent, getSettingsOpen, () => false);
  const [notice, setNotice] = useState("");
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (value: "granted" | "declined") => {
    setConsent(value);
    setNotice(value === "granted" ? "Thanks. Measurement is on." : "Saved. Optional measurement stays off.");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setNotice(""), 4000);
  };

  if (notice) {
    return (
      <Frame>
        <p role="status" className={styles.text}>{notice}</p>
      </Frame>
    );
  }

  if (settingsOpen && !trackingConfigured) {
    return (
      <Frame>
        <p className={styles.text}>No optional tracking is active on this site.</p>
        <div className={styles.actions}>
          <Button size="sm" onClick={closeCookieSettings}>Close</Button>
        </div>
      </Frame>
    );
  }

  if (!trackingConfigured || (consent !== "unset" && !settingsOpen)) return null;

  return (
    <Frame>
      <div className={styles.copy}>
        <strong className={styles.title}>Privacy and measurement</strong>
        <p className={styles.text}>
          Optional analytics and advertising measurement help us improve the site. They load only if you accept.{" "}
          <Link href="/cookie">Details</Link>
          {consent !== "unset" ? ` Your current choice: measurement is ${consent === "granted" ? "on" : "off"}.` : null}
        </p>
      </div>
      <div className={styles.actions}>
        <Button size="sm" onClick={() => choose("declined")}>Continue without</Button>
        <Button size="sm" variant="primary" onClick={() => choose("granted")}>Accept measurement</Button>
      </div>
    </Frame>
  );
}
