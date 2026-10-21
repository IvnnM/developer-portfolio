"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  applyTheme,
  getPrefersDarkTheme,
  persistTheme,
  readSavedTheme,
  resolveTheme,
  type Theme,
} from "@/lib/theme";

type ThemeState = {
  /** Explicit visitor choice, or null while following the system. */
  saved: Theme | null;
  /** Currently active (resolved) theme. */
  theme: Theme;
};

type ThemeContextValue = {
  theme: Theme;
  savedTheme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

/**
 * Default context keeps consumers renderable outside a provider
 * (e.g. unit tests). The layout wraps the app with <ThemeProvider>.
 */
const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  savedTheme: null,
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>({
    saved: null,
    theme: "light",
  });

  // Resolve the initial theme on the client, after hydration, from the
  // same sources the pre-hydration script used. The pre-hydration script
  // already painted the correct theme, so this only syncs state.
  useEffect(() => {
    const saved = readSavedTheme(window.localStorage);
    setState({ saved, theme: resolveTheme(saved, getPrefersDarkTheme()) });
  }, []);

  // Keep the document (and native form controls via color-scheme) in sync.
  useEffect(() => {
    applyTheme(state.theme);
  }, [state.theme]);

  // Follow OS preference changes, but only while no explicit choice exists.
  useEffect(() => {
    if (state.saved !== null) {
      return;
    }

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    if (typeof media?.addEventListener !== "function") {
      return;
    }

    const handleChange = (event: MediaQueryListEvent) => {
      setState((previous) =>
        previous.saved !== null
          ? previous
          : { saved: null, theme: resolveTheme(null, event.matches) },
      );
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [state.saved]);

  const setTheme = useCallback((theme: Theme) => {
    persistTheme(theme);
    setState({ saved: theme, theme });
  }, []);

  const toggleTheme = useCallback(() => {
    setState((previous) => {
      const next: Theme =
        previous.theme === "dark" ? "light" : "dark";
      // Idempotent write; safe even if the updater strands a second run.
      persistTheme(next);
      return { saved: next, theme: next };
    });
  }, []);

  const value: ThemeContextValue = {
    theme: state.theme,
    savedTheme: state.saved,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
