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

  it("springs the hero into view on the client", () => {
    // The homepage is a Client Component so the hero can animate with a
    // spring (no CSS keyframe). Server-rendering still produces the same
    // visible content; the animation is layered on after hydration.
    expect(readSource("./page.tsx")).toContain("animateSpring");
    expect(readSource("./page.tsx")).toContain("useEffect");
    expect(readSource("./page.tsx")).toContain('"use client"');
    // Spring from translateY(15px) to 0, response 0.6s (slow brand hero).
    expect(readSource("./page.tsx")).toContain("animateSpring(el");
    expect(readSource("./page.tsx")).toContain("15, 0, { response: 0.6");
  });

  it("respects visitors who prefer reduced motion", () => {
    expect(readSource("./page.tsx")).toMatch(
      /prefers-reduced-motion/g,
    );
    // Under reduced motion the hero rests at translateY(0) with no animation curve.
    expect(readSource("./page.tsx")).toContain("translateY(0)");
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
