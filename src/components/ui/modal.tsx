"use client";

import type { ReactNode } from "react";
import {
  ModalRoot,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  ModalCloseTrigger,
} from "@heroui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "full" | "cover";
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

  return (
    <ModalRoot isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalBackdrop
        isDismissable
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
      />
      <ModalContainer
        size={size}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center p-4",
          className
        )}
      >
        <ModalDialog className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl transition-all">
          {title && (
            <ModalHeader className="flex items-center justify-between border-b border-border px-6 py-4">
              <ModalHeading className="text-lg font-semibold text-foreground font-heading">
                {title}
              </ModalHeading>
              <ModalCloseTrigger
                onClick={onClose}
                className="rounded-lg p-1 text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </ModalCloseTrigger>
            </ModalHeader>
          )}

          <ModalBody className="px-6 py-5 text-foreground font-sans">
            {children}
          </ModalBody>

          {footer && (
            <ModalFooter className="flex items-center justify-end gap-2 border-t border-border px-6 py-4">
              {footer}
            </ModalFooter>
          )}
        </ModalDialog>
      </ModalContainer>
    </ModalRoot>
  );
}
