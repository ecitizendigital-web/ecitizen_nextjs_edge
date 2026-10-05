import Image from "next/image";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { footerNav, legalNav } from "@/data/navigation";
import { mailtoHref, phoneHref, site, whatsappUrl } from "@/data/site";
import { CurrentYear } from "./CurrentYear";
import styles from "./Footer.module.css";

export function Footer() {
  const { logo } = site.assets;
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" aria-label={`${site.name} home`} className={styles.logoLink}>
              <Image src={logo.src} alt="" width={logo.width} height={logo.height} sizes="200px" className={styles.logo} />
            </Link>
            <p className={styles.statement}>{site.footerStatement}</p>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={styles.title}>Explore</h2>
            <ul className={styles.list}>
              {footerNav.explore.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-learn">
            <h2 id="footer-learn" className={styles.title}>Learn</h2>
            <ul className={styles.list}>
              {footerNav.learn.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.title}>Start</h2>
            <ul className={styles.list}>
              <li><Link href="/contact#free-audit" data-track="free_audit_click">Free audit</Link></li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">
                  Let&apos;s talk on WhatsApp
                </a>
              </li>
              <li><a href={phoneHref} data-track="phone_click">{site.contact.phone.display}</a></li>
              <li><a href={mailtoHref}>{site.contact.email}</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © <CurrentYear /> {site.name}.
          </p>
          <ul className={styles.legal}>
            {legalNav.map((item) => (
              <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
            ))}
            <li><CookieSettingsButton className={styles.cookieButton} /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
