import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResumePage from "./page";

const PROFILE = {
  name: "Ivan Medrano",
  title: "Full-Stack Developer",
} as const;

const SUMMARY = [
  "I'm a Full-Stack Developer with over a year of experience building and maintaining production web and mobile applications for local and international clients. I work across frontend and backend development, translating business requirements into practical software solutions, integrating APIs and third-party services, and delivering applications across web, iOS, and Android.",
  "My experience spans logistics, e-commerce, and business management systems, with a focus on building reliable applications that solve real operational problems.",
] as const;

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

const EDUCATION = {
  degree: "Bachelor of Science in Information Technology",
  major: "Major in Business Analytics",
  institution: "Batangas State University",
  period: "2021–2025",
} as const;

const RESUME_PDF_PATH = "/Ivan_Medrano_CV_Public.pdf";
const RESUME_PDF_FILENAME = "Ivan_Medrano_CV_Public.pdf";

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

function readBinary(relativePath: string): Buffer {
  return readFileSync(new URL(relativePath, import.meta.url));
}

describe("Résumé page", () => {
  it("presents one primary heading with the name and professional title", () => {
    render(<ResumePage />);

    expect(screen.getByRole("region", { name: "Résumé" })).toBeInTheDocument();

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAccessibleName(PROFILE.name);

    const header = headings[0].closest("header");

    expect(header).not.toBeNull();

    if (!header) {
      throw new Error("Missing résumé page header");
    }

    expect(within(header).getByText(PROFILE.title)).toBeInTheDocument();
  });

  it("presents the approved professional summary", () => {
    render(<ResumePage />);

    const summary = screen.getByRole("region", {
      name: "Professional Summary",
    });

    expect(
      within(summary).getByRole("heading", {
        level: 2,
        name: "Professional Summary",
      }),
    ).toBeInTheDocument();

    for (const paragraph of SUMMARY) {
      expect(within(summary).getByText(paragraph)).toBeInTheDocument();
    }
  });

  it("presents all three professional experience entries in order", () => {
    render(<ResumePage />);

    const experience = screen.getByRole("region", {
      name: "Professional Experience",
    });

    expect(
      within(experience).getByRole("heading", {
        level: 2,
        name: "Professional Experience",
      }),
    ).toBeInTheDocument();

    const roleHeadings = within(experience).getAllByRole("heading", {
      level: 3,
    });

    expect(roleHeadings.map((heading) => heading.textContent)).toEqual(
      EXPERIENCE_ENTRIES.map((entry) => entry.role),
    );

    for (const entry of EXPERIENCE_ENTRIES) {
      const roleHeading = within(experience).getByRole("heading", {
        level: 3,
        name: entry.role,
      });
      const entryContainer = roleHeading.closest("li");

      expect(entryContainer).not.toBeNull();

      if (!entryContainer) {
        throw new Error(`Missing experience entry for ${entry.role}`);
      }

      expect(
        within(entryContainer).getByText(entry.company),
      ).toBeInTheDocument();
      expect(within(entryContainer).getByText(entry.period)).toBeInTheDocument();

      for (const achievement of entry.achievements) {
        expect(
          within(entryContainer).getByText(achievement),
        ).toBeInTheDocument();
      }
    }
  });

  it("presents the education information", () => {
    render(<ResumePage />);

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
        name: EDUCATION.degree,
      }),
    ).toBeInTheDocument();
    expect(within(education).getByText(EDUCATION.major)).toBeInTheDocument();
    expect(
      within(education).getByText(EDUCATION.institution),
    ).toBeInTheDocument();
    expect(within(education).getByText(EDUCATION.period)).toBeInTheDocument();
  });

  it("presents all technical skill categories and their contents", () => {
    render(<ResumePage />);

    const skills = screen.getByRole("region", { name: "Technical Skills" });

    expect(
      within(skills).getByRole("heading", {
        level: 2,
        name: "Technical Skills",
      }),
    ).toBeInTheDocument();
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
    render(<ResumePage />);

    const skills = screen.getByRole("region", { name: "Technical Skills" });

    expect(within(skills).queryByRole("progressbar")).not.toBeInTheDocument();
    expect(skills).not.toHaveTextContent(/%/);
    expect(skills).not.toHaveTextContent(
      /\b(?:beginner|intermediate|advanced|expert)\b/i,
    );
  });

  it("provides a prominent download link for the approved public PDF", () => {
    render(<ResumePage />);

    const link = screen.getByRole("link", { name: /download résumé/i });

    expect(link).toHaveAttribute("href", RESUME_PDF_PATH);
    expect(link).toHaveAttribute("download", RESUME_PDF_FILENAME);
    expect(link).toHaveAttribute("type", "application/pdf");
  });

  it("uses an accessible section and heading structure", () => {
    render(<ResumePage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    const headings = screen.getAllByRole("heading");

    expect(headings.map((heading) => heading.tagName)).toEqual([
      "H1",
      "H2",
      "H2",
      "H3",
      "H3",
      "H3",
      "H2",
      "H3",
      "H3",
      "H3",
      "H3",
      "H3",
      "H2",
      "H3",
    ]);

    for (const name of [
      "Professional Summary",
      "Professional Experience",
      "Technical Skills",
      "Education",
    ]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
  });

  it("does not render the previous coming soon placeholder", () => {
    render(<ResumePage />);

    expect(screen.queryByText(/coming soon/i)).not.toBeInTheDocument();
  });

  it("does not publish a phone number or telephone link", () => {
    const source = readSource("./page.tsx");

    expect(source).not.toMatch(/tel:/i);
    expect(source).not.toMatch(/\+\d[\d\s()-]{6,}/);
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

describe("Résumé PDF asset", () => {
  it("ships the approved public PDF at the download path", () => {
    const pdf = readBinary("../../../public/Ivan_Medrano_CV_Public.pdf");

    expect(pdf.subarray(0, 5).toString("ascii")).toBe("%PDF-");
    expect(pdf.subarray(-32).toString("ascii")).toContain("%%EOF");
    expect(pdf.length).toBeGreaterThan(1_000);
    expect(pdf.toString("latin1")).toMatch(/\/Type\s*\/Page\b/);
  });
});
