import { describe, expect, it } from "vitest";
import { itemFormSchema } from "./example.schema";

describe("itemFormSchema", () => {
  it("validates valid input correctly", () => {
    const validData = {
      name: "Widget Pro",
      category: "Hardware",
      amount: 49.99,
      status: "active",
      description: "High quality widget",
    };

    const result = itemFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails when name is too short", () => {
    const invalidData = {
      name: "A",
      category: "Hardware",
      amount: 10,
      status: "active",
    };

    const result = itemFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it("fails when status is invalid", () => {
    const invalidData = {
      name: "Widget",
      category: "Hardware",
      amount: 10,
      status: "unknown_status",
    };

    const result = itemFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
