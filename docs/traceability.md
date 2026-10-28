# Traceability — Iteration 3

## Task register

| Task | Deliverable | Verification | Status |
|---|---|---|---|
| T3-01 | About and Education | Content tests and QA | Verified |
| T3-02 | Five Skills categories | Content tests and QA | Verified |
| T3-03 | Experience timeline | Ordering/content tests | Verified |
| T3-04 | Projects gallery | Gallery tests and QA | Verified |
| T3-05 | Detailed case study | Case-study tests and QA | Verified |
| T3-06 | Temporary visuals | Placeholder tests and QA | Verified, temporary |
| T3-07 | Quality verification | Final QA report | Partially verified |
| T3-08 | Audit and acceptance | Report and owner decision | Conditionally accepted |

## Outstanding-risk register

| Risk | Description | Owner | Target date |
|---|---|---|---|
| F-02 | Production mobile Lighthouse ≥ 90; compression/caching verification | TBD | TBD |
| F-03 | Static-host RSC prefetch and clean URL behavior | TBD | TBD |
| Manual a11y | Screen-reader and physical-device testing | TBD | TBD |
| Browser/zoom | Safari/Firefox and zoom testing | TBD | TBD |
| Placeholders | Contact/Résumé content placeholders | TBD | TBD |
| Visuals | Replacement of temporary project visuals | TBD | TBD |

## Status notes

- Owner conditional acceptance: 28 October 2026.
- Production release: NOT approved.
- Owners and target dates: TBD (not yet assigned).
## Iteration 4

### Requirements register

| ID | Requirement | Verification | Status |
|---|---|---|---|
| FR4-001 | Contact route presents public contact methods (email, GitHub, LinkedIn). | Contact component tests (`src/app/contact/page.test.tsx`) | Verified |
| FR4-002 | Email can be copied to the clipboard with success/error status feedback. | Contact component tests | Verified |
| FR4-003 | External profile links open in a new tab with safe `rel` attributes. | Contact component tests | Verified |
| FR4-004 | Résumé route presents approved professional summary, experience, skills, and education. | Résumé component tests (`src/app/resume/page.test.tsx`) | Verified |
| FR4-005 | Résumé route provides a download link for the approved public PDF with correct attributes. | Résumé component tests | Verified |
| NFR4-001 | Accessibility semantics and no private phone data. | Automated axe/semantic assertions; manual screen-reader/device checks pending | Partially verified |
| NFR4-002 | Static-export compatibility and shared responsive content shell. | Link crawl (0 broken / 218); fresh release-candidate build pending | Partially verified |

### Task register (Iteration 4)

| Task | Deliverable | Verification | Status |
|---|---|---|---|
| T4-01 | Contact route implementation | Contact tests | Verified |
| T4-02 | Copy-to-clipboard email | Contact tests | Verified |
| T4-03 | External profile links (GitHub, LinkedIn) | Contact tests | Verified |
| T4-04 | Web résumé content sections | Résumé tests | Verified |
| T4-05 | Public PDF download link and asset | Résumé tests + PDF asset checks | Verified |
| T4-06 | Accessibility verification | Automated axe/semantics; manual checks pending | Partially verified |
| T4-07 | Static-export and responsive-shell verification | Link crawl passed; fresh RC build pending | Partially verified |
| T4-08 | QA closeout and documentation | `docs/qa/iteration-4-report.md` | Completed |

### Verification evidence

- Tests: 120/120 passing.
- Lint: passed.
- Static-export internal-link crawl: 0 broken links across 218 checked.
- PDF checks: `/Ivan_Medrano_CV_Public.pdf` exists; `%PDF-` header, `%%EOF` trailer, size > 1,000 bytes, contains `/Type /Page`.
- Batch 2: previously reported successful production build.
- Batch 3: latest build hung; root cause unconfirmed; fresh release-candidate build required.

### Status notes (Iteration 4)

- F-02 and F-03 remain OPEN.
- Manual device, browser, and screen-reader checks not performed.
- Iteration 4 owner acceptance pending.
- No deployment or production-release approval.
