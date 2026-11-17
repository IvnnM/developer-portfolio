import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  aboutParagraphs,
  education,
  experience,
  profile,
  skillCategories,
} from "@/data/portfolio";

const RESUME_PDF_FILENAME = "Ivan_Medrano_CV_Public.pdf";
const RESUME_PDF_PATH = `/${RESUME_PDF_FILENAME}`;

export const metadata: Metadata = {
  title: "Résumé | Personal Developer Portfolio",
  description: `Résumé of ${profile.name}, ${profile.title}: professional summary, experience, technical skills, and education.`,
};

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      <h2
        id={id}
        className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
      >
        {children}
      </h2>
    </div>
  );
}

export default function ResumePage() {
  return (
    <section
      aria-label="Résumé"
      className="flex flex-1 flex-col bg-background px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-content">
        <header className="max-w-4xl motion-safe:animate-hero-reveal">
          <p className="mb-6 flex flex-wrap items-center gap-3 break-words font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Résumé
          </p>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div className="min-w-0">
              <h1
                id="resume-heading"
                className="break-words text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
              >
                {profile.name}
              </h1>
              <p className="mt-3 break-words text-xl font-medium tracking-tight text-muted sm:text-2xl">
                {profile.title}
              </p>
            </div>

            <a
              href={RESUME_PDF_PATH}
              download={RESUME_PDF_FILENAME}
              type="application/pdf"
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-foreground px-6 py-3 text-center text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-ink sm:w-auto"
            >
              Download Résumé
              <span className="sr-only"> (PDF)</span>
            </a>
          </div>
        </header>

        <div className="mt-14 grid gap-12 border-t border-line pt-12 lg:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pt-14">
          <div className="space-y-14">
            <section aria-labelledby="summary-heading">
              <SectionHeading id="summary-heading">
                Professional Summary
              </SectionHeading>

              <div className="mt-6 max-w-3xl space-y-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="experience-heading">
              <SectionHeading id="experience-heading">
                Professional Experience
              </SectionHeading>

              <ol
                role="list"
                aria-label="Professional experience"
                className="mt-6 list-none border-l border-line"
              >
                {experience.map((entry) => (
                  <li
                    key={`${entry.role}-${entry.company}`}
                    className="relative pb-10 pl-5 last:pb-0 sm:pl-6"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-background bg-accent"
                    />

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <div className="min-w-0">
                        <h3 className="break-words text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                          {entry.role}
                        </h3>
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
                      className="mt-4 list-none space-y-3 text-sm leading-relaxed text-muted sm:text-base"
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
            </section>
          </div>

          <div className="space-y-14">
            <section aria-labelledby="skills-heading">
              <SectionHeading id="skills-heading">
                Technical Skills
              </SectionHeading>

              <div className="mt-6 space-y-6">
                {skillCategories.map((category) => {
                  const headingId = `${category.id}-heading`;

                  return (
                    <div key={category.id}>
                      <h3
                        id={headingId}
                        className="break-words text-base font-semibold tracking-tight text-foreground"
                      >
                        {category.title}
                      </h3>
                      <ul
                        role="list"
                        aria-labelledby={headingId}
                        className="mt-3 flex flex-wrap gap-2"
                      >
                        {category.skills.map((skill) => (
                          <li
                            key={skill}
                            className="max-w-full break-words rounded-full border border-line bg-surface px-3 py-1 text-sm leading-normal text-foreground"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="education-heading">
              <SectionHeading id="education-heading">Education</SectionHeading>

              <div className="mt-6 border-l border-line pl-5 sm:pl-6">
                <h3 className="break-words text-lg font-semibold tracking-tight text-foreground">
                  {education.degree}
                </h3>
                <p className="mt-2 text-sm text-muted">{education.major}</p>
                <p className="mt-4 text-sm font-medium text-foreground">
                  {education.institution}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {education.period}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
