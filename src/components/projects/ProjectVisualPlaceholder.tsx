import type { ReactNode } from "react";
import type { ProjectPreview } from "@/data/portfolio";

const chartBars = [
  "h-2/5",
  "h-3/5",
  "h-1/3",
  "h-3/4",
  "h-1/2",
  "h-4/5",
  "h-2/3",
] as const;

const qrPattern = [
  "1110111",
  "1000101",
  "1011101",
  "0001000",
  "1110111",
  "1000101",
  "1110111",
] as const;

const qrCells = qrPattern.flatMap((row) =>
  row.split("").map((cell) => cell === "1"),
);

function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface p-4 sm:p-5">
      <div aria-hidden="true" className="flex items-center justify-between gap-3">
        <div className="flex gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/10" />
        </div>
        <span className="rounded-full border border-line bg-background px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted">
          Preview
        </span>
      </div>
      <div aria-hidden="true" className="mt-3 h-[calc(100%-2.25rem)]">
        {children}
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="grid h-full grid-cols-[0.34fr_1fr] gap-2 sm:gap-3">
      <div className="flex flex-col rounded-md border border-line bg-background p-2.5">
        <div className="h-1.5 w-3/4 rounded-full bg-foreground/20" />
        <div className="mt-3 space-y-2">
          {["w-full", "w-2/3", "w-4/5", "w-1/2"].map((width, index) => (
            <div
              key={width}
              className={`h-1.5 rounded-full ${width} ${
                index === 0 ? "bg-accent/50" : "bg-foreground/10"
              }`}
            />
          ))}
        </div>
        <div className="mt-auto h-10 rounded border border-line bg-surface" />
      </div>

      <div className="flex min-h-0 flex-col gap-2 sm:gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((card) => (
            <div
              key={card}
              className="rounded-md border border-line bg-background p-2"
            >
              <div className="h-1 w-2/3 rounded-full bg-foreground/15" />
              <div
                className={`mt-2 h-2.5 rounded-sm ${
                  card === 1 ? "w-1/2 bg-accent/45" : "w-2/3 bg-foreground/15"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 items-end gap-1.5 rounded-md border border-line bg-background p-2.5">
          {chartBars.map((height, index) => (
            <div
              key={height}
              className={`flex-1 rounded-t-sm ${height} ${
                index === 5 ? "bg-accent/50" : "bg-foreground/15"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScanMock() {
  return (
    <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-2 sm:gap-3">
      <div className="flex items-center justify-center rounded-md border border-line bg-background p-3">
        <div className="relative grid w-full max-w-28 grid-cols-7 gap-1 p-1">
          {qrCells.map((isFilled, index) => (
            <span
              key={index}
              className={`aspect-square rounded-[1px] ${
                isFilled ? "bg-foreground/70" : "bg-transparent"
              }`}
            />
          ))}
          <span className="absolute inset-x-0 top-1/2 h-px bg-accent" />
          <span className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-accent/60" />
          <span className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-accent/60" />
          <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-accent/60" />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-accent/60" />
        </div>
      </div>

      <div className="flex min-w-0 flex-col rounded-md border border-line bg-background p-3">
        <div className="h-2 w-2/3 rounded-full bg-foreground/20" />
        <div className="mt-3 space-y-2">
          {["w-3/4", "w-1/2", "w-2/3"].map((width) => (
            <div key={width} className="flex items-center gap-2">
              <div className="h-1 w-5 rounded-full bg-foreground/10" />
              <div className={`h-1.5 ${width} rounded-full bg-foreground/15`} />
            </div>
          ))}
        </div>
        <div className="mt-auto h-6 rounded bg-accent/70" />
      </div>
    </div>
  );
}

function ConfirmationMock() {
  return (
    <div className="mx-auto flex h-full max-w-56 flex-col rounded-lg border border-line bg-background p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="h-1.5 w-1/2 rounded-full bg-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-accent/70" />
      </div>

      <div className="mt-3 flex flex-1 flex-col items-center justify-center rounded-md border border-dashed border-control-line bg-surface px-3 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-background">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
        </div>
        <div className="mt-2 h-1.5 w-20 rounded-full bg-foreground/15" />
        <div className="mt-1.5 h-1 w-14 rounded-full bg-foreground/10" />
      </div>

      <div className="mt-3 space-y-1.5">
        <div className="h-1.5 w-full rounded-full bg-foreground/10" />
        <div className="h-1.5 w-3/4 rounded-full bg-foreground/10" />
      </div>
      <div className="mt-3 h-6 rounded bg-accent/70" />
    </div>
  );
}

function PreviewCanvas({ variant }: { variant: ProjectPreview["id"] }) {
  return (
    <BrowserFrame>
      {variant === "dashboard" ? <DashboardMock /> : null}
      {variant === "inventory-scan" ? <ScanMock /> : null}
      {variant === "delivery-confirmation" ? <ConfirmationMock /> : null}
    </BrowserFrame>
  );
}

export default function ProjectVisualPlaceholder({
  preview,
}: {
  preview: ProjectPreview;
}) {
  const titleId = `preview-${preview.id}-title`;

  return (
    <figure
      aria-labelledby={titleId}
      className="flex min-w-0 flex-col overflow-hidden border border-line bg-background"
    >
      <PreviewCanvas variant={preview.id} />

      <figcaption className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">
          Preview placeholder
        </p>
        <p
          id={titleId}
          className="mt-2 break-words text-base font-semibold tracking-tight text-foreground"
        >
          {preview.title}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {preview.description}
        </p>
        <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted">
          Illustrative layout only — not an actual application screenshot.
          Sanitized screenshots will replace this preview.
        </p>
      </figcaption>
    </figure>
  );
}
