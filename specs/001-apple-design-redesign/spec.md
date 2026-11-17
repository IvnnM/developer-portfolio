# Feature Specification: Apple Design Redesign of the Developer Portfolio

**Feature Branch**: `feat/apple-design-redesign`

**Created**: 2026-11-10

**Status**: Draft

**Input**: User description: "Redesign the entire developer portfolio using Apple's design approach — fluid spring-based motion, refined typography, translucent depth, and restraint — while preserving all existing content and pages."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE.
-->

### User Story 1 - Apple-style intro animation on the homepage (Priority: P1)

The homepage hero entrance animates with a spring-based motion (not a CSS keyframe), aligned with Apple's "Designing Fluid Interfaces" approach. The intro animation plays on first load and is interruptible; all motion respects `prefers-reduced-motion`.

**Why this priority**: The homepage hero is the first impression of the portfolio and is the highest-impact Apple-style change. This was the original motivation for the redesign request.

**Independent Test**: Open the homepage in a browser, observe the hero entrance use spring motion (not a CSS keyframe), note the spring feel, then enable `prefers-reduced-motion` and confirm no motion plays.

**Acceptance Scenarios**:

1. **Given** the homepage loads, **When** the page animates, **Then** the hero entrance uses a spring-based animation (from the presentation value) and not a CSS `@keyframes` entrance.
2. **Given** the hero is mid-animation, **When** the user interacts, **Then** the animation is interruptible and the page responds instantly.
3. **Given** `prefers-reduced-motion` is active, **When** the page loads, **Then** no spring motion runs — content appears without entrance animation.
4. **Given** a slower device, **When** the page loads, **Then** the animation still runs smoothly (no jank, no forced layout).

---

### User Story 2 - Refined typography system (Priority: P1)

Apply Apple's typography rules across the portfolio: tighter tracking on large text, optical sizing, refined leading, and a clear typographic scale. The Geist font (already loaded) is retained but used according to Apple's typographic guidelines.

**Why this priority**: Typography is the dominant visual signal on a text-forward portfolio; refined typography is the highest-visibility Apple-design improvement.

**Independent Test**: Inspect the homepage and case study pages, compare tracking/leading/scale against Apple's typography rules, and confirm the hierarchy is clear.

**Acceptance Scenarios**:

1. **Given** the homepage renders, **When** large headings are displayed, **Then** they use tighter tracking (negative tracking on short text) and refined leading (1.0–1.05 scale).
2. **Given** body text renders, **When** it is displayed, **Then** it uses refined leading (1.5–1.6) and neutral tracking.
3. **Given** labels/captions render, **When** they are displayed, **Then** they use a mono or small-caps treatment with tighter tracking (consistent with the Apple label style).
4. **Given** the font is loading, **When** the page renders, **Then** there is no layout shift or flash of unstyled text.

---

### User Story 3 - Refined color and surfaces (Priority: P2)

Redesign the color/surface system for light and dark themes: refined, translucent-inspired surfaces, softer borders, restrained elevation, and a restrained accent color. The existing dark/light theme toggle is preserved and animates smoothly.

**Why this priority**: The surface/color system is the foundation of the visual redesign and affects every page.

**Independent Test**: Inspect the homepage and a project card in both light and dark themes, compare the surfaces, borders, and accents against Apple's design, and confirm the theme toggle animates the transition.

**Acceptance Scenarios**:

1. **Given** the portfolio renders, **When** it is in light mode, **Then** surfaces are refined with soft elevation, subtle borders, and a restrained accent.
2. **Given** the portfolio renders, **When** it is in dark mode, **Then** surfaces are refined with subtle depth, soft borders, and a restrained accent.
3. **Given** the visitor toggles the theme, **When** they toggle, **Then** the transition is smooth (a cross-fade or immediate swap without layout jump).
4. **Given** the visitor has not chosen a theme, **When** they open the site, **Then** it follows the OS color-scheme preference.

---

### User Story 4 - Motion system for all interactions (Priority: P2)

Replace CSS keyframe animations with a spring-based motion system for all interactive and entrance motion across the portfolio:
- hero entrance (US1)
- button/link press state (instant feedback on pointer-down)
- card hover elevation
- section reveals (staggered, interruptible)
- theme transition
- scroll-based reveals

**Why this priority**: Motion is the second-most-visible Apple-design signal and the skill's core concern (springs, interruptibility, velocity).

**Independent Test**: Interact with buttons, cards, and hero elements on every page, observe spring physics and instant feedback, and confirm animations are interruptible and respect `prefers-reduced-motion`.

**Acceptance Scenarios**:

1. **Given** a button is pressed, **When** the pointer-down event occurs, **Then** the button responds instantly on pointer-down (not on pointer-up).
2. **Given** a card is hovered, **When** the pointer hovers, **Then** the card responds with a spring-based elevation change.
3. **Given** the hero or a section reveal is animating, **When** the user scrolls or interacts, **Then** the animation is interruptible and the page remains responsive.
4. **Given** `prefers-reduced-motion` is active, **When** any animation would run, **Then** it is replaced with a no-motion equivalent (instant show).

