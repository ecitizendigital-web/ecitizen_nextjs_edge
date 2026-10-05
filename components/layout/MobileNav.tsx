"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import type { NavItem } from "@/data/navigation";
import { phoneHref, site, whatsappUrl } from "@/data/site";
import { NavLinks } from "./NavLinks";
import styles from "./MobileNav.module.css";

/**
 * The menu is a native modal <dialog>: the browser handles focus trapping, Escape to close,
 * an inert page behind it and returning focus to the menu button. Page scroll is locked in base.css.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const show = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const hide = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" className={styles.toggle} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu" onClick={show}>
        <Menu size={20} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        className={styles.dialog}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) hide();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.head}>
            <Image src={site.assets.logo.src} alt={site.name} width={site.assets.logo.width} height={site.assets.logo.height} className={styles.logo} sizes="150px" />
            <button type="button" className={styles.close} aria-label="Close menu" onClick={hide}>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile">
            <NavLinks items={items} variant="drawer" onNavigate={hide} />
          </nav>
          <div className={styles.actions}>
            <Button href="/contact#free-audit" variant="primary" size="lg" block track="free_audit_click" onClick={hide}>
              Request a free audit
            </Button>
            <Button href={phoneHref} block track="phone_click">
              Call {site.contact.phone.display}
            </Button>
            <Button href={whatsappUrl()} block track="whatsapp_click">
              <WhatsAppIcon size={18} />
              Let&apos;s talk on WhatsApp
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
