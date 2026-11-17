import type { Metadata } from "next";
import Link from "next/link";
import ProjectVisualPlaceholder from "@/components/projects/ProjectVisualPlaceholder";
import {
  inventoryProject,
  inventoryProjectTrackingCaseStudy,
} from "@/data/portfolio";

export const metadata: Metadata = {
  title:
    "Inventory & Project Tracking System | Personal Developer Portfolio",
  description: inventoryProject.summary,
};

export default function InventoryProjectTrackingPage() {
  const { role, problem, solution, features, outcomes, previews } =
    inventoryProjectTrackingCaseStudy;

  return (
    <article
      aria-labelledby="case-study-heading"
      className="flex flex-1 flex-col bg-background px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-content">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted"
          >
            <li>
              <Link
                href="/projects"
                className="underline-offset-4 hover:text-foreground hover:underline"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li
              aria-current="page"
              className="break-words text-foreground"
            >
              {inventoryProject.title}
            </li>
          </ol>
        </nav>

        <header className="mt-10 max-w-4xl motion-safe:animate-hero-reveal">
          <p className="mb-6 flex flex-wrap items-center gap-3 break-words font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Case Study
          </p>

          <h1
            id="case-study-heading"
            className="break-words text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            {inventoryProject.title}
          </h1>

          <p className="mt-4 break-words text-sm font-medium text-foreground">
            {inventoryProject.organization}
          </p>

          <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-muted">
            {inventoryProject.summary}
          </p>

          <ul
            aria-label="Technologies used"
            role="list"
            className="mt-8 flex flex-wrap gap-2"
          >
            {inventoryProject.technologies.map((technology) => (
              <li
                key={technology}
                className="max-w-full break-words rounded-full border border-line bg-surface px-3 py-1 text-sm leading-normal text-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>
        </header>

        <section
          aria-labelledby="preview-heading"
          className="mt-16 border-t border-line pt-10 sm:mt-20 sm:pt-12"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-end lg:gap-12">
            <div>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-6 bg-accent" />
                <h2
                  id="preview-heading"
                  className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
                >
                  Project Preview
                </h2>
              </div>
            </div>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted">
              These are temporary, illustrative placeholders while sanitized
              screenshots are prepared. They are not actual application
              screenshots.
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {previews.map((preview) => (
              <ProjectVisualPlaceholder key={preview.id} preview={preview} />
            ))}
          </div>
        </section>

        <div className="mt-16 max-w-4xl space-y-14 border-t border-line pt-12 sm:mt-20 sm:space-y-16 sm:pt-14">
          <section aria-labelledby="role-heading">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              <h2
                id="role-heading"
                className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
              >
                My Role &amp; Contributions
              </h2>
            </div>

            <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {role.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>My contributions included:</p>
            </div>

            <ul
              aria-label="Key contributions"
              role="list"
              className="mt-5 list-none space-y-3 text-base leading-relaxed text-muted"
            >
              {role.contributions.map((contribution) => (
                <li
                  key={contribution}
                  className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                >
                  {contribution}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="problem-heading">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              <h2
                id="problem-heading"
                className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
              >
                The Problem
              </h2>
            </div>

            <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {problem.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul
              aria-label="Operational challenges"
              role="list"
              className="mt-6 list-none space-y-4 text-base leading-relaxed text-muted"
            >
              {problem.challenges.map((challenge) => (
                <li
                  key={challenge.title}
                  className="border-l border-line pl-5"
                >
                  <strong className="font-semibold text-foreground">
                    {challenge.title}:
                  </strong>{" "}
                  {challenge.description}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {problem.closing}
            </p>
          </section>

          <section aria-labelledby="solution-heading">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              <h2
                id="solution-heading"
                className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
              >
                The Solution
              </h2>
            </div>

            <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {solution.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>{solution.qrIntro}</p>
            </div>

            <ul
              aria-label="QR code-based features"
              role="list"
              className="mt-5 list-none space-y-4 text-base leading-relaxed text-muted"
            >
              {solution.qrFeatures.map((feature) => (
                <li key={feature.title} className="border-l border-line pl-5">
                  <strong className="font-semibold text-foreground">
                    {feature.title}:
                  </strong>{" "}
                  {feature.description}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {solution.closing}
            </p>
          </section>

          <section aria-labelledby="features-heading">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              <h2
                id="features-heading"
                className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
              >
                Highlighted Features
              </h2>
            </div>

            <ul
              aria-label="Highlighted features"
              role="list"
              className="mt-6 grid list-none gap-5 sm:grid-cols-2"
            >
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="border border-line bg-surface p-6"
                >
                  <h3 className="break-words text-lg font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="outcomes-heading">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              <h2
                id="outcomes-heading"
                className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
              >
                Project Outcomes
              </h2>
            </div>

            <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {outcomes.intro}
            </p>

            <ul
              aria-label="Operational improvements"
              role="list"
              className="mt-6 list-none space-y-4 text-base leading-relaxed text-muted"
            >
              {outcomes.improvements.map((improvement) => (
                <li
                  key={improvement.title}
                  className="border-l border-line pl-5"
                >
                  <strong className="font-semibold text-foreground">
                    {improvement.title}:
                  </strong>{" "}
                  {improvement.description}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-pretty text-base leading-relaxed text-muted sm:text-lg">
              {outcomes.closing}
            </p>
          </section>
        </div>

        <footer className="mt-16 border-t border-line pt-8">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-control-line px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            <span aria-hidden="true">←</span>
            Back to projects
          </Link>
        </footer>
      </div>
    </article>
  );
}
