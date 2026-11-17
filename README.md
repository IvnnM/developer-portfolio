# Personal Developer Portfolio

A statically exported personal developer portfolio showcasing projects, skills, experience, and a detailed case study. Content is data-driven and maintained in a single TypeScript module.

## Project purpose

Present a professional, accessible, and responsive portfolio for a Full-Stack Developer, including an About/Education section, five skills categories, an experience timeline, a projects gallery, and a detailed inventory/project-tracking case study. Contact and Résumé routes are now implemented with public contact methods and a downloadable public résumé PDF.

## Technology stack

- **Framework:** Next.js 16.4.3 (App Router)
- **UI:** React 19.3.0, TypeScript
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/turbopack`)
- **Testing:** Vitest 5, React Testing Library, jsdom
- **Linting:** ESLint 9 with `eslint-config-next`
- **Build:** Static export (`output: "export"` in `next.config.ts`)

## Current implemented routes

| Route | Description |
|---|---|
| `/` | Home / hero |
| `/about` | About, education, and five skills categories |
| `/experience` | Experience timeline (newest first) |
| `/projects` | Projects gallery |
| `/projects/inventory-project-tracking` | Detailed case study |
| `/contact` | Contact (email, GitHub, LinkedIn, copy-to-clipboard) |
| `/resume` | Résumé (web résumé with public PDF download) |

## Local setup and development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server supports hot reload.

## Maintaining portfolio content

All portfolio content lives in `src/data/portfolio.ts`. Types and data are co-located there:

- `aboutParagraphs`, `education`, `skillCategories`
- `experience`
- `projects`, `inventoryProject`, `inventoryProjectTrackingCaseStudy`

Edit the typed arrays/objects in that file to update content. Keep changes consistent with the existing types and tests. Approved portfolio content must not be silently altered.

## Testing and build commands

```bash
npm run lint          # ESLint
npx vitest run        # Unit/component tests
npm run build         # Production build + static export to out/
```

For watch mode: `npx vitest`.

## Static export overview

`next.config.ts` sets `output: "export"`. `npm run build` emits a fully static site to `out/`. The site is designed for static hosting with clean URLs and `.html` fallback handling (see `docs/deployment.md`).

## Documentation

- `docs/deployment.md` — static-export deployment process
- `docs/testing.md` — testing strategy and checklists
- `docs/qa/iteration-3-report.md` — Iteration 3 QA evidence
- `docs/qa/iteration-4-report.md` — Iteration 4 QA evidence
- `docs/traceability.md` — task/requirement traceability

## Current status

Iteration 3 received **conditional owner acceptance on 28 October 2026**. It is **not production-released**. Open findings F-02 (production mobile Lighthouse ≥ 90 and compression/caching verification) and F-03 (static-host RSC prefetch and clean URL behavior) remain unresolved. See `docs/traceability.md`.

Iteration 4 (Contact and Résumé routes) is documented in `docs/qa/iteration-4-report.md` and `docs/traceability.md`; owner acceptance is **pending**. Production release is **NOT approved**.

No private contact information is published in this repository.
