import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import ContactPage from "./page";

function readSource(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

const EMAIL = "ivan.medrano.dev@gmail.com";
const GITHUB_URL = "https://github.com/IvnnM";
const LINKEDIN_URL = "https://www.linkedin.com/in/medrano-ivan/";

/**
 * Installs a fake `navigator.clipboard`. Must be called after
 * `userEvent.setup()`, because user-event replaces `navigator.clipboard`
 * with jsdom's real Clipboard implementation on setup.
 */
function installClipboard(writeText: () => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

function removeClipboard() {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: undefined,
  });
}

describe("Contact page", () => {
  beforeEach(() => {
    removeClipboard();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    removeClipboard();
  });

  it("presents one labeled primary heading and the introductory copy", () => {
    render(<ContactPage />);

    expect(screen.getByRole("region", { name: "Contact" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Contact" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Let's connect.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "I'm open to discussing opportunities, projects, and collaborations. Reach out by email or connect with me through my professional profiles.",
      ),
    ).toBeInTheDocument();
  });

  it("displays the public email address", () => {
    render(<ContactPage />);

    expect(screen.getByText(EMAIL)).toBeInTheDocument();
  });

  it("links the email to a functional mailto destination", () => {
    render(<ContactPage />);

    expect(
      screen.getByRole("link", { name: EMAIL }),
    ).toHaveAttribute("href", `mailto:${EMAIL}`);
  });

  it("links to the GitHub profile", () => {
    render(<ContactPage />);

    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      GITHUB_URL,
    );
  });

  it("opens the GitHub profile in a new tab with safe rel attributes", () => {
    render(<ContactPage />);

    const link = screen.getByRole("link", { name: /GitHub/ });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("links to the LinkedIn profile", () => {
    render(<ContactPage />);

    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      LINKEDIN_URL,
    );
  });

  it("opens the LinkedIn profile in a new tab with safe rel attributes", () => {
    render(<ContactPage />);

    const link = screen.getByRole("link", { name: /LinkedIn/ });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
  });

  it("copies the email and reports success", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    installClipboard(writeText);

    render(<ContactPage />);

    await user.click(screen.getByRole("button", { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(screen.getByRole("status")).toHaveTextContent(
      "Email address copied.",
    );
  });

  it("reports an error when the clipboard rejects", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    installClipboard(writeText);

    render(<ContactPage />);

    await user.click(screen.getByRole("button", { name: /copy email/i }));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(screen.getByRole("status")).toHaveTextContent(
      /failed to copy email address/i,
    );
  });

  it("reports an error when clipboard access is unavailable", async () => {
    const user = userEvent.setup();
    removeClipboard();

    render(<ContactPage />);

    await user.click(screen.getByRole("button", { name: /copy email/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      /clipboard access is not available/i,
    );
  });

  it("does not claim a copy succeeded when it failed", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockRejectedValue(new Error("denied"));
    installClipboard(writeText);

    render(<ContactPage />);

    await user.click(screen.getByRole("button", { name: /copy email/i }));

    expect(
      screen.queryByRole("status", { name: /copied/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(/failed/i);
  });

  it("uses the shared responsive content shell", () => {
    const source = readSource("./page.tsx");

    expect(source).toContain("max-w-content");
    expect(source).toContain("px-6");
    expect(source).toContain("break-words");
  });
});
