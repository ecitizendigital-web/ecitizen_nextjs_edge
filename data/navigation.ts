export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  explore: [
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Process", href: "/process" },
  ],
  learn: [
    { label: "Insights", href: "/insights" },
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" },
  ],
} satisfies Record<string, NavItem[]>;

export const legalNav: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookie" },
  { label: "Lead data", href: "/lead-data" },
];
