import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InventoryProjectTrackingPage from "./page";

const PROJECT = {
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
} as const;

const APPROVED_SECTION_HEADINGS = [
  "Project Preview",
  "My Role & Contributions",
  "The Problem",
  "The Solution",
  "Highlighted Features",
  "Project Outcomes",
] as const;

const ROLE_INTRO = [
  "I took ownership of an existing, partially developed Inventory & Project Tracking System and was responsible for completing its development, testing, refinement, and deployment.",
  "Working closely with my lead, I gathered additional business-process information, clarified operational requirements, and translated them into application functionality.",
] as const;

const CONTRIBUTIONS = [
  "Reviewing and continuing the existing application implementation.",
  "Completing and enhancing its frontend and backend functionality.",
  "Working with the existing database structure and implementing the changes needed to support application requirements.",
  "Testing, debugging, and refining features based on stakeholder feedback.",
  "Preparing and deploying the completed system for organizational use.",
] as const;

const PROBLEM_INTRO = [
  "Metro Mobilia Corporation managed inventory and project information across multiple branches using separate spreadsheets and manual reporting processes.",
  "Branch personnel had to encode records manually and submit updates, making it difficult to maintain a centralized, reliable view of inventory levels and project progress.",
] as const;

const PROBLEM_CHALLENGES = [
  [
    "Limited inventory visibility",
    "Monitoring stock across branches required gathering information from separate records.",
  ],
  [
    "Manual reporting",
    "Consolidating branch updates involved repetitive data collection and encoding.",
  ],
  [
    "Human error",
    "Manual spreadsheet entry increased the risk of inaccurate or inconsistent information.",
  ],
  [
    "Difficult project monitoring",
    "Tracking project status and progress across branches was inefficient.",
  ],
] as const;

const PROBLEM_CLOSING =
  "The organization needed a centralized system that could simplify record management, improve information reliability, and make inventory and project updates easier to monitor.";

const SOLUTION_INTRO = [
  "The Inventory & Project Tracking System is a centralized web application developed to simplify inventory management and project monitoring across multiple branches.",
  "It brings previously fragmented spreadsheet-based workflows into a shared platform where personnel can manage inventory records, monitor stock movements, and track project progress.",
] as const;

const QR_INTRO =
  "To reduce repetitive manual encoding and improve operational workflows, I implemented two QR code-based features:";

const QR_FEATURES = [
  [
    "Inventory QR Scanning",
    "Automatically retrieves item information and records the corresponding stock transaction.",
  ],
  [
    "QR Code-Based Delivery Confirmation",
    "Allows recipients to scan a delivery QR code, access a dedicated confirmation page, and upload photos. Upon submission, the system automatically updates the delivery status.",
  ],
] as const;

const SOLUTION_CLOSING =
  "By centralizing these processes, the application helps streamline daily operations, improve information accessibility, and support more consistent inventory and project monitoring.";

const HIGHLIGHTED_FEATURES = [
  [
    "QR Code-Based Inventory Transactions",
    "Implemented QR code scanning functionality that automatically retrieves item information and records stock transactions, reducing repetitive manual encoding during inventory operations.",
  ],
  [
    "QR Code-Based Delivery Confirmation",
    "Developed a recipient-facing workflow where scanning a delivery QR code redirects the recipient to a confirmation page. The recipient uploads photo documentation, and the system automatically updates the delivery status upon submission.",
  ],
] as const;

const OUTCOMES_INTRO =
  "The completed Inventory & Project Tracking System provided Metro Mobilia Corporation with a more centralized approach to managing inventory, projects, and delivery-related operations across multiple branches.";

const OUTCOME_IMPROVEMENTS = [
  [
    "Improved inventory visibility",
    "Made it easier to access organized inventory records, monitor stock movements, and review information across branches.",
  ],
  [
    "Reduced reliance on manual encoding",
    "Introduced QR code-based inventory transactions to simplify item retrieval and reduce repetitive data entry, helping minimize opportunities for encoding errors.",
  ],
  [
    "More efficient reporting and coordination",
    "Centralized branch information to simplify the collection of updates and preparation of operational reports.",
  ],
  [
    "Easier project monitoring",
    "Provided a shared platform for reviewing project records and tracking progress.",
  ],
  [
    "Streamlined delivery confirmation",
    "Enabled recipients to submit photo documentation through a QR code-based workflow, automatically updating the associated delivery status upon submission.",
  ],
] as const;

