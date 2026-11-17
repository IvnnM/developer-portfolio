# Iteration 4 — QA Report

**Status:** Pending owner acceptance. Not production-released.
**Recommendation:** Conditional acceptance (subject to a fresh release-candidate build and the open gates below).

## Summary

Iteration 4 delivered the Contact and Résumé routes, replacing the earlier placeholders with implemented, tested content:

- **Contact** (`/contact`): public email, `mailto:` link, GitHub and LinkedIn profile links, and copy-to-clipboard email with accessible status feedback.
- **Résumé** (`/resume`): server-rendered web résumé (professional summary, experience, technical skills, education) plus a prominent download link for the approved public PDF (`Ivan_Medrano_CV_Public.pdf`).

## Requirements covered

| ID | Requirement | Status |
|---|---|---|
| FR4-001 | Contact route presents public contact methods (email, GitHub, LinkedIn). | Verified (automated) |
| FR4-002 | Email can be copied to the clipboard with success/error status feedback. | Verified (automated) |
| FR4-003 | External profile links open in a new tab with safe `rel` attributes. | Verified (automated) |
| FR4-004 | Résumé route presents approved professional summary, experience, skills, and education. | Verified (automated) |
| FR4-005 | Résumé route provides a download link for the approved public PDF with correct `href`, `download`, and `type` attributes. | Verified (automated) |
| NFR4-001 | Accessibility semantics (landmarks, headings, `aria-live` status, keyboard operability, no private phone data). | Partially verified (automated axe/semantics; manual screen-reader/device checks not performed) |
| NFR4-002 | Static-export compatibility and shared responsive content shell (server-rendered résumé, no placeholders, no broken internal links). | Partially verified (link crawl passed; fresh release-candidate build still required) |

## Automated verification

- **Tests:** 120/120 passing across 14 test files.
- **Lint (ESLint):** passed.
- **Static-export internal-link crawl:** 0 broken links across 218 checked.
- **PDF asset checks:** passed — file ships at `/Ivan_Medrano_CV_Public.pdf`, begins with `%PDF-`, ends with `%%EOF`, size > 1,000 bytes, and contains `/Type /Page`.

## Build status

- **Batch 2:** previously reported a successful production build.
- **Latest Batch 3:** build hung; root cause unconfirmed.
- **Fresh release-candidate build:** still required before release.

## Responsive checks

Responsive viewport checks were not re-run in this closeout cycle. Prior responsive coverage (320px–1440px) remains as recorded in the Iteration 3 report; no new manual measurements are claimed here.

## Manual checks (not performed)

The following were **not** performed and are **not** marked as passed:

- Physical-device and browser-matrix checks (Chrome, Firefox, Safari, Edge; mobile/tablet/desktop).
- Screen-reader checks (NVDA, VoiceOver, TalkBack).
- Zoom checks (up to 200%/400% text spacing).
- Keyboard-only navigation beyond automated coverage.
- Production mobile Lighthouse (F-02).

## Open findings

- **F-02:** Production mobile Lighthouse ≥ 90; compression/caching verification. Status: OPEN.
- **F-03:** Static-host RSC prefetch and clean URL behavior. Status: OPEN.

## QA limitations

- This is a documentation-only closeout; no tests, builds, browser matrices, or exploratory audits were rerun.
- Manual device, browser, and screen-reader checks remain unperformed.
- The latest Batch 3 production build hung; a fresh release-candidate build is still required.
- Owner acceptance for Iteration 4 is still pending.

## Owner decision

Iteration 4 owner acceptance is **pending**. Production release is **NOT approved** pending F-02, F-03, manual checks, and a successful fresh release-candidate build.

## Recommendation

Grant **conditional acceptance** for Iteration 4, contingent on:

1. A successful fresh release-candidate production build.
2. Resolution/verification of F-02 and F-03 on the hosting target.
3. Completion of the manual device, browser, and screen-reader checks.
4. Final owner sign-off.

No deployment or production-release approval is granted by this report.
