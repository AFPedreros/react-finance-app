export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "My Finances Tracker",
  description: "Track your daily finances.",
  navItems: [
    {
      label: "Transactions",
      href: "/transactions",
    },
    {
      label: "Create Expense",
      href: "/create-expense",
    },
    {
      label: "Accounts",
      href: "/accounts",
    },
    {
      label: "Categories",
      href: "/categories",
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
    docs: "https://nextui.org",
  },
};
