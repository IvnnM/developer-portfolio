import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SiteHeader from "./SiteHeader";

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("SiteHeader", () => {
  it("renders the site header", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("keeps the mobile-navigation target mounted while closed", () => {
    const { container } = render(<SiteHeader />);

    const menuButton = screen.getByRole("button", {
      name: /open menu/i,
    });
    const targetId = menuButton.getAttribute("aria-controls");

    expect(targetId).toBe("mobile-navigation");
    expect(container.querySelector(`#${targetId}`)).toBeInTheDocument();
    expect(container.querySelector(`#${targetId}`)).toHaveAttribute("hidden");
  });

  it("includes server-rendered navigation for no-JavaScript visitors", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const noscript = html.match(/<noscript>[\s\S]*?<\/noscript>/)?.[0] ?? "";

    expect(noscript).toContain('aria-label="Primary navigation"');
    expect(noscript).toContain('href="/about"');
    expect(noscript).toContain('href="/resume"');
  });

  it("lets the header and actions wrap at narrow widths", () => {
    const source = readSource("./SiteHeader.tsx");

    expect(source).toContain("flex-wrap");
    expect(source).toContain("ml-auto");
    expect(source).toContain("break-words");
  });

  it("renders the five primary navigation links", () => {
    render(<SiteHeader />);

    const navigation = screen.getByRole("navigation", {
      name: /primary/i,
    });

    const expectedLinks = [
      ["Home", "/"],
      ["About", "/about"],
      ["Experience", "/experience"],
      ["Projects", "/projects"],
      ["Contact", "/contact"],
    ];

    expectedLinks.forEach(([name, href]) => {
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "href",
        href,
      );
    });

    expect(navigation).toBeInTheDocument();
  });

  it("provides separate résumé access", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: /résumé/i })).toHaveAttribute(
      "href",
      "/resume",
    );
  });

  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    // The menu should initially be closed.
    const menuButton = screen.getByRole("button", {
      name: /open menu/i,
    });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    // Open the menu.
    await user.click(menuButton);

    expect(
      screen.getByRole("button", { name: /close menu/i })
    ).toHaveAttribute("aria-expanded", "true");

    // Close the menu.
    await user.click(
      screen.getByRole("button", { name: /close menu/i })
    );

    expect(
      screen.getByRole("button", { name: /open menu/i })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu after selecting a destination", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    await user.click(
      screen.getByRole("button", { name: /open menu/i })
    );

    const mobileNavigation = screen.getByRole("navigation", {
      name: /mobile navigation/i,
    });

    await user.click(
      within(mobileNavigation).getByRole("link", {
        name: "About",
      })
    );

    expect(
      screen.queryByRole("navigation", {
        name: /mobile navigation/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /open menu/i })
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("supports keyboard activation", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    const menuButton = screen.getByRole("button", {
      name: /open menu/i,
    });

    menuButton.focus();

    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", { name: /close menu/i })
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the menu with Escape and restores focus", async () => {
    const user = userEvent.setup();

    render(<SiteHeader />);

    const menuButton = screen.getByRole("button", {
      name: /open menu/i,
    });

    await user.click(menuButton);

    await user.keyboard("{Escape}");

    expect(
      screen.getByRole("button", { name: /open menu/i })
    ).toHaveFocus();

    expect(
      screen.queryByRole("navigation", {
        name: /mobile navigation/i,
      })
    ).not.toBeInTheDocument();
  });

  it("includes an accessible theme toggle control", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("button", { name: /switch to \w+ theme/i })
    ).toBeInTheDocument();
  });
});
