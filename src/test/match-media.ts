import { afterEach, vi } from "vitest";

type ChangeListener = (event: MediaQueryListEvent) => void;

let listeners = new Set<ChangeListener>();
let matches = false;

/**
 * Replace `window.matchMedia` (jsdom does not provide one) with a
 * configurable stub. The returned `dispatchSystemChange` simulates the OS
 * theme changing by notifying registered "change" listeners.
 */
export function stubMatchMedia(initialMatches: boolean) {
  matches = initialMatches;
  listeners = new Set();

  // jsdom exposes matchMedia as a read-only prototype getter, so we shadow
  // it with a configurable own property.
  Object.defineProperty(window, "matchMedia", {
    value: ((query: string) => ({
      get matches() {
        return matches;
      },
      media: query,
      addEventListener(type: string, listener: ChangeListener) {
        if (type === "change") {
          listeners.add(listener);
        }
      },
      removeEventListener(type: string, listener: ChangeListener) {
        if (type === "change") {
          listeners.delete(listener);
        }
      },
    })) as unknown as typeof window.matchMedia,
    configurable: true,
    writable: true,
  });

  return {
    dispatchSystemChange(next: boolean) {
      matches = next;
      listeners.forEach((listener) =>
        listener({
          matches: next,
          media: "(prefers-color-scheme: dark)",
        } as MediaQueryListEvent),
      );
    },
  };
}

/** Make the system preference unavailable again (jsdom default). */
export function removeMatchMedia() {
  Object.defineProperty(window, "matchMedia", {
    value: undefined,
    configurable: true,
  });
}

/** Clear the theme markers the theme system leaves on the document. */
export function resetDocumentTheme() {
  delete document.documentElement.dataset.theme;
  document.documentElement.style.colorScheme = "";
}

const ORIGINAL_MATCH_MEDIA = Object.getOwnPropertyDescriptor(
  window,
  "matchMedia",
);

afterEach(() => {
  vi.restoreAllMocks();
  resetDocumentTheme();
  window.localStorage.clear();
  if (ORIGINAL_MATCH_MEDIA) {
    Object.defineProperty(window, "matchMedia", ORIGINAL_MATCH_MEDIA);
  } else {
    removeMatchMedia();
  }
});
