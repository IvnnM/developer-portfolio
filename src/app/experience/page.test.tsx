import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExperiencePage from "./page";

const EXPERIENCE_ENTRIES = [
  {
    role: "Full-Stack Developer",
    company: "Rooche Digital IT Solutions",
    period: "March 2026 – Present",
    achievements: [
      "Develop and maintain production web and mobile applications for local and international clients, delivering new features, bug fixes, and ongoing improvements.",
      "Work with REST APIs, webhooks, third-party integrations, and automated background processes to support application functionality.",
      "Develop and maintain a React Native application for iOS and Android, resolving production issues and implementing new features.",
      "Use analytics and AI-assisted development tools to understand user behavior, investigate issues, and support efficient development.",
    ],
  },
  {
    role: "System/Project Coordinator",
    company: "Metro Mobilia Corporation",
    period: "September 2025 – February 2026",
    achievements: [
      "Analyzed existing business processes and translated stakeholder requirements into system workflows, database structures, and application features.",
      "Developed and tested core functionality for a centralized Inventory & Project Tracking System, refining features based on stakeholder feedback.",
      "Deployed the system across multiple branches, improving inventory visibility, project monitoring, and the efficiency of reporting and branch updates.",
    ],
  },
  {
    role: "Front-End Developer Intern",
    company: "Consultare Inc. Group (Remote, USA)",
    period: "February 2025 – May 2025",
    achievements: [
      "Developed four Vue.js/Quasar modules and Bootstrap-based electronic forms to support operational requirements.",
      "Collaborated with developers and stakeholders to implement interface improvements and deliver features within project timelines.",
      "Contributed to quality assurance testing and technical documentation to improve system reliability and user experience.",
    ],
  },
] as const;

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("Experience page", () => {
  it("presents exactly one primary heading", () => {
    render(<ExperiencePage />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAccessibleName("Experience");
  });

  it("presents all positions in reverse chronological order", () => {
    render(<ExperiencePage />);

    const timeline = screen.getByRole("list", {
      name: "Professional experience timeline",
    });

    expect(timeline.tagName).toBe("OL");

    const roleHeadings = within(timeline).getAllByRole("heading", {
      level: 2,
    });

    expect(roleHeadings.map((heading) => heading.textContent)).toEqual(
      EXPERIENCE_ENTRIES.map((entry) => entry.role),
    );
  });

  it("presents the approved content for every position", () => {
    render(<ExperiencePage />);

    const timeline = screen.getByRole("list", {
      name: "Professional experience timeline",
    });

    for (const entry of EXPERIENCE_ENTRIES) {
      const roleHeading = within(timeline).getByRole("heading", {
        level: 2,
        name: entry.role,
      });
      const timelineEntry = roleHeading.closest("li");

      expect(timelineEntry).not.toBeNull();

      if (!timelineEntry) {
        throw new Error(`Missing timeline entry for ${entry.role}`);
      }

      expect(within(timelineEntry).getByText(entry.company)).toBeInTheDocument();
      expect(within(timelineEntry).getByText(entry.period)).toBeInTheDocument();

      for (const achievement of entry.achievements) {
        expect(
          within(timelineEntry).getByText(achievement),
        ).toBeInTheDocument();
      }
    }
  });

  it("uses an accessible timeline and heading structure", () => {
    render(<ExperiencePage />);

    expect(
      screen.getByRole("region", { name: "Experience" }),
    ).toBeInTheDocument();

    const headings = screen.getAllByRole("heading");

    expect(headings.map((heading) => heading.tagName)).toEqual([
      "H1",
      "H2",
      "H2",
      "H2",
    ]);
  });

  it("keeps the page content server-rendered", () => {
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
