import type { Metadata } from "next";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects | Personal Developer Portfolio",
  description:
    "Selected full-stack projects, including a centralized inventory and project tracking system.",
};

export default function ProjectsPage() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="flex flex-1 flex-col bg-background px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-content">
        <header className="max-w-3xl motion-safe:animate-hero-reveal">
          <p className="mb-6 flex flex-wrap items-center gap-3 break-words font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Selected Work
          </p>

          <h1
            id="projects-heading"
            className="break-words text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            Projects
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            A closer look at the systems I have helped build, refine, and
            deploy for practical business workflows.
          </p>
        </header>

        <div className="mt-12 flex flex-col gap-6 sm:mt-14">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
