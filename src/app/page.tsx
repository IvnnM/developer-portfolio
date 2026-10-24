import Link from "next/link";

export default function Home() {
  return (
    <section
      aria-labelledby="home-heading"
      className="flex flex-1 items-center bg-background px-6 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-content">
        <div className="max-w-4xl motion-safe:animate-hero-reveal">
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Full-Stack Developer
          </p>

          <h1
            id="home-heading"
            className="text-balance text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            Building thoughtful digital experiences.
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            Developing modern web and mobile applications with an emphasis on
            usability, performance, and maintainability.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
            <Link
              href="/projects"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-ink sm:w-auto"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
