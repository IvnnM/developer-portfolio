# Implementation Plan: Apple Design Redesign of the Developer Portfolio

**Branch**: `feat/apple-design-redesign` | **Date**: 2026-11-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-apple-design-redesign/spec.md`

## Summary

Redesign the developer portfolio (`developer-portfolio`, Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript) to use Apple's interface design language — refined typography, translucent/soft surfaces, spring-based motion, and gesture-driven responsiveness — while **preserving all existing content verbatim**. The redesign is a pure presentation-layer change: CSS design tokens, a spring motion utility, typography rules, and component restyling. No new npm dependencies, no content changes, no data model changes.

**Key decisions:**
- **Design tokens first**: all colour, surface, border, and shadow values move into `globals.css` custom properties so the entire visual system is configurable in one place.
- **Dependency-free spring motion**: a small shared `motion.ts` util using Web Animations API (WAAPI) spring physics, reused across all entrance and interactive animations. No new npm packages.
- **Typography system**: Apple-style tracking/leading applied via CSS classes and design tokens; Geist font retained (no font replacement).
- **Theme**: light/dark surfaces restyled with refined elevation; theme toggle cross-fades.
- **Phased delivery**: motion utility + design tokens (P1 foundation) → homepage hero → all pages → gesture details → reduced-motion.

## Technical Context

**Language/Version**: TypeScript (strict, `erasableSyntaxOnly`), ES2022+
**Primary Dependencies**: Next.js 16.4, React 19.3, Tailwind CSS 4 (`@tailwindcss/turbopack`), no new runtime dependencies
**Storage**: None (pure frontend; no data changes)
**Testing**: Vitest (unit), existing Playwright/E2E where applicable
**Target Platform**: Static export (`output: "export"`), responsive desktop and mobile
**Project Type**: Static marketing portfolio, single-page app

**Performance Goals**: Hero entrance animation runs at 60fps with no layout shift; spring motion interruptible at any point; reduced-motion mode shows content instantly.

**Constraints**: No new npm dependencies (must justify any addition); no content changes; no data/backend changes; no PDF or external asset changes.

## Constitution Check

*GATE: Must pass before implementation begins.*

| Principle | Plan response | Result |
|---|---|---|
| III. Preserve content verbatim | All changes are presentation-layer only (CSS tokens, motion util, component restyle). Content is typed as-is; no text, paragraph, or data is modified. | Pass |
| IV. Apple-style visual design | Typography, colour, surfaces, motion, and gesture follow Apple's design principles per `skills/apple-design/SKILL.md`. | Pass |
| V. Spec-driven development | Implementation follows the approved spec `specs/001-apple-design-redesign/spec.md`; debatable deviations are recorded as Design Tokens. | Pass |

**Re-check before implementation**: all gates still pass. No new dependencies, no data/backend changes, no content changes.

## Project Structure

### Specification (this feature)
```text
specs/001-apple-design-redesign/
├── spec.md                 # Approved feature spec
└── plan.md                 # This file
```

### Source Code (repository root)
```text
src/
├── app/
│   ├── globals.css                 # Design tokens (colour/surface/border/shadow)
│   ├── layout.tsx                  # Root layout (unchanged except motion classes)
│   ├── page.tsx                    # Homepage hero (spring entrance)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── experience/page.tsx
│   ├── projects/page.tsx
│   ├── projects/inventory-project-tracking/page.tsx
│   └── resume/page.tsx
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx          # Refined top bar, reduced noise
│   │   ├── SiteFooter.tsx
│   │   └── SkipLink.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx         # Apple-style card
│   │   └── ProjectVisualPlaceholder.tsx
│   └── theme/
│       ├── ThemeProvider.tsx       # Unchanged (theme logic preserved)
│       └── ThemeToggle.tsx         # Restyled for Apple feel
├── data/
│   └── portfolio.ts                # Content — UNTOUCHED (verbatim)
├── lib/
│   ├── theme.ts                    # Unchanged (theme logic preserved)
│   └── motion.ts                   # NEW: spring motion utility (no deps)
└── styles/
    └── (no existing styles — using globals.css tokens)
