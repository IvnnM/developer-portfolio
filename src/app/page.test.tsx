import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

const HEADING = "Building thoughtful digital experiences.";

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("Homepage hero", () => {
  it("presents exactly one primary heading", () => {
    render(<Home />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAccessibleName(HEADING);
  });

  it("identifies the owner as a Full-Stack Developer", () => {
    render(<Home />);

    expect(screen.getByText(/full-stack developer/i)).toBeInTheDocument();
  });

  it("states the supporting value proposition", () => {
    render(<Home />);

    expect(
      screen.getByText(
        "Developing modern web and mobile applications with an emphasis on usability, performance, and maintainability.",
      ),
    ).toBeInTheDocument();
  });

  it("offers Explore Projects as the primary call to action", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: "Explore Projects" }),
    ).toHaveAttribute("href", "/projects");
  });

  it("offers Get in Touch as the secondary call to action", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: "Get in Touch" }),
    ).toHaveAttribute("href", "/contact");
  });

  it("labels the hero section with its visible heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("region", { name: HEADING }),
    ).toBeInTheDocument();
  });

  it("keeps essential content and navigation server-rendered", () => {
    const source = readSource("./page.tsx");

    expect(source).not.toMatch(/^["']use client["'];?$/m);
    expect(source).not.toMatch(/\buse(State|Effect|LayoutEffect|Reducer)\b/);
  });

  it("reveals the hero only when motion is acceptable", () => {
    const source = readSource("./page.tsx");
    const styles = readSource("./globals.css");

    expect(source).toContain("motion-safe:animate-hero-reveal");
    // No unconditional animation: visitors who prefer reduced motion see
    // the hero statically, and unsupported animation leaves it visible.
    expect(source).not.toMatch(/(?<!motion-safe:)animate-hero-reveal/);
    expect(source).not.toMatch(/\bopacity-\d+/);
    expect(styles).toContain("@keyframes hero-reveal");
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
  });

  it("allows hero copy to wrap when text spacing is enlarged", () => {
    const source = readSource("./page.tsx");

    expect(source).toContain("break-words");
  });

  it("uses the control-border token for the secondary call to action", () => {
    const source = readSource("./page.tsx");

    expect(source).toContain("border-control-line");
  });
});
