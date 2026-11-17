## Principles

### III. Preserve content verbatim
The portfolio's content (profile, experience, projects, case study, skills) is the portfolio's core value and MUST NOT be changed, truncated, or reworded by the redesign. The redesign changes only the presentation layer (layout, typography, colour, motion), not the content.

### IV. Apple-style visual design
Apply Apple's interface design principles (WWDC 2018 *Designing Fluid Interfaces*):
- Refined typography: tighter tracking on large text, optical sizing, refined leading
- Restrained colour and surfaces: soft elevation, softer borders, restrained accent
- Fluid motion: spring-based, interruptible, velocity-aware (see `skills/apple-design/SKILL.md`)
- Direct manipulation: instant pointer-down feedback, rubber-banding at scroll edges
- Reduced motion: `prefers-reduced-motion` disables all entrance and transition motion

### V. Spec-driven development
Development follows the SDD process documented in `.specify/`: spec → plan → tasks → implement, with the constitution as the governing principle set.

## Technology and Delivery Constraints

- Stack: Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript
- Hosting: static export (`output: "export"`) or served statically — no server-side data
- Theme: light/dark toggle with persistence, follows OS `prefers-color-scheme` by default
- Motion: spring-based (no CSS `@keyframes` for gesture/entrance animations), no new npm dependencies unless justified

## Development Workflow

- Spec Kit order MUST be followed: constitution → specify → clarify → plan → tasks → implement → analyze
- Every user story MUST be independently testable and validated before the next begins
- Any deviation from the constitution MUST be recorded as a Design Token or documented difference, not silently ignored
