import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  STORAGE_KEY,
  applyTheme,
  createThemeInitScript,
  getPrefersDarkTheme,
  readSavedTheme,
  resolveTheme,
  type Theme,
} from "@/lib/theme";
import {
  removeMatchMedia,
  resetDocumentTheme,
  stubMatchMedia,
} from "@/test/match-media";

beforeEach(() => {
  window.localStorage.clear();
  resetDocumentTheme();
  removeMatchMedia();
});

describe("resolveTheme", () => {
  it("prefers the saved dark choice over system light", () => {
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("prefers the saved light choice over system dark", () => {
    expect(resolveTheme("light", true)).toBe("light");
  });

  it("follows the system dark preference when no choice is saved", () => {
    expect(resolveTheme(null, true)).toBe("dark");
  });

  it("follows the system light preference when no choice is saved", () => {
    expect(resolveTheme(null, false)).toBe("light");
  });

  it("falls back to light when the system preference is unknown", () => {
    expect(resolveTheme(null, null)).toBe("light");
  });

  it("treats unrecognized saved values as no choice", () => {
    expect(resolveTheme("sepia", true)).toBe("dark");
  });
});

describe("readSavedTheme", () => {
  it("returns a stored valid preference", () => {
    const storage = { getItem: vi.fn(() => "dark") };
    expect(readSavedTheme(storage as unknown as Storage)).toBe("dark");
  });

  it("returns null for empty storage", () => {
    const storage = { getItem: vi.fn(() => null) };
    expect(readSavedTheme(storage as unknown as Storage)).toBeNull();
  });

  it("returns null for unrecognized values", () => {
    const storage = { getItem: vi.fn(() => "neon") };
    expect(readSavedTheme(storage as unknown as Storage)).toBeNull();
  });

  it("returns null instead of throwing when storage access fails", () => {
    const storage = {
      getItem: vi.fn(() => {
        throw new Error("storage blocked");
      }),
    };
    expect(readSavedTheme(storage as unknown as Storage)).toBeNull();
  });

  it("returns null when no storage is available", () => {
    expect(readSavedTheme(null)).toBeNull();
  });
});

describe("getPrefersDarkTheme", () => {
  it("reports true when the system prefers dark", () => {
    stubMatchMedia(true);
    expect(getPrefersDarkTheme()).toBe(true);
  });

  it("reports false when the system prefers light", () => {
    stubMatchMedia(false);
    expect(getPrefersDarkTheme()).toBe(false);
  });

  it("returns null when matchMedia is unavailable", () => {
    removeMatchMedia();
    expect(getPrefersDarkTheme()).toBeNull();
  });
});

describe("applyTheme", () => {
  it("marks the document with the resolved theme", () => {
    const theme: Theme = "dark";

    applyTheme(theme);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
  });
});

describe("createThemeInitScript", () => {
  it("stores the key used for persistence", () => {
    expect(createThemeInitScript()).toContain(STORAGE_KEY);
  });

  it("applies the saved dark choice before hydration", () => {
    window.localStorage.setItem(STORAGE_KEY, "dark");
    stubMatchMedia(false);

    (0, eval)(createThemeInitScript());

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("applies the system dark preference before hydration", () => {
    window.localStorage.clear();
    stubMatchMedia(true);

    (0, eval)(createThemeInitScript());

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("applies light before hydration when nothing is saved and the system prefers light", () => {
    window.localStorage.clear();
    stubMatchMedia(false);

    (0, eval)(createThemeInitScript());

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });
});
