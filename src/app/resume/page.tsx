export default function ResumePage() {
  return (
    <section
      aria-labelledby="resume-heading"
      className="flex flex-1 flex-col bg-background px-6 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-content">
        <header className="max-w-3xl">
          <h1
            id="resume-heading"
            className="break-words text-balance text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
          >
            Résumé
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
            Résumé viewing and download functionality coming soon.
          </p>
        </header>
      </div>
    </section>
  );
}
