"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Boxes } from "lucide-react";
import { Drawer } from "@/components/ui/drawer";
import { useAppStore } from "@/stores/app.store";
import { navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  LayoutDashboard,
  Boxes,
};

export function MobileNavigation() {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  return (
    <Drawer
      isOpen={sidebarCollapsed}
      onClose={() => setSidebarCollapsed(false)}
      placement="left"
      title="Navigation"
      className="lg:hidden"
    >
      <div className="flex flex-col gap-2">
        {navigationConfig.sidebarNav.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Boxes;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarCollapsed(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-default-600 hover:bg-default-100"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </Drawer>
  );
}
