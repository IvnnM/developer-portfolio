# Apple Design skill for the developer-portfolio project

**Purpose**: Apply Apple's interface design approach (WWDC 2018 *Designing Fluid Interfaces*) to the developer-portfolio Next.js + React + Tailwind project. Loaded from https://github.com/emilkowalski/skills/blob/main/skills/apple-design/SKILL.md.

**How to use**: 
- For **motion**: use springs (damping 1.0 default, ~0.8 for momentum flicks), interruptible, velocity-aware, from presentation values. Prefer spring over CSS keyframes for gestures.
- For **typography**: tighter tracking on large text (-0.02em), body tracking near 0, optical sizing, refined leading (1.0–1.05 scale on headings).
- For **surfaces**: light/dark with translucent depth, softer borders, restrained accent colors.
- For **interaction**: instant pointer-down feedback, rubber-banding at scroll edges, 1:1 drag tracking, spatial consistency (same path in/exit).

**Key values**:
| Pattern | Apple value |
|---|---|
| Default UI spring | critically damped, no overshoot; `damping 1.0`, `response 0.3–0.4` |
| Momentum/flick spring | under-damped, slight bounce; `damping ~0.8` |
| Gesture→spring velocity | hand off release velocity (normalized if needed) |
| Interrupt | start from presentation (live) value |
| Reduced motion | cross-fade, not slide/spring (`@media (prefers-reduced-motion)`) |

**Projects this applies to**: developer-portfolio (Next.js 16, React 19, Tailwind CSS 4).
