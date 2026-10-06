import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyDisplay } from "@/components/shared/money-display";
import { EmptyState } from "@/components/ui/empty-state";

describe("Shared and UI Components", () => {
  it("renders StatusBadge with correct label", () => {
    render(<StatusBadge status="active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders MoneyDisplay formatted correctly", () => {
    render(<MoneyDisplay amount={1250.5} currency="USD" />);
    expect(screen.getByText("$1,250.50")).toBeInTheDocument();
  });

  it("renders EmptyState title and description", () => {
    render(<EmptyState title="Custom Empty State" description="Nothing here right now." />);
    expect(screen.getByText("Custom Empty State")).toBeInTheDocument();
    expect(screen.getByText("Nothing here right now.")).toBeInTheDocument();
  });
});
