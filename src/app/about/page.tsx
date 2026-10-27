import type { Metadata } from "next";
import {
  aboutParagraphs,
  education,
  skillCategories,
} from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About | Personal Developer Portfolio",
  description:
    "Background, education, and technical skills of a Full-Stack Developer.",
};

export default function AboutPage() {
  return (
    <section
      aria-labelledby="about-heading"
      className="flex flex-1 flex-col bg-background px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-content">
        <header className="max-w-4xl motion-safe:animate-hero-reveal">
          <p className="mb-6 flex flex-wrap items-center gap-3 break-words font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Full-Stack Developer
          </p>

          <h1
            id="about-heading"
            className="break-words text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            About
          </h1>

          <div className="mt-7 max-w-3xl space-y-5 text-pretty text-lg leading-relaxed text-muted">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </header>

        <div className="mt-14 grid gap-12 border-t border-line pt-12 lg:mt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:pt-14">
          <section aria-labelledby="education-heading">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              <h2
                id="education-heading"
                className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
              >
                Education
              </h2>
            </div>

            <div className="mt-6 border-l border-line pl-5 sm:pl-6">
              <h3 className="break-words text-xl font-semibold tracking-tight text-foreground">
                {education.degree}
              </h3>
              <p className="mt-2 text-base text-muted">{education.major}</p>
              <p className="mt-4 text-sm font-medium text-foreground">
                {education.institution}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {education.period}
              </p>
            </div>
          </section>

          <section aria-labelledby="skills-heading">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              <h2
                id="skills-heading"
                className="break-words font-mono text-sm uppercase tracking-[0.2em] text-accent"
              >
                Skills
              </h2>
            </div>

            <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
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
                      className="mt-4 flex flex-wrap gap-2"
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
        </div>
      </div>
    </section>
  );
}
