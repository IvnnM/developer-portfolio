import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("Contact page", () => {
  it("presents one labeled primary heading and the placeholder message", () => {
    render(<ContactPage />);

    expect(screen.getByRole("region", { name: "Contact" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Contact information coming soon."),
    ).toBeInTheDocument();
  });

  it("uses the shared responsive content shell", () => {
    const source = readSource("./page.tsx");

    expect(source).toContain("max-w-content");
    expect(source).toContain("px-6");
    expect(source).toContain("break-words");
  });
});
