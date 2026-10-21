import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

/**
 * Guard: structural colors must come from theme tokens so that the
 * light/dark theme system stays visible. Fixed Tailwind palette classes
 * (zinc/black/white/gray/…) and media-query `dark:` variants respond to
 * the OS setting instead of `data-theme`, which masks the manual theme
 * toggle — the regression this suite is named for.
 */
describe("theme token consumption (source regression guard)", () => {
  const HARDCODED_PALETTE =
    /(?:bg|text|border)-(?:black|white|zinc-|neutral-|gray-|stone-)\S*/;

  // `dark:invert` is allowed on placeholder logos (OS-driven, decorative).
  const MEDIA_DRIVEN_COLOR_VARIANT = /dark:(?:bg|text|border)-\S*/;

  it("starter homepage consumes only theme-aware structural colors", () => {
    const source = readSource("../app/page.tsx");

    expect(source).toMatch(TOKEN_CONSUMPTION);
    expect(source).not.toMatch(MEDIA_DRIVEN_COLOR_VARIANT);
    expect(source).not.toMatch(HARDCODED_PALETTE);
  });

  it("root layout shell consumes theme-aware colors", () => {
    const source = readSource("../app/layout.tsx");

    expect(source).toContain("bg-background");
    expect(source).toContain("text-foreground");
  });

  it("shared layout components consume only theme-aware colors", () => {
    for (const component of [
      "../components/layout/SiteHeader.tsx",
      "../components/layout/SiteFooter.tsx",
      "../components/theme/ThemeToggle.tsx",
    ]) {
      const source = readSource(component);

      expect(
        source,
        `${component} must not hardcode fixed Tailwind palette colors`,
      ).not.toMatch(HARDCODED_PALETTE);
      expect(
        source,
        `${component} must not use media-driven dark: color variants`,
      ).not.toMatch(MEDIA_DRIVEN_COLOR_VARIANT);
    }
  });
});

/** The homepage must contain token-driven structural surface/text colors. */
const TOKEN_CONSUMPTION = /bg-surface[\s"]|text-foreground/;
