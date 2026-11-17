"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animateSpring } from "@/lib/motion";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Respect visitors who prefer reduced motion: no spring motion plays.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "translateY(0)";
      return;
    }

    // Simulate the same visual start point as the old CSS keyframe
    // (translateY(0.75rem / ~12px), but a touch slower for a brand hero).
    animateSpring(el, (v) => {
      el.style.transform = `translateY(${v}px)`;
    }, 15, 0, { response: 0.6, damping: 1.0 });
  }, []);

  return (
    <section
      aria-labelledby="home-heading"
      className="flex flex-1 items-center bg-background px-6 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-content">
        <div ref={heroRef} className="max-w-4xl">
          <p className="mb-6 flex flex-wrap items-center gap-3 break-words font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            Full-Stack Developer
          </p>

          <h1
            id="home-heading"
            className="break-words text-balance text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            Building thoughtful digital experiences.
          </h1>

          <p className="mt-7 max-w-xl break-words text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            Developing modern web and mobile applications with an emphasis on
            usability, performance, and maintainability.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
            <Link
              href="/projects"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-center text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-ink sm:w-auto"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-control-line px-6 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-surface sm:w-auto"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