const OUTCOMES_CLOSING =
  "Overall, the project replaced several disconnected manual processes with integrated digital workflows, supporting more accessible information and more consistent day-to-day operations.";

const PREVIEW_TITLES = [
  "Inventory dashboard preview",
  "Inventory QR scan preview",
  "Delivery confirmation preview",
] as const;

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("Inventory & Project Tracking System case study", () => {
  it("presents exactly one primary heading and identifies the project", () => {
    render(<InventoryProjectTrackingPage />);

    const headings = screen.getAllByRole("heading", { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveAccessibleName(PROJECT.title);
    expect(
      screen.getByText(PROJECT.organization),
    ).toBeInTheDocument();
    expect(screen.getByText(PROJECT.summary)).toBeInTheDocument();
  });

  it("lists the approved primary technologies", () => {
    render(<InventoryProjectTrackingPage />);

    const technologyList = screen.getByRole("list", {
      name: "Technologies used",
    });

    expect(
      within(technologyList)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(PROJECT.technologies);
  });

  it("presents every approved case-study section in order", () => {
    render(<InventoryProjectTrackingPage />);

    const sectionHeadings = screen
      .getAllByRole("heading", { level: 2 })
      .map((heading) => heading.textContent);

    expect(sectionHeadings).toEqual(APPROVED_SECTION_HEADINGS);
  });

  it("presents the approved role and contributions content", () => {
    render(<InventoryProjectTrackingPage />);

    const roleSection = screen.getByRole("region", {
      name: "My Role & Contributions",
    });

    for (const paragraph of ROLE_INTRO) {
      expect(within(roleSection).getByText(paragraph)).toBeInTheDocument();
    }

    expect(
      within(roleSection).getByText("My contributions included:"),
    ).toBeInTheDocument();

    const contributionList = within(roleSection).getByRole("list", {
      name: "Key contributions",
    });

    expect(
      within(contributionList)
        .getAllByRole("listitem")
        .map((item) => item.textContent),
    ).toEqual(CONTRIBUTIONS);
  });

  it("presents the approved problem, challenges, and closing statement", () => {
    render(<InventoryProjectTrackingPage />);

    const problemSection = screen.getByRole("region", { name: "The Problem" });

    for (const paragraph of PROBLEM_INTRO) {
      expect(within(problemSection).getByText(paragraph)).toBeInTheDocument();
    }

    const challengeList = within(problemSection).getByRole("list", {
      name: "Operational challenges",
    });

    expect(
      within(challengeList)
        .getAllByRole("listitem")
        .map((item) => item.textContent?.replace(/\s+/g, " ").trim()),
    ).toEqual(
      PROBLEM_CHALLENGES.map(([title, description]) => `${title}: ${description}`),
    );
    expect(within(problemSection).getByText(PROBLEM_CLOSING)).toBeInTheDocument();
  });

  it("presents the approved solution and both QR-based workflows", () => {
    render(<InventoryProjectTrackingPage />);

    const solutionSection = screen.getByRole("region", {
      name: "The Solution",
    });

    for (const paragraph of SOLUTION_INTRO) {
      expect(within(solutionSection).getByText(paragraph)).toBeInTheDocument();
    }

    expect(within(solutionSection).getByText(QR_INTRO)).toBeInTheDocument();

    const qrFeatureList = within(solutionSection).getByRole("list", {
      name: "QR code-based features",
    });

    expect(
      within(qrFeatureList)
        .getAllByRole("listitem")
        .map((item) => item.textContent?.replace(/\s+/g, " ").trim()),
    ).toEqual(QR_FEATURES.map(([title, description]) => `${title}: ${description}`));
    expect(
      within(solutionSection).getByText(SOLUTION_CLOSING),
    ).toBeInTheDocument();
  });

  it("presents both approved QR-based highlighted features", () => {
    render(<InventoryProjectTrackingPage />);

    const featuresSection = screen.getByRole("region", {
      name: "Highlighted Features",
    });
    const featureList = within(featuresSection).getByRole("list", {
      name: "Highlighted features",
    });

    expect(
      within(featureList).getAllByRole("heading", { level: 3 }).map(
        (heading) => heading.textContent,
      ),
    ).toEqual(HIGHLIGHTED_FEATURES.map(([title]) => title));

    for (const [title, description] of HIGHLIGHTED_FEATURES) {
      const featureItem = within(featureList)
        .getByRole("heading", { level: 3, name: title })
        .closest("li");

      expect(featureItem).not.toBeNull();

      if (!featureItem) {
        throw new Error(`Missing highlighted feature: ${title}`);
      }

      expect(within(featureItem).getByText(description)).toBeInTheDocument();
    }
  });

  it("presents the approved project outcomes", () => {
    render(<InventoryProjectTrackingPage />);

    const outcomesSection = screen.getByRole("region", {
      name: "Project Outcomes",
    });

    expect(within(outcomesSection).getByText(OUTCOMES_INTRO)).toBeInTheDocument();

    const improvementList = within(outcomesSection).getByRole("list", {
      name: "Operational improvements",
    });

    expect(
      within(improvementList)
        .getAllByRole("listitem")
        .map((item) => item.textContent?.replace(/\s+/g, " ").trim()),
    ).toEqual(
      OUTCOME_IMPROVEMENTS.map(
        ([title, description]) => `${title}: ${description}`,
      ),
    );
    expect(
      within(outcomesSection).getByText(OUTCOMES_CLOSING),
    ).toBeInTheDocument();
  });

  it("clearly identifies every temporary visual as a placeholder", () => {
    render(<InventoryProjectTrackingPage />);

    const previewSection = screen.getByRole("region", {
      name: "Project Preview",
    });
    const figures = within(previewSection).getAllByRole("figure");

    expect(figures).toHaveLength(PREVIEW_TITLES.length);
    expect(
      within(previewSection).getByText(/temporary, illustrative placeholders/i),
    ).toBeInTheDocument();

    PREVIEW_TITLES.forEach((previewTitle) => {
      const figure = within(previewSection).getByRole("figure", {
        name: previewTitle,
      });

      expect(
        within(figure).getByText("Preview placeholder"),
      ).toBeInTheDocument();
      expect(
        within(figure).getByText(/not an actual application screenshot/i),
      ).toBeInTheDocument();
      expect(figure.querySelector("img")).toBeNull();
    });
  });

  it("does not invent screenshots, external destinations, or performance metrics", () => {
    render(<InventoryProjectTrackingPage />);

    const article = screen.getByRole("article", { name: PROJECT.title });

    expect(article.querySelector("img")).toBeNull();
    expect(article).not.toHaveTextContent(/github|live demo|testimonial/i);
    expect(article).not.toHaveTextContent(/\b\d+(?:\.\d+)?%/);

    for (const link of within(article).getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^\/(?!\/)/);
    }
  });

  it("provides internal navigation back to the projects gallery", () => {
    render(<InventoryProjectTrackingPage />);

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to projects" }),
    ).toHaveAttribute("href", "/projects");
  });

  it("uses semantic landmarks and an accessible heading structure", () => {
    render(<InventoryProjectTrackingPage />);

    expect(
      screen.getByRole("article", { name: PROJECT.title }),
    ).toBeInTheDocument();

    for (const heading of APPROVED_SECTION_HEADINGS) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading }),
      ).toBeInTheDocument();
    }

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("keeps the case study content server-rendered", () => {
    const source = readSource("./page.tsx");

    expect(source).not.toMatch(/^["']use client["'];?$/m);
    expect(source).not.toMatch(/\buse(State|Effect|LayoutEffect|Reducer)\b/);
    expect(source).not.toContain("next/image");
  });

  it("uses the shared responsive content shell", () => {
    const source = readSource("./page.tsx");

    expect(source).toContain("max-w-content");
    expect(source).toContain("px-6");
    expect(source).toContain("break-words");
    expect(source).toMatch(/sm:|lg:/);
  });
});
