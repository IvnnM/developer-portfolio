# Deployment — Static Export

This document describes the static-export deployment process and required hosting behavior for the portfolio.

## Build output

- Command: `npm run build`
- Configuration: `next.config.ts` sets `output: "export"`.
- Output directory: `out/`
- The `out/` directory contains the fully static site (HTML, JS, CSS, assets). Deploy the contents of `out/`.

## Clean URL handling

Routes are exported as `/<route>/index.html` (e.g. `/about/index.html`). The host must resolve clean URLs such as `/about` to the corresponding `index.html` without exposing the directory path.

## `.html` fallback / rewrite requirements

The host must support fallback/rewrite so that:

- `/about` resolves to `/about/index.html` (or `/about.html` where applicable).
- Unknown paths return the appropriate 404 page (`/404.html`).
- Trailing-slash and non-trailing-slash variants behave consistently.

## RSC prefetch and `_rsc` query handling

Next.js 16 static export may emit RSC prefetch requests containing the `_rsc` query parameter. The host must not block or mishandle these requests, and must serve the corresponding static assets correctly.

> **Unresolved finding (F-03):** A local RSC prefetch mismatch has been observed during development. This is documented as an **unresolved finding**, not a verified production fix. Verify behavior on the actual hosting target before release. Do not treat F-03 as passed.

## Compression and caching

- Enable gzip/brotli compression for text assets (HTML, CSS, JS, JSON).
- Set appropriate cache headers: long-lived immutable caching for hashed assets under `/_next/static/`, shorter caching for HTML documents.
- Verify compression and caching on the deployed target (part of F-02).

## Post-deployment smoke tests

After deploying, verify:

- All routes load (`/`, `/about`, `/experience`, `/projects`, `/projects/inventory-project-tracking`, `/contact`, `/resume`).
- Internal links navigate correctly.
- Theme toggle works (light/dark).
- No console errors.
- 404 page renders for unknown routes.

## Lighthouse verification

- Run Lighthouse (mobile and desktop) against the deployed URL.
- Target: mobile performance ≥ 90 (F-02 gate).
- Verify accessibility, best-practices, and SEO scores.
- F-02 remains **OPEN** until production mobile Lighthouse ≥ 90 and compression/caching are verified on the deployed target.

## Rollback considerations

- Keep the previous `out/` build artifact available for quick rollback.
- Re-deploy the prior build directory if a regression is detected.
- Document the deployed commit hash and build date for traceability.
- No hosting provider or domain is specified in this repository; configure per your environment.

## Open findings

- **F-02:** Production mobile Lighthouse ≥ 90; compression/caching verification. Status: OPEN.
- **F-03:** Static-host RSC prefetch and clean URL behavior. Status: OPEN.
