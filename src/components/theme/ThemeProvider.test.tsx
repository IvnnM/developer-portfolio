import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeProvider, { useTheme } from "./ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import SiteHeader from "@/components/layout/SiteHeader";
import { STORAGE_KEY } from "@/lib/theme";
import {
  removeMatchMedia,
  resetDocumentTheme,
  stubMatchMedia,
} from "@/test/match-media";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  resetDocumentTheme();
  removeMatchMedia();
});

describe("ThemeProvider", () => {
  it("applies the saved light choice even when the system prefers dark", async () => {
    window.localStorage.setItem(STORAGE_KEY, "light");
    stubMatchMedia(true);

    renderToggle();

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "light"),
    );
  });

  it("applies the saved dark choice", async () => {
    window.localStorage.setItem(STORAGE_KEY, "dark");
    stubMatchMedia(false);

    renderToggle();

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "dark"),
    );
  });

  it("applies the system dark preference when no choice is saved", async () => {
    stubMatchMedia(true);

    renderToggle();

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "dark"),
    );
  });

  it("falls back to light when the system preference is unavailable", async () => {
    removeMatchMedia();

    renderToggle();

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "light"),
    );
  });

  it("switches themes manually and persists the choice", async () => {
    const user = userEvent.setup();
    const system = stubMatchMedia(false);

    const { unmount } = renderToggle();

    const toggle = await screen.findByRole("button", {
      name: "Switch to dark theme",
    });
    await user.click(toggle);

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "dark"),
    );
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("dark");
    unmount();

    // A fresh mount restores the persisted choice rather than the OS theme.
    renderToggle();

    const restored = await screen.findByRole("button", {
      name: "Switch to light theme",
    });
    expect(restored).toBeInTheDocument();
    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "dark"),
    );

    // System changes must not override the explicit choice.
    system.dispatchSystemChange(true);
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("presents an accessible control label and state", async () => {
    const user = userEvent.setup();
    stubMatchMedia(false);

    renderToggle();

    const toggle = await screen.findByRole("button", {
      name: "Switch to dark theme",
    });
    await user.click(toggle);

    expect(
      screen.getByRole("button", { name: "Switch to light theme" }),
    ).toBeInTheDocument();
  });

  it("follows system preference changes while no choice is saved", async () => {
    const system = stubMatchMedia(false);

    renderToggle();

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "light"),
    );
    system.dispatchSystemChange(true);

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "dark"),
    );
  });

  it("ignores system preference changes once a choice is saved", async () => {
    window.localStorage.setItem(STORAGE_KEY, "light");
    const system = stubMatchMedia(false);

    renderToggle();

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "light"),
    );
    system.dispatchSystemChange(true);

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("continues to work when browser storage access fails", async () => {
    const user = userEvent.setup();
    stubMatchMedia(false);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    renderToggle();

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "light"),
    );

    await user.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );

    await waitFor(() =>
      expect(document.documentElement).toHaveAttribute("data-theme", "dark"),
    );
  });

  it("exposes theme state and controls through useTheme", async () => {
    stubMatchMedia(false);
    let observedTheme: string | undefined;

    function Probe() {
      const { theme } = useTheme();
      observedTheme = theme;
      return null;
    }

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );

    await waitFor(() => expect(observedTheme).toBe("light"));
  });

  it("keeps mobile navigation behavior intact alongside theme controls", async () => {
    const user = userEvent.setup();
    stubMatchMedia(false);

    render(
      <ThemeProvider>
        <SiteHeader />
      </ThemeProvider>,
    );

    const menuButton = await screen.findByRole("button", {
      name: /open menu/i,
    });
    await user.click(menuButton);

    // Switching themes does not disturb the open menu.
    await user.click(
      screen.getByRole("button", { name: "Switch to dark theme" }),
    );
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toHaveAttribute("aria-expanded", "true");
  });
});
