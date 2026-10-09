import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text } from "./text";

describe("Text component", () => {
  it("renders children correctly", () => {
    render(<Text>Hello Alaafia</Text>);
    expect(screen.getByText("Hello Alaafia")).toBeInTheDocument();
  });

  it("renders display variant as an h1 by default", () => {
    render(<Text variant="display">Command Center</Text>);
    const heading = screen.getByRole("heading", { level: 1, name: "Command Center" });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("font-[family-name:var(--font-heading)]");
    expect(heading.className).toContain("text-[32px]");
  });

  it("renders title variant as an h2 by default", () => {
    render(<Text variant="title">Welcome back</Text>);
    const heading = screen.getByRole("heading", { level: 2, name: "Welcome back" });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("font-[family-name:var(--font-heading)]");
    expect(heading.className).toContain("text-[24px]");
  });

  it("renders section variant as an h3 by default", () => {
    render(<Text variant="section">Operational Queues</Text>);
    const heading = screen.getByRole("heading", { level: 3, name: "Operational Queues" });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("font-[family-name:var(--font-heading)]");
    expect(heading.className).toContain("text-[20px]");
  });

  it("allows custom polymorphic element via 'as' prop", () => {
    render(
      <Text as="span" variant="display">
        Span Heading
      </Text>
    );
    const element = screen.getByText("Span Heading");
    expect(element.tagName).toBe("SPAN");
    expect(element.className).toContain("text-[32px]");
  });

  it("applies colors and alignments", () => {
    render(
      <Text variant="body" color="muted" align="center">
        Muted text
      </Text>
    );
    const element = screen.getByText("Muted text");
    expect(element.className).toContain("text-muted-foreground");
    expect(element.className).toContain("text-center");
  });
});
