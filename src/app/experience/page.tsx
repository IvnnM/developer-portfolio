import type { Metadata } from "next";
import { experience } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Experience | Personal Developer Portfolio",
  description:
    "Professional experience across full-stack development, systems coordination, and front-end engineering.",
};

export default function ExperiencePage() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="flex flex-1 flex-col bg-background px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-content">
        <header className="max-w-3xl motion-safe:animate-hero-reveal">
          <p className="mb-6 flex flex-wrap items-center gap-3 break-words font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Career
          </p>

          <h1
            id="experience-heading"
            className="break-words text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            Experience
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            A timeline of roles across full-stack development, systems
            coordination, and front-end engineering.
          </p>
        </header>

        <ol
          role="list"
          aria-label="Professional experience timeline"
          className="mt-14 max-w-4xl list-none border-l border-line sm:mt-16"
        >
          {experience.map((entry) => (
            <li
              key={entry.role}
              className="relative pb-12 pl-6 last:pb-0 sm:pl-8"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-accent"
              />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h2 className="break-words text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {entry.role}
                  </h2>
                  <p className="mt-1 break-words text-sm text-muted">
                    {entry.company}
                  </p>
                </div>

                <p className="shrink-0 font-mono text-xs tracking-[0.08em] text-muted">
                  {entry.period}
                </p>
              </div>

              <ul
                role="list"
                className="mt-5 list-none space-y-3 text-base leading-relaxed text-muted"
              >
                {entry.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
