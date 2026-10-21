"use client";

import { useRef, useState } from "react";
import Link from "next/link";

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
    <header className="border-b px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
        <Link href="/" aria-label="Personal Developer Portfolio">
          Personal Developer Portfolio
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:block"
        >
          <ul className="flex items-center gap-6">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/resume" className="hidden md:inline-block">
          Résumé
        </Link>

        {/* Mobile toggle */}
        <button
          ref={menuButtonRef}
          type="button"
          className="md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          onKeyDown={handleEscape}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mt-4 md:hidden"
          onKeyDown={handleEscape}
        >
          <ul className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}

            <li>
              <Link href="/resume" onClick={closeMenu}>
                Résumé
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
