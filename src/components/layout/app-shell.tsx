import type { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { MobileNavigation } from "./mobile-navigation";

export interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <MobileNavigation />
        <main className="flex-1 flex flex-col overflow-y-auto min-w-0">{children}</main>
      </div>
    </div>
  );
}
