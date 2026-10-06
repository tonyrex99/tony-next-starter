import { Spinner } from "@heroui/react";
import { cn } from "@/lib/utils/cn";

export interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({ label = "Loading...", className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 gap-3 text-default-500",
        className
      )}
    >
      <Spinner size="lg" color="accent" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
