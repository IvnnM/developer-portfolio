export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:max-w-[calc(100vw-2rem)] focus:whitespace-normal"
    >
      <span className="inline-block max-w-full rounded-md border border-control-line bg-background px-4 py-2 text-sm font-medium text-foreground">
        Skip to main content
      </span>
    </a>
  );
}
