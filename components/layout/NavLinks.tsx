"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/data/navigation";
import styles from "./NavLinks.module.css";

const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

type Props = { items: NavItem[]; variant?: "bar" | "drawer"; onNavigate?: () => void };

export function NavLinks({ items, variant = "bar", onNavigate }: Props) {
  const pathname = usePathname();
  return (
    <ul className={variant === "bar" ? styles.bar : styles.drawer}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={styles.link}
            aria-current={isActive(pathname, item.href) ? "page" : undefined}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
