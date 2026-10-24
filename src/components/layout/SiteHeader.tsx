"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleEscape(event: React.KeyboardEvent) {
    if (event.key === "Escape" && isMenuOpen) {
      closeMenu();
      menuButtonRef.current?.focus();
    }
  }

  return (
    <header className="border-b border-line px-6 py-4">
      <div className="mx-auto flex max-w-content items-center justify-between gap-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-foreground underline-offset-4 hover:underline"
          aria-label="Personal Developer Portfolio"
        >
          Personal Developer Portfolio
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:block"
        >
          <ul className="flex items-center gap-6 text-sm">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/resume"
            className="hidden text-sm text-muted underline-offset-4 hover:text-foreground hover:underline lg:inline-block"
          >
            Résumé
          </Link>

          {/* Theme control */}
          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            className="rounded-md border border-line px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-surface lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            onKeyDown={handleEscape}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mt-4 rounded-lg border border-line p-4 lg:hidden"
          onKeyDown={handleEscape}
        >
          <ul className="flex flex-col gap-4 text-sm">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="text-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="/resume"
                onClick={closeMenu}
                className="text-muted underline-offset-4 hover:text-foreground hover:underline"
              >
                Résumé
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
