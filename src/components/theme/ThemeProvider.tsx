"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
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

const SERVER_STATE: ThemeState = { saved: null, theme: "light" };

/**
 * Theme is external state: a persisted choice plus the OS color-scheme
 * media query. `useSyncExternalStore` reads it after hydration without
 * synchronously setting React state inside an effect, and its server
 * snapshot keeps the initial render hydration-safe.
 */
function createThemeStore() {
  let state = SERVER_STATE;
  let initialized = false;
  let media: MediaQueryList | null = null;
  const listeners = new Set<() => void>();

  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const update = (next: ThemeState) => {
    state = next;
    applyTheme(next.theme);
    notify();
  };

  const handleMediaChange = (event: MediaQueryListEvent) => {
    if (state.saved !== null) {
      return;
    }

    update({ saved: null, theme: resolveTheme(null, event.matches) });
  };

  const detachMedia = () => {
    if (!media) {
      return;
    }

    media.removeEventListener("change", handleMediaChange);
    media = null;
  };

  const attachMedia = () => {
    if (media || state.saved !== null) {
      return;
    }

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    if (typeof query?.addEventListener !== "function") {
      return;
    }

    media = query;
    media.addEventListener("change", handleMediaChange);
  };

  const initialize = () => {
    if (initialized || typeof window === "undefined") {
      return;
    }

    initialized = true;
    const saved = readSavedTheme(window.localStorage);
    state = { saved, theme: resolveTheme(saved, getPrefersDarkTheme()) };
    applyTheme(state.theme);
    attachMedia();
  };

  return {
    getSnapshot: () => state,
    getServerSnapshot: () => SERVER_STATE,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      initialize();

      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          detachMedia();
        }
      };
    },
    setTheme: (theme: Theme) => {
      persistTheme(theme);
      detachMedia();
      update({ saved: theme, theme });
    },
    toggleTheme: () => {
      const theme: Theme = state.theme === "dark" ? "light" : "dark";
      persistTheme(theme);
      detachMedia();
      update({ saved: theme, theme });
    },
  };
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createThemeStore);
  const state = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  const setTheme = useCallback(
    (theme: Theme) => store.setTheme(theme),
    [store],
  );

  const toggleTheme = useCallback(() => store.toggleTheme(), [store]);

  const value: ThemeContextValue = {
    theme: state.theme,
    savedTheme: state.saved,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
