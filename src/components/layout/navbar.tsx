"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, Layers } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/shared/user-avatar";
import { useAppStore } from "@/stores/app.store";
import { mockUserSession } from "@/lib/auth/session";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-default-200 bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Toggle sidebar"
          className="lg:hidden"
          onPress={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-md">
            <Layers className="h-5 w-5" />
          </div>
          <span className="font-bold text-inherit text-lg tracking-tight hidden sm:inline-block">
            Tony Next Starter
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Toggle theme"
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <div className="flex items-center gap-2 pl-2 border-l border-default-200">
          <UserAvatar
            src={mockUserSession.avatarUrl}
            name={mockUserSession.name}
            email={mockUserSession.email}
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground leading-tight">
              {mockUserSession.name}
            </span>
            <span className="text-[10px] text-default-400 capitalize">{mockUserSession.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
