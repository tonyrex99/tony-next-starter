"use client";

import type { ReactNode } from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative z-10 w-full rounded-2xl border border-default-200 bg-content1 shadow-2xl transition-all",
          sizeClasses,
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
              aria-label="Close dialog"
              onPress={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="px-6 py-5">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-default-200 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
