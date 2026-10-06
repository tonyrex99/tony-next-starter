"use client";

import type { ReactNode } from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  placement?: "left" | "right";
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  placement = "right",
  className,
}: DrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          "relative z-10 flex h-full w-full max-w-md flex-col bg-content1 shadow-2xl transition-transform border-default-200",
          placement === "left"
            ? "mr-auto border-r animate-in slide-in-from-left duration-200"
            : "ml-auto border-l animate-in slide-in-from-right duration-200",
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-default-200 px-6 py-4">
            <h3 className="text-lg font-bold text-foreground">{title}</h3>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Close drawer"
              onPress={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
