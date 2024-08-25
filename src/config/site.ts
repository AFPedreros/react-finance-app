import {
  AccountsIcon,
  CategoriesIcon,
  ReportsIcon,
  TransactionsIcon,
} from "@/components/icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Money Tracker",
  description: "Track your daily finances.",
  navItems: [
    {
      label: "Accounts",
      href: "/accounts",
      icon: AccountsIcon,
    },
    {
      label: "Categories",
      href: "/categories",
      icon: CategoriesIcon,
    },
    {
      label: "Reports",
      href: "/reports",
      icon: ReportsIcon,
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: TransactionsIcon,
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/afpedreros",
    twitter: "https://twitter.com/AFelipePedreros",
  },
};
