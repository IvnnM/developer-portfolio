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

function cssBlock(source: string, selector: string): string {
  const start = source.indexOf(`${selector} {`);

  if (start === -1) {
    return "";
  }

  const end = source.indexOf("}", start);

  return source.slice(start, end + 1);
}

function tokenValue(block: string, token: string): string | undefined {
  return block.match(
    new RegExp(`${token}:\\s*(#[0-9a-fA-F]{6})`),
  )?.[1];
}

function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => {
    const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;

    return value <= 0.04045
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string): number {
  const lighter = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const darker = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );

  return (lighter + 0.05) / (darker + 0.05);
}

describe("interactive control contrast (source regression guard)", () => {
  const styles = readSource("../app/globals.css");

  it("keeps control borders at >= 3:1 against page and surface backgrounds", () => {
    const themeBlocks = [
      ["light", cssBlock(styles, ":root")],
      ["dark", cssBlock(styles, '[data-theme="dark"]')],
      [
        "no-JS dark",
        cssBlock(
          styles,
          ':root:not([data-theme="light"]):not([data-theme="dark"])',
        ),
      ],
    ] as const;

    for (const [theme, block] of themeBlocks) {
      const border = tokenValue(block, "--control-line");
      const background = tokenValue(block, "--background");
      const surface = tokenValue(block, "--surface");

      expect(border, `${theme} must define --control-line`).toBeDefined();
      expect(background, `${theme} must define --background`).toBeDefined();
      expect(surface, `${theme} must define --surface`).toBeDefined();

      if (!border || !background || !surface) {
        throw new Error(`Missing contrast tokens in ${theme} theme`);
      }

      expect(
        contrastRatio(border, background),
        `${theme} control border versus background`,
      ).toBeGreaterThanOrEqual(3);
      expect(
        contrastRatio(border, surface),
        `${theme} control border versus surface`,
      ).toBeGreaterThanOrEqual(3);
    }
  });

  it("uses the control token only for interactive boundaries", () => {
    const header = readSource("../components/layout/SiteHeader.tsx");
    const themeToggle = readSource("../components/theme/ThemeToggle.tsx");
    const page = readSource("../app/page.tsx");

    expect(header).toContain("border-control-line");
    expect(themeToggle).toContain("border-control-line");
    expect(page).toContain("border-control-line");

    // Decorative separators keep the quieter line token.
    expect(styles).toContain("--line:");
    expect(styles).toContain("--control-line:");
  });
});