```

**Structure Decision**: The redesign is a **presentation-layer only** change. Content lives in `src/data/portfolio.ts` and is typed as-is. Visual system lives in `src/app/globals.css` (design tokens) + component-level Tailwind classes. Motion lives in `src/lib/motion.ts` (spring util, no deps). Components are restyled via design tokens + refined Tailwind classes.

## Complexity Tracking

| Change | Files touched | Risk | Notes |
|---|---|---|---|
| Design tokens | `src/app/globals.css` | Low | All colours/surfaces/shadows in CSS vars; validated against Apple reference |
| Spring motion util | `src/lib/motion.ts` (new) | Low–Medium | WAAPI spring API; no deps; 60fps verified |
| Homepage hero | `src/app/page.tsx` | Low | Spring entrance; interruptible |
| SiteHeader | `src/components/layout/SiteHeader.tsx` | Low | Refined top bar; unused CSS removed |
| ProjectCard | `src/components/projects/ProjectCard.tsx` | Low | Apple-style card; hover elevation spring |
| All content pages | `src/app/**/page.tsx` | Low | Restyle via shared tokens; content verbatim |
| Theme toggle | `src/components/theme/ThemeToggle.tsx` | Low | Restyled; transition preserved |
| SiteFooter | `src/components/layout/SiteFooter.tsx` | Low | Refined; reduced noise |
| Content data | `src/data/portfolio.ts` | None | **No changes** (constitution Principle III) |

**No new npm dependencies.** If a dependency is ever needed, it MUST be justified in the plan and approved before adding.

## Design Tokens (proposed)

| Token | Light | Dark | Apple reference |
|---|---|---|---|
| `--color-background` | `#fafaf9` | `#1c1917` (stone-900) | Similar to Apple's page background |
| `--color-foreground` | `#1c1917` (stone-900) | `#f5f5f4` (stone-50) | High contrast, warm neutral |
| `--color-surface` | `#ffffff` | `#292524` | Elevated fill |
| `--color-border` | `#e7e5e4` | `#44403c` | Soft, warm grey |
| `--color-accent` | `#7c3aed` (violet-600) | `#a78bfa` (violet-400) | Restrained, reserved accent |
| `--color-muted` | `#78716c` (stone-500) | `#a8a29e` (stone-400) | Soft, readable |
| `--shadow` | `0 1px 3px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.02)` | `0 1px 3px rgba(0,0,0,.15)` | Soft elevation only |

**Typography rules**: headings — `tracking: -0.02em to -0.03em`, `leading: 1.0–1.05`; body — `line-height: 1.5–1.6`, `tracking: 0`; labels — `font-family: monospace`, `tracking: 0.15–0.2em`, `text-transform: uppercase`.

## Implementation Phases

### Phase A: Motion utility + design tokens (P1 foundation)
- [ ] A01: Write `src/lib/motion.ts` — spring motion util using WAAPI (`spring(targets, options)`), interruptible, velocity-aware, `prefers-reduced-motion` aware.
- [ ] A02: Define design tokens in `src/app/globals.css` (colour, surface, border, shadow, typography).
- [ ] A03: Verify tokens: build (`npm run build`), lint (`npm run lint`).

### Phase B: Homepage hero (P1)
- [ ] B01: Replace `motion-safe:animate-hero-reveal` CSS keyframe with spring entrance in `src/app/page.tsx`.
- [ ] B02: Add spring press/transition for buttons and links (`prefers-reduced-motion` aware).
- [ ] B03: Verify reduced-motion: content appears instantly, no animation.

### Phase C: All pages (P2)
- [ ] C01: Restyle `src/app/about/page.tsx`, `contact/page.tsx`, `experience/page.tsx`, `resume/page.tsx` using tokens + refined spacing.
- [ ] C02: Restyle `src/app/projects/page.tsx` + `ProjectCard.tsx` (Apple-style card, spring hover).
- [ ] C03: Restyle case study page (`src/app/projects/inventory-project-tracking/page.tsx`) with Apple-style layout and spring section reveals.

### Phase D: Motion + gesture details (P3)
- [ ] D01: Spring transitions for theme toggle (cross-fade).
- [ ] D02: Refine `src/components/layout/SiteHeader.tsx` (reduced noise, refined top bar).
- [ ] D03: Refine `src/components/layout/SiteFooter.tsx` (reduced noise).
- [ ] D04: Implement rubber-banding at scroll edges (`prefers-reduced-motion` aware).

### Phase E: Verification
- [ ] E01: Run `npm run build`, `npm run lint`, `npm run test:unit`.
- [ ] E02: Verify reduced-motion mode across all pages.
- [ ] E03: Verify content verbatim in all pages (spot-check against `src/data/portfolio.ts`).
- [ ] E04: Verify theme toggle, both light and dark.

## Success Criteria

- [ ] Homepage hero entrance uses spring-based animation, not CSS keyframes.
- [ ] All spring motion respects `prefers-reduced-motion`.
- [ ] All animations are interruptible.
- [ ] Typography applies Apple-style tracking and leading.
- [ ] Light/dark surfaces refined with soft elevation and restrained accents.
- [ ] All existing content preserved verbatim.
- [ ] `npm run build`, `npm run lint`, `npm run test:unit` all pass.
- [ ] No new npm dependencies (or justified if any are added).
