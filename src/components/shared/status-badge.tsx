import { Chip } from "@heroui/react";

export interface StatusBadgeProps {
  status: "active" | "inactive" | "archived" | string;
  size?: "sm" | "md" | "lg";
}

const statusConfig: Record<
  string,
  { label: string; variant: "primary" | "secondary" | "tertiary" | "soft" }
> = {
  active: { label: "Active", variant: "primary" },
  inactive: { label: "Inactive", variant: "soft" },
  archived: { label: "Archived", variant: "secondary" },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] || {
    label: status,
    variant: "soft",
  };

  return (
    <Chip size={size} variant={config.variant} className="capitalize font-medium">
      {config.label}
    </Chip>
  );
}
