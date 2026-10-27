import Link from "next/link";
import type { Project } from "@/data/portfolio";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const titleId = `project-${project.slug}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="relative overflow-hidden border border-line bg-surface p-6 sm:p-8 lg:p-10"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)] lg:gap-12">
        <div className="flex min-w-0 flex-col items-start">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              Featured Project
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            <span
              aria-hidden="true"
              className="font-mono text-xs tracking-[0.15em] text-muted"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h2
            id={titleId}
            className="mt-5 break-words text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl"
          >
            {project.title}
          </h2>

          <p className="mt-2 break-words text-sm text-muted">
            {project.organization}
          </p>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {project.summary}
          </p>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Read the case study{" "}
            <span className="sr-only">for {project.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="min-w-0 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Technologies
          </h3>
          <ul
            aria-label={`Technologies used in ${project.title}`}
            role="list"
            className="mt-4 flex flex-wrap gap-2"
          >
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="max-w-full break-words rounded-full border border-line bg-background px-3 py-1 text-sm leading-normal text-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
