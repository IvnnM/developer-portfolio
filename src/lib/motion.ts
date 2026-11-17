/**
 * Spring motion utility — Apple-style, critically damped spring (no external
 * dependencies). Uses exponential-decay physics (m*x'' + c*x' + k*(x - target) = 0)
 * with damping ratio = 1.0 (critically damped: no overshoot, smooth settle).
 *
 * The "response" parameter controls how quickly the value reaches the target
 * (in seconds). The natural frequency omega = 4 / response gives ~95% settle
 * in `response` seconds — matching Apple's 0.3–0.4s UI response baseline.
 *
 * Usage:
 *   import { springValue, animateSpring } from '@/lib/motion';
 *
 *   // Pure value (unit-testable)
 *   const v = springValue(0, 100, 300, { response: 0.3 });
 *
 *   // Element animation (JS-driven, interruptible)
 *   const el = document.querySelector('.hero');
 *   animateSpring(el, (v) => (el.style.transform = `translateY(${v}px)`), 0, 20, {
 *     response: 0.6,  // slower for a brand hero
 *   });
 */

export type SpringOptions = {
  /** 1.0 = critically damped (no overshoot, smooth settle). <1.0 = bouncy. */
  damping?: number;
  /** Seconds to reach target (~95% settle). Default 0.3 (Apple baseline). */
  response?: number;
  /** Delay before the animation starts (ms). */
  delay?: number;
  /** Called when the animation completes. */
  done?: () => void;
};

/**
 * Compute the eased value for a spring animation at elapsed time (in ms).
 * Pure function — no DOM, no side effects. Unit-testable.
 */
export function springValue(
  from: number,
  to: number,
  elapsed: number,
  options: SpringOptions = {},
): number {
  const damping = options.damping ?? 1.0;
  const response = options.response ?? 0.3;
  const delay = options.delay ?? 0;

  const t = Math.max(0, (elapsed - delay) / 1000);
  if (t <= 0) return from;

  // Natural frequency: critically damped reach ~95% in `response` seconds.
  const omega = 4 / Math.max(response, 0.05);

  // Critically damped exponential decay
  const damped = Math.exp(-damping * omega * t);
  const eased = 1 - damped;
  return from + (to - from) * eased;
}

/**
 * Run a spring animation on a DOM element, driving a caller-supplied style.
 *
 * @param element - the target element
 * @param styleSetter - called every frame with the current eased value
 * @param from - starting value
 * @param to - target value
 * @param options - spring options
 */
export function animateSpring(
  element: HTMLElement,
  styleSetter: (value: number) => void,
  from: number,
  to: number,
  options: SpringOptions = {},
): void {
  const { delay = 0, done, damping = 1.0, response = 0.3 } = options;
  const startTime = performance.now() + delay;
  const duration = response * 1000;

  const step = (now: number) => {
    const elapsed = now - startTime;
    styleSetter(springValue(from, to, elapsed, { damping, response }));
    if (elapsed < duration) {
      requestAnimationFrame(step);
    } else {
      if (done) done();
    }
  };

  requestAnimationFrame(step);
}

/**
 * Cancel a running spring animation on an element (interruptibility).
 * Call this when the user grabs a moving element mid-flight.
 */
export function cancelSpring(animationId: number): void {
  cancelAnimationFrame(animationId);
}