---

### User Story 5 - Gesture and response improvements (Priority: P3)

Apply Apple's direct-manipulation principles to interactions:
- instant feedback on pointer-down
- spring-based transitions for any draggable or reorderable elements
- rubber-banding at scroll boundaries
- spatial consistency (same path in / exit)

**Why this priority**: These are the "feel" details that make the portfolio feel alive; lower priority than typography and motion, but make the finishing impression.

**Independent Test**: Scroll, tap, and interact with every interactive element on every page, confirm responsiveness and no jarring boundaries.

**Acceptance Scenarios**:

1. **Given** the user scrolls, **When** they reach a boundary, **Then** the page rubber-bands (progressive resistance) instead of stopping hard.
2. **Given** an interactive element is pressed, **When** the pointer goes down, **Then** it shows instant feedback before the pointer is released.
3. **Given** an element is dragged, **When** the pointer moves, **Then** it tracks 1:1 with the pointer and respects the grab offset.
4. **Given** the user scrolls to a section, **Then** the navigation reflects the current section (active link) and the path in/out is consistent.

---

### User Story 6 - Project and case study pages (Priority: P3)

Redesign the Projects page and the Inventory & Project Tracking System case study page with Apple-style spacing, typography, and motion, so the portfolio page presents a refined, magazine-like layout.

**Why this priority**: These pages carry the portfolio's main content; a refined layout improves readability and the portfolio's professional impression.

**Independent Test**: Open the Projects page and the case study page, inspect the typing, spacing, and motion, and confirm they follow Apple design rules.

**Acceptance Scenarios**:

1. **Given** the Projects page renders, **When** project cards are displayed, **Then** they use refined spacing, softer borders, and follow the Apple card style.
2. **Given** the case study page renders, **When** the case study sections are displayed, **Then** they use refined headings, generous whitespace, and follow the Apple typographic scale.
3. **Given** the visitor scrolls the case study page, **When** sections enter the viewport, **Then** their entrance motion is spring-based and interruptible.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The homepage hero entrance uses a spring-based animation (not a CSS `@keyframes` entrance).
- **FR-002**: All interactive elements (buttons, links, cards) provide instant feedback on pointer-down.
- **FR-003**: All entrance and transition animations are spring-based and interruptible.
- **FR-004**: All animations respect `prefers-reduced-motion` (no spring motion when reduced-motion is enabled).
- **FR-005**: The typography system applies Apple-style tracking, leading, and scale rules across all pages.
- **FR-006**: Light and dark theme surfaces are refined with soft elevation, softer borders, and restrained accent colors.
- **FR-007**: The theme toggle animates the theme transition smoothly.
- **FR-008**: The header/navigation reflects Apple's refined, minimal design with proper spacing.
- **FR-009**: The Projects page and case study page use Apple-style spacing and typography.
- **FR-010**: All existing content is preserved verbatim (no text, paragraph, or content deleted).
- **FR-011**: The app builds and tests pass (`npm run build`, `npm run lint`, `npm run test:unit`).

### Key Entities *(include if feature involves data)*

- **Motion system**: a shared motion/spring utility (no new npm dependency) that drives all entrance and interactive animations with spring physics.
- **Design tokens**: CSS custom properties (or Tailwind config) holding refined colors, surfaces, borders, and shadows for both light and dark themes.
- **Typography scale**: a refined type scale with Apple-style tracking and leading rules applied at each size.
- **Brand identity**: the portfolio identity (Ivan Medrano, full-stack developer, projects, experience) is preserved; only the presentation layer changes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The homepage hero entrance uses a spring-based animation, not a CSS keyframe, and is interruptible.
- **SC-002**: All entrance and transition animations respect `prefers-reduced-motion` (no motion when disabled).
- **SC-003**: Buttons and links provide instant pointer-down feedback on every page.
- **SC-004**: Typography applies Apple-style tracking (tighter on large text, neutral on body) and refined leading.
- **SC-005**: Light and dark theme surfaces are refined with soft elevation, softer borders, and restrained accents.
- **SC-006**: The header/navigation is refined and minimal.
- **SC-007**: The Projects page and case study page use Apple-style spacing and typography.
- **SC-008**: All existing content is preserved verbatim.
- **SC-009**: `npm run build`, `npm run lint`, and `npm run test:unit` all pass.
- **SC-010**: No new npm dependencies that are not justified (or zero new dependencies).

## Assumptions

- Apple Design is applied as a visual/restyling layer on top of the existing React + Next.js + Tailwind structure (no content changes).
- Spring motion uses a shared, dependency-free utility (or an existing one) so no new npm dependency is required.
- The Geist font is retained and used according to Apple's typographic rules (no font replacement required).
- The existing dark/light theme toggle is preserved and its transition is animated.
- The redesign is scoped to the presentation layer (CSS, components, motion); data and content layers are untouched.
- Typography, spacing, and color decisions are documented as Design Tokens so they can be adjusted in one place.
