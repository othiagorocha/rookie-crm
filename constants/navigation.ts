export type NavItem = {
  label: string;
  href: string;
  icon: string;
};

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "layout-dashboard" },
  { label: "Companies", href: "/companies", icon: "building-2" },
  { label: "Contacts", href: "/contacts", icon: "users" },
  { label: "Deals", href: "/deals", icon: "pipeline" },
  { label: "Activities", href: "/activities", icon: "calendar-check" },
  { label: "Products", href: "/products", icon: "package" },
  { label: "Proposals", href: "/proposals", icon: "file-text" },
  { label: "Automations", href: "/automations", icon: "workflow" },
  { label: "Reports", href: "/reports", icon: "bar-chart-3" },
  { label: "Settings", href: "/settings", icon: "settings" },
];