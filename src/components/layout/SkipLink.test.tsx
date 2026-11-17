import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkipLink from "./SkipLink";

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("SkipLink", () => {
  it("links to the main-content landmark", () => {
    render(<SkipLink />);

    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("is mounted before the header and targets a focusable main landmark", () => {
    const layout = readSource("../../app/layout.tsx");
    const skipLinkPosition = layout.indexOf("<SkipLink />");
    const headerPosition = layout.indexOf("<SiteHeader />");

    expect(skipLinkPosition).toBeGreaterThanOrEqual(0);
    expect(skipLinkPosition).toBeLessThan(headerPosition);
    expect(layout).toContain('id="main-content"');
    expect(layout).toContain("tabIndex={-1}");
  });
});
