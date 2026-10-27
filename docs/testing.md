# Testing

This document describes how the portfolio is tested and verified.

## Automated vs. manual

- **Automated:** Vitest unit/component tests, ESLint, production build, static-export verification (internal-link crawl), axe accessibility checks (14 runs).
- **Manual:** responsive viewport checks, keyboard navigation, screen-reader checks, physical-device/browser checks, Lighthouse.

## Vitest execution

```bash
npx vitest run        # single run (CI-style)
npx vitest            # watch mode
```

Configuration: `vitest.config.ts` — jsdom environment, React plugin, tsconfig paths, setup file `src/test/setup.ts`.

Tests live alongside source as `*.test.tsx` (13 test files, 99 tests).

## Lint and production build

```bash
npm run lint          # ESLint 9 (eslint-config-next)
npm run build         # next build with output: export
```

Both must pass before release.

## Static-export verification

After `npm run build`, verify the `out/` directory and crawl internal links to ensure no broken routes. Smoke-test all routes listed in README.

## Responsive viewport matrix

Manual checks at breakpoints: 320px, 375px, 768px, 1024px, 1280px, 1440px. Verify no horizontal overflow, readable typography, and usable navigation/tap targets.

## Accessibility and keyboard testing

- Automated: axe-core via test runs (zero violations across 14 runs).
- Manual: keyboard-only navigation (Tab/Shift+Tab, Enter, Escape), focus visibility, skip link, heading order, color contrast, reduced motion.

## Manual browser/device/screen-reader checklist

- Browsers: Chrome, Firefox, Safari, Edge.
- Devices: mobile, tablet, desktop (physical where possible).
- Screen readers: NVDA, VoiceOver, TalkBack.
- Zoom: up to 200% / 400% text spacing.
- Verify theme toggle, skip link, navigation, and content readability.

## Known test-tool warnings

- Vitest/jsdom may emit warnings (e.g., CSS not processed with `css: false`, matchMedia stubs). These are expected and do not indicate failures.
- `axe-core`/Testing Library may report act() warnings in some async scenarios; investigate if new.
- Browser-only APIs are polyfilled/stubbed in `src/test/match-media.ts`.

## Outstanding (unperformed) checks

- Manual screen-reader and physical-device testing (not yet performed).
- Safari/Firefox and zoom testing (not yet performed).
- Production Lighthouse (F-02).
