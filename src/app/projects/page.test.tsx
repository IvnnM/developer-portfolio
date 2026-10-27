import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "./page";

const FEATURED_PROJECT = {
  title: "Inventory & Project Tracking System",
  organization: "Metro Mobilia Corporation",
  summary:
    "A centralized web application that brings branch inventory records, stock movements, project tracking, and delivery confirmation into one shared platform.",
  technologies: [
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "jQuery",
    "AJAX",
  ],
  href: "/projects/inventory-project-tracking",
} as const;

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("Projects gallery", () => {
  it("features exactly one real project", () => {
    render(<ProjectsPage />);

    const projectCards = screen.getAllByRole("article");

    expect(projectCards).toHaveLength(1);
    expect(
      within(projectCards[0]).getByRole("heading", {
        level: 2,
        name: FEATURED_PROJECT.title,
      }),
    ).toBeInTheDocument();
  });

  it("presents the featured project's organization and concise summary", () => {
    render(<ProjectsPage />);

    const projectCard = screen.getByRole("article", {
      name: FEATURED_PROJECT.title,
    });

    expect(
      within(projectCard).getByText(FEATURED_PROJECT.organization),
    ).toBeInTheDocument();
    expect(
      within(projectCard).getByText(FEATURED_PROJECT.summary),
    ).toBeInTheDocument();
  });

  it("lists the approved primary technologies", () => {
    render(<ProjectsPage />);

    const projectCard = screen.getByRole("article", {
      name: FEATURED_PROJECT.title,
    });
    const technologyList = within(projectCard).getByRole("list", {
      name: /technologies/i,
    });

    expect(
      within(technologyList)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(FEATURED_PROJECT.technologies);
  });

  it("links to the detailed internal case study", () => {
    render(<ProjectsPage />);

    const caseStudyLink = screen.getByRole("link", {
      name: `Read the case study for ${FEATURED_PROJECT.title}`,
    });

    expect(caseStudyLink).toHaveAttribute("href", FEATURED_PROJECT.href);
    expect(caseStudyLink.getAttribute("href")).not.toMatch(/^https?:/);
  });

  it("does not invent additional projects, demos, or external destinations", () => {
    render(<ProjectsPage />);

    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(
      screen.queryByRole("link", { name: /github/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /live demo/i }),
    ).not.toBeInTheDocument();

    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("href", FEATURED_PROJECT.href);
    }
  });

  it("uses an accessible section and heading structure", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("region", { name: "Projects" })).toBeInTheDocument();

    const headings = screen.getAllByRole("heading");

    expect(headings.map((heading) => heading.tagName)).toEqual([
      "H1",
      "H2",
      "H3",
    ]);
  });

  it("keeps the gallery content server-rendered", () => {
    const source = readSource("./page.tsx");

    expect(source).not.toMatch(/^["']use client["'];?$/m);
    expect(source).not.toMatch(/\buse(State|Effect|LayoutEffect|Reducer)\b/);
  });

  it("uses the shared responsive content shell", () => {
    const source = readSource("./page.tsx");

    expect(source).toContain("max-w-content");
    expect(source).toContain("px-6");
    expect(source).toContain("break-words");
  });
});
