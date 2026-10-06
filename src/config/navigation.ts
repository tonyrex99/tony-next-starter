export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
}

export const navigationConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "LayoutDashboard",
    },
    {
      title: "Example Feature",
      href: "/example",
      icon: "Boxes",
    },
  ],
  userNav: [
    {
      title: "Profile",
      href: "/settings/profile",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ],
};
