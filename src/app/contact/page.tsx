"use client";

import { useState } from "react";

const EMAIL = "ivan.medrano.dev@gmail.com";
const GITHUB_URL = "https://github.com/IvnnM";
const LINKEDIN_URL = "https://www.linkedin.com/in/medrano-ivan/";

type CopyStatus = {
  kind: "idle" | "success" | "error";
  message: string;
};

export default function ContactPage() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>({
    kind: "idle",
    message: "",
  });

  async function handleCopyEmail() {
    setCopyStatus({ kind: "idle", message: "" });

    if (!navigator.clipboard) {
      setCopyStatus({
        kind: "error",
        message: "Clipboard access is not available in this browser.",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus({ kind: "success", message: "Email address copied." });
    } catch {
      setCopyStatus({
        kind: "error",
        message: "Failed to copy email address. Please copy it manually.",
      });
    }
  }

  return (
    <section
      aria-labelledby="contact-heading"
      className="flex flex-1 flex-col bg-background px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-content">
        <header className="max-w-3xl">
          <h1
            id="contact-heading"
            className="break-words text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            Contact
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Let&apos;s connect.
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            I&apos;m open to discussing opportunities, projects, and collaborations.
            Reach out by email or connect with me through my professional
            profiles.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-center text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-ink sm:w-auto"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-control-line px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
            >
              Copy Email
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-control-line px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-control-line px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
            >
              LinkedIn
            </a>
          </div>

          <p
            role="status"
            aria-live="polite"
            className={`mt-6 text-sm ${
              copyStatus.kind === "success" ? "text-accent" : "text-muted"
            }`}
          >
            {copyStatus.message}
          </p>
        </header>
      </div>
    </section>
  );
}
