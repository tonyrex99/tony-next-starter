import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Text, Heading } from "./text";

describe("Text component", () => {
  it("renders children correctly", () => {
    render(<Text>Hello Alaafia</Text>);
    expect(screen.getByText("Hello Alaafia")).toBeInTheDocument();
  });

  it("renders display variant with Inter font by default", () => {
    render(<Text variant="display">Command Center</Text>);
    const heading = screen.getByRole("heading", { level: 1, name: "Command Center" });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("font-inter");
    expect(heading.className).toContain("text-[32px]");
  });

  it("renders title variant as an h2 with Inter font by default", () => {
    render(<Text variant="title">Welcome back</Text>);
    const heading = screen.getByRole("heading", { level: 2, name: "Welcome back" });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("font-inter");
    expect(heading.className).toContain("text-[24px]");
  });

  it("renders section variant as an h3 with Inter font by default", () => {
    render(<Text variant="section">Operational Queues</Text>);
    const heading = screen.getByRole("heading", { level: 3, name: "Operational Queues" });
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain("font-inter");
    expect(heading.className).toContain("text-[20px]");
  });

  it("allows switching font family explicitly via 'font' prop", () => {
    render(
      <Text variant="metric" font="inter">
        2,847
      </Text>
    );
    const element = screen.getByText("2,847");
    expect(element.className).toContain("font-inter");
  });

  it("allows overriding weight explicitly via 'weight' prop", () => {
    render(
      <Text variant="body" weight="bold">
        Bold body
      </Text>
    );
    const element = screen.getByText("Bold body");
    expect(element.className).toContain("font-bold");
  });

  it("renders Heading component using Inter and proper heading level tags", () => {
    render(<Heading level={1}>Dashboard Title</Heading>);
    const h1 = screen.getByRole("heading", { level: 1, name: "Dashboard Title" });
    expect(h1).toBeInTheDocument();
    expect(h1.className).toContain("font-inter");
  });
});
