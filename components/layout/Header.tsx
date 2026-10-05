import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { phoneHref, site } from "@/data/site";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";
import styles from "./Header.module.css";

export function Header() {
  const { logo } = site.assets;
  return (
    <header className={styles.wrap}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logoLink} aria-label={`${site.name} home`}>
          <Image src={logo.src} alt="" width={logo.width} height={logo.height} priority sizes="160px" className={styles.logo} />
        </Link>
        <nav aria-label="Primary" className={styles.nav}>
          <NavLinks items={primaryNav} />
        </nav>
        <div className={styles.actions}>
          <a className={styles.phone} href={phoneHref} data-track="phone_click" aria-label={`Call ${site.name} on ${site.contact.phone.display}`}>
            <span className={styles.dot} aria-hidden="true" />
            <span>{site.contact.phone.display}</span>
          </a>
          <Button href="/contact#free-audit" variant="primary" size="sm" track="free_audit_click" className={styles.cta}>
            Free audit
          </Button>
          <MobileNav items={primaryNav} />
        </div>
      </div>
    </header>
  );
}
