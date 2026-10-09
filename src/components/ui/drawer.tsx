"use client";

import type { ReactNode } from "react";
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerDialog,
  DrawerHeader,
  DrawerHeading,
  DrawerBody,
  DrawerCloseTrigger,
} from "@heroui/react";
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
    <DrawerRoot isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerBackdrop
        isDismissable
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
      />
      <DrawerContent
        placement={placement}
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-2xl transition-transform border-border",
          placement === "left" ? "left-0 border-r" : "right-0 border-l",
          className
        )}
      >
        <DrawerDialog className="flex h-full w-full flex-col">
          {title && (
            <DrawerHeader className="flex items-center justify-between border-b border-border px-6 py-4">
              <DrawerHeading className="text-lg font-semibold text-foreground font-heading">
                {title}
              </DrawerHeading>
              <DrawerCloseTrigger
                onClick={onClose}
                className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                aria-label="Close drawer"
              >
                <X className="h-4 w-4" />
              </DrawerCloseTrigger>
            </DrawerHeader>
          )}

          <DrawerBody className="flex-1 overflow-y-auto px-6 py-5 text-foreground font-sans">
            {children}
          </DrawerBody>
        </DrawerDialog>
      </DrawerContent>
    </DrawerRoot>
  );
}
