export default function ContactPage() {
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
            Contact information coming soon.
          </p>
        </header>
      </div>
    </section>
  );
}
