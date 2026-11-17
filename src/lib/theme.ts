export type Theme = "light" | "dark";

/** Key under which the visitor's explicit theme choice is persisted. */
export const STORAGE_KEY = "theme-preference";

/**
 * Resolve the active theme.
 *
 * Order of precedence:
 * 1. An explicitly saved choice ("light" or "dark").
 * 2. The system preference, when it is known.
 * 3. Light, as the final fallback (also covers `prefersDark === null`,
 *    i.e. matchMedia unavailable or access blocked).
 */
export function resolveTheme(
  savedTheme: unknown,
  prefersDark: boolean | null,
): Theme {
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  if (prefersDark === true) {
    return "dark";
  }

  return "light";
}

/**
 * Read the persisted theme preference. Returns null when nothing valid is
 * stored or when storage access fails (private mode, disabled storage…).
 */
export function readSavedTheme(
  storage: Pick<Storage, "getItem"> | null | undefined,
): Theme | null {
  if (!storage) {
    return null;
  }

  try {
    const value = storage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/** Persist the visitor's explicit choice. Storage failures are ignored. */
export function persistTheme(theme: Theme, storage?: Pick<Storage, "setItem">) {
  try {
    (storage ?? window.localStorage).setItem(STORAGE_KEY, theme);
  } catch {
    // Storage may be unavailable (private browsing, quota, disabled API).
    // The in-memory choice still applies for this visit.
  }
}

/** Read the system color-scheme preference, or null when unavailable. */
export function getPrefersDarkTheme(): boolean | null {
  try {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return null;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return null;
  }
}

/** Reflect the resolved theme on the document root. */
export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

/**
 * Source for the tiny inline script that runs before hydration so the
 * initial paint already has the correct theme (no incorrect-theme flash).
 *
 * It mirrors `resolveTheme` semantics: saved choice first, then system
 * preference, then light. Kept in one place so layout stays declarative.
 */
export function createThemeInitScript(): string {
  return `(function(){try{var stored=localStorage.getItem("${STORAGE_KEY}");var system=null;try{system=window.matchMedia("(prefers-color-scheme: dark)").matches===true}catch(e){}var theme=stored==="dark"||(stored!=="light"&&system===true)?"dark":"light";var root=document.documentElement;root.dataset.theme=theme;root.style.colorScheme=theme}catch(e){}})();`;
}
