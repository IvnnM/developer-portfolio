---
description: "Task list for Apple Design Redesign of the developer portfolio"
---

# Tasks: Apple Design Redesign of the Developer Portfolio

**Input**: Design documents from `/specs/001-apple-design-redesign/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: This feature is purely a presentation-layer redesign with no new data or logic. Unit tests are limited to the new motion utility (no dependencies, pure functions). Full verification is done via `npm run build`, `npm run lint`, and manual/browser verification of the design system. E2E tests are NOT required for this presentation-only change.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story the task belongs to (US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root (Next.js App Router)
- **Web app**: `src/` at repository root

---

## Phase 0: Setup (Shared Infrastructure)

**Purpose**: Project initialization and verification that the spec and plan are in place.

- [x] T001 Verify spec (`specs/001-apple-design-redesign/spec.md`) and plan (`specs/001-apple-design-redesign/plan.md`) are approved and present.
- [x] T002 Confirm speckit initialization in this project (`.specify/` and `.claude/skills/` present).
- [x] T003 Create `specs/001-apple-design-redesign/checklists/requirements.md` (specification quality checklist) following the speckit checklist template.

**Checkpoint**: Spec, plan, and speckit ready.

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 [P] Create `src/lib/motion.ts` — spring motion utility using Web Animations API (WAAPI). No dependencies. Must be interruptible, velocity-aware, and respect `prefers-reduced-motion`.
- [x] T005 [P] Create `src/app/globals.css` design tokens: color (background, foreground, accent), surface, border, shadow, and typography (size, tracking, leading, font-family, weight).
- [x] T006 [P] Write unit test for `src/lib/motion.ts` (`tests/unit/motion.test.ts`): verify spring animation starts, is interruptible, and respects reduced-motion flag.

**Checkpoint**: Foundation ready — motion utility and design tokens exist; unit test passes.

---

## User Story 1 — Apple-style homepage hero intro animation (Priority: P1) 🎯 MVP

**Goal**: The homepage hero entrance uses a spring-based animation (not a CSS keyframe), is interruptible, and respects `prefers-reduced-motion`.

**Independent Test**: Open the homepage in a browser, observe the hero entrance use spring motion (not a CSS keyframe), note the spring feel. Then enable `prefers-reduced-motion` and confirm no motion plays. Verify the hero remains responsive during the animation.

### Tests for User Story 1

> **NOTE: Write the test first, ensure it fails before implementation**

- [ ] T007 [P] [US1] Write unit test `tests/unit/motion-hero.test.ts` verifying the homepage hero entrance uses a spring (not CSS keyframes) and respects `prefers-reduced-motion`.
- [ ] T008 [P] [US1] Write Playwright E2E test `tests/e2e/hero.spec.ts` verifying the hero entrance animation and the reduced-motion behaviour on the homepage.

### Implementation for User Story 1

- [ ] T009 [US1] Modify `src/app/page.tsx` — replace `motion-safe:animate-hero-reveal` CSS keyframe with a spring entrance using `src/lib/motion.ts`.
- [ ] T010 [US1] Verify the hero entrance is interruptible (no blocking the main thread).
- [ ] T011 [US1] Verify `prefers-reduced-motion` respects the reduced-motion flag (no animation plays).

**Checkpoint**: US1 functional and testable independently.

---

## User Story 2 — Refined typography system (Priority: P1)

**Goal**: Apply Apple's typography rules across the portfolio: tighter tracking on large text, optical sizing, refined leading, and a clear typographic scale. Geist font retained.

**Independent Test**: Inspect the homepage hero and case study headings, compare tracking/leading/scale against Apple's typography rules, and confirm the hierarchy is clear.

### Tests for User Story 2

> **NOTE: Write the test first, ensure it fails before implementation**

- [ ] T012 [P] [US2] Write unit test `tests/unit/typography.test.ts` verifying the design tokens define Apple-style tracking and leading for headings and body.
- [ ] T013 [P] [US2] Write a visual spot-check (manual or E2E) verifying heading tracking is tighter and body leading is refined.

### Implementation for User Story 2

- [ ] T014 [US2] Define Apple-style typography tokens in `src/app/globals.css` (heading tracking `-0.02em to -0.03em`, leading `1.0–1.05`; body leading `1.5–1.6`, tracking `0`).
- [ ] T015 [US2] Update `src/components/projects/ProjectCard.tsx` and case-study page headings to use the refined typography tokens.
- [ ] T016 [US2] Verify all headings use tighter tracking and refined leading.

**Checkpoint**: US2 complete — typography system applied and verified.

---

## User Story 3 — Refined color and surfaces (Priority: P2)

**Goal**: Redesign the color/surface system for light and dark themes: refined, translucent-inspired surfaces, softer borders, restrained elevation, and a restrained accent. The existing dark/light theme toggle is preserved and animates smoothly.

**Independent Test**: Inspect the homepage and a project card in both light and dark themes, compare the surfaces, borders, and accents against Apple's design, and confirm the theme toggle animates the transition.

### Tests for User Story 3

> **NOTE: Write the test first, ensure it fails before implementation**

- [ ] T017 [P] [US3] Write a visual verification (manual or Playwright) confirming light and dark theme surfaces use soft elevation, softer borders, and restrained accent.
- [ ] T018 [P] [US3] Write a Playwright test verifying the theme toggle animates the transition smoothly.

### Implementation for User Story 3

- [ ] T019 [US3] Update `src/app/globals.css` design tokens for light/dark surfaces (soft elevation, softer borders, restrained accent).
- [ ] T020 [US3] Restyle `src/components/projects/ProjectCard.tsx` (Apple-style card with soft elevation and hover).
- [ ] T021 [US3] Restyle `src/components/theme/ThemeToggle.tsx` (restyled for Apple feel, transition preserved).
- [ ] T022 [US3] Verify light and dark modes render with refined surfaces (both via visual inspection and E2E if applicable).

**Checkpoint**: US3 complete — refined colours and surfaces applied.

---

## User Story 4 — Motion system for all interactions (Priority: P2)

**Goal**: Replace CSS keyframe animations with a spring-based motion system for all interactive and entrance motion across the portfolio: hero entrance, button/link press, card hover, section reveals, theme transition.

**Independent Test**: Interact with buttons, cards, and hero elements on every page, observe spring physics and instant feedback, and confirm animations are interruptible and respect `prefers-reduced-motion`.

### Tests for User Story 4

> **NOTE: Write the test first, ensure it fails before implementation**

- [ ] T023 [P] [US4] Write unit test `tests/unit/motion-interactions.test.ts` verifying spring-based press/hover/theme-transition animations are interruptible and respect reduced-motion.
- [ ] T024 [P] [US4] Write Playwright E2E tests `tests/e2e/motion.spec.ts` verifying instant pointer-down feedback, spring card hover, and theme transition.

### Implementation for User Story 4

- [ ] T025 [US4] Apply spring press feedback to all buttons and links (instant `onPointerDown` + spring transition).
- [ ] T026 [US4] Apply spring hover elevation to project cards (`ProjectCard.tsx`).
- [ ] T027 [US4] Apply spring cross-fade to the theme toggle transition.
- [ ] T028 [US4] Verify all motion is interruptible and respects `prefers-reduced-motion`.

**Checkpoint**: US4 complete — spring motion system applied to all interactive elements.

---

## User Story 5 — Gesture and response improvements (Priority: P3)

**Goal**: Apply Apple's direct-manipulation principles: instant pointer-down feedback, rubber-banding at scroll boundaries, 1:1 drag tracking.

**Independent Test**: Scroll, tap, and interact with every interactive element on every page, confirm responsiveness, no jarring boundaries, and instant feedback.

### Tests for User Story 5

> **NOTE: Write the test first, ensure it fails before implementation**

- [ ] T029 [P] [US5] Write a manual/visual verification plan for rubber-banding and pointer-down feedback.
- [ ] T030 [P] [US5] Write a Playwright E2E test `tests/e2e/gesture.spec.ts` verifying rubber-banding at scroll boundaries and instant pointer-down feedback.

### Implementation for User Story 5

- [ ] T031 [US5] Implement rubber-banding at scroll boundaries (progressive resistance, `prefers-reduced-motion` aware).
- [ ] T032 [US5] Refine `src/components/layout/SiteHeader.tsx` (reduced noise, refined top bar, instant hover feedback).
- [ ] T033 [US5] Refine `src/components/layout/SiteFooter.tsx` (reduced noise).
- [ ] T034 [US5] Verify pointer-down feedback is instant on all interactive elements.

**Checkpoint**: US5 complete — gesture and response improvements applied.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and cross-cutting checks.

- [ ] T035 [P] Update `src/components/layout/SkipLink.tsx` to use Apple-style styling (refined appearance, no motion).
- [ ] T036 [P] Verify all pages use the refined typography tokens consistently (spot-check: about, contact, experience, projects, resume, case study).
- [ ] T037 [P] Verify all pages load and render correctly in both light and dark themes (visual inspection + E2E).
- [ ] T038 [P] Verify `prefers-reduced-motion` across all pages (no spring motion plays, contentfully visible).
- [ ] T039 [P] Run `npm run build`, `npm run lint`, and `npm run test:unit` — all must pass.
- [ ] T040 [P] Manual visual review of every page against Apple's design principles (typography, surfaces, motion, gesture).

**Checkpoint**: All user stories complete, verified, and content unchanged.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 0)**: No dependencies. Start immediately.
- **Foundational (Phase 1)**: Depends on Setup. BLOCKS all user stories.
- **User Stories (US1–US5)**: All depend on Foundational. US1 and US2 (P1) have highest priority.
- **Polish (Phase N)**: Depends on all desired user stories.

### User Story Dependencies

- **US1 (P1)**: After Foundational. Highest priority (headline change).
- **US2 (P1)**: After Foundational. Highest priority (typography system).
- **US3 (P2)**: After Foundational. Depends on design tokens.
- **US4 (P2)**: After Foundational. Depends on motion utility (US1 foundation).
- **US5 (P3)**: After Foundational. Cross-cutting polish.

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Implementation before verification.
- Owner review confirms each story.

### Parallel Opportunities

- T004, T005, T006 (foundational) run in parallel.
- T007, T008 (US1 tests) run in parallel.
- T012, T013 (US2 tests) run in parallel.
- T017, T018 (US3 tests) run in parallel.
- T023, T024 (US4 tests) run in parallel.
- T029, T030 (US5 tests) run in parallel.

---

## Implementation Strategy

### MVP First (US1 + US2, P1)

1. Complete Phase 0 (Setup) and Phase 1 (Foundational — motion utility + design tokens).
2. Complete US1 (homepage hero spring) and US2 (typography).
3. **STOP and VALIDATE**: homepage hero and typography verified; build + lint + test pass.
4. Deploy to Vercel as a first preview.

### Incremental Delivery

1. Foundation (motion utility + design tokens).
2. US1 (homepage hero spring) → deploy.
3. US2 (typography) → deploy.
4. US3 (refined colour/surfaces) → deploy.
5. US4 (motion system) → deploy.
6. US5 (gesture details) → deploy.
7. Polish & verification → final.

### With an AI agent (this session)

Run one phase per session. After each phase, run `npm run build`, `npm run lint`, `npm run test:unit`, then review the pages and tick the parity checklist.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps each task to its user story for traceability
- Tests must fail before implementation (RED-GREEN-REFACTOR)
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same-file conflicts, cross-story dependencies that break independence
- Content in `src/data/portfolio.ts` MUST NOT be changed (constitution Principle III)
- No new npm dependencies unless justified and approved
