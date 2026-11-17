"use client";

import { useTheme } from "./ThemeProvider";

/**
 * Accessible theme toggle.
 *
 * The accessible name always describes the action ("Switch to dark theme"),
 * while the visible text shows the target theme. State is exposed through
 * the dynamic accessible name, so no aria-pressed is needed.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      data-js-only="theme-toggle"
      className="rounded-md border border-control-line px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-surface hover:shadow-sm hover:shadow-[#0000000E] active:scale-[0.97] active:shadow-none"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={toggleTheme}
    >
      <span aria-hidden="true">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}
