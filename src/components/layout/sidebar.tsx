"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Boxes, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import { useAppStore } from "@/stores/app.store";
import { navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils/cn";

const iconMap = {
  LayoutDashboard,
  Boxes,
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col border-r border-default-200 bg-content1/50 transition-all duration-300 min-h-[calc(100vh-4rem)] p-4 relative",
        sidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col gap-1.5 flex-1">
        {navigationConfig.sidebarNav.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Boxes;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-default-600 hover:bg-default-100 hover:text-foreground",
                sidebarCollapsed && "justify-center px-0"
              )}
              title={sidebarCollapsed ? item.title : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </div>

      <div className="pt-4 border-t border-default-200 flex justify-end">
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onPress={toggleSidebar}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
