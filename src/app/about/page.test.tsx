import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";

const ABOUT_PARAGRAPHS = [
  "I'm a Full-Stack Developer with over a year of experience building and maintaining production web and mobile applications for local and international clients. I work across frontend and backend development, translating business requirements into practical software solutions, integrating APIs and third-party services, and delivering applications across web, iOS, and Android.",
  "My experience spans logistics, e-commerce, and business management systems, with a focus on building reliable applications that solve real operational problems.",
] as const;

const SKILL_CATEGORIES = [
  {
    name: "Frontend",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Vue.js",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap",
      "Quasar",
    ],
  },
  {
    name: "Backend",
    skills: ["PHP", "Laravel", "REST APIs"],
  },
  {
    name: "Mobile",
    skills: ["React Native (iOS and Android)"],
  },
  {
    name: "Databases & Services",
    skills: ["MySQL", "PostgreSQL", "Supabase", "Firebase"],
  },
  {
    name: "Tools & Platforms",
    skills: [
      "Git & GitHub",
      "Docker",
      "Linux",
      "Figma",
      "WordPress",
      "Power BI",
      "PostHog",
      "VMware",
      "AI-assisted development tools",
      "Project management tools",
    ],
  },
] as const;

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("About page", () => {
  it("presents exactly one primary heading", () => {
    render(<AboutPage />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAccessibleName("About");
  });

  it("presents the approved introduction exactly", () => {
    render(<AboutPage />);

    for (const paragraph of ABOUT_PARAGRAPHS) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });

  it("presents the education information", () => {
    render(<AboutPage />);

    const education = screen.getByRole("region", { name: "Education" });

    expect(
      within(education).getByRole("heading", {
        level: 2,
        name: "Education",
      }),
    ).toBeInTheDocument();
    expect(
      within(education).getByRole("heading", {
        level: 3,
        name: "Bachelor of Science in Information Technology",
      }),
    ).toBeInTheDocument();
    expect(
      within(education).getByText("Major in Business Analytics"),
    ).toBeInTheDocument();
    expect(
      within(education).getByText("Batangas State University"),
    ).toBeInTheDocument();
    expect(within(education).getByText("2021–2025")).toBeInTheDocument();
  });

  it("presents all five skill categories and their contents", () => {
    render(<AboutPage />);

    const skills = screen.getByRole("region", { name: "Skills" });

    expect(within(skills).getAllByRole("heading", { level: 3 })).toHaveLength(
      SKILL_CATEGORIES.length,
    );

    for (const category of SKILL_CATEGORIES) {
      expect(
        within(skills).getByRole("heading", {
          level: 3,
          name: category.name,
        }),
      ).toBeInTheDocument();

      const list = within(skills).getByRole("list", {
        name: category.name,
      });

      for (const skill of category.skills) {
        expect(within(list).getByText(skill)).toBeInTheDocument();
      }
    }
  });

  it("does not assign proficiency percentages or ratings to skills", () => {
    render(<AboutPage />);

    const skills = screen.getByRole("region", { name: "Skills" });

    expect(within(skills).queryByRole("progressbar")).not.toBeInTheDocument();
    expect(skills).not.toHaveTextContent(/%/);
    expect(skills).not.toHaveTextContent(
      /\b(?:beginner|intermediate|advanced|expert)\b/i,
    );
  });

  it("uses an accessible section and heading structure", () => {
    render(<AboutPage />);

    expect(screen.getByRole("region", { name: "About" })).toBeInTheDocument();

    const headings = screen.getAllByRole("heading");

    expect(headings.map((heading) => heading.tagName)).toEqual([
      "H1",
      "H2",
      "H3",
      "H2",
      "H3",
      "H3",
      "H3",
      "H3",
      "H3",
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
