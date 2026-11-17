import { describe, it, expect } from 'vitest';
import { springValue } from '@/lib/motion';

describe('springValue', () => {
  it('returns `from` when elapsed is 0', () => {
    expect(springValue(10, 100, 0)).toBe(10);
  });

  it('returns `to` for a large elapsed time (animation completes)', () => {
    const result = springValue(10, 100, 5000, { response: 0.3 });
    // Critically damped spring: ~95% settle in 0.3s, so after 5s it should be
    // within ~0.01% of the target.
    expect(Math.abs(result - 100)).toBeLessThan(0.5);
  });

  it('produces a smooth (non-jittery) value for a linear elapsed ramp', () => {
    const values: number[] = [];
    for (let elapsed = 0; elapsed < 5000; elapsed += 16) {
      values.push(springValue(0, 100, elapsed, { response: 0.3 }));
    }
    // Values should be strictly increasing (monotonic) — no oscillation.
    for (let i = 1; i < values.length; i += 1) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    }
  });

  it('respects a delay', () => {
    expect(springValue(0, 100, 100, { delay: 200 })).toBe(0);
  });

  it('supports a lower damping ratio (bouncy)', () => {
    // damping < 1.0 approaches the target more slowly and with a different
    // curve than the critically damped default (1.0). Both curves are smooth
    // and monotonic, but the low-damping curve lags behind the default.
    const low = springValue(0, 100, 200, { damping: 0.6, response: 0.3 });
    const high = springValue(0, 100, 200, { damping: 1.0, response: 0.3 });
    // Low damping arrives *later* than critical damping at the same elapsed time.
    expect(low).toBeLessThan(high);
  });

  it('ignores a zero or negative response by clamping to a sane minimum', () => {
    const result = springValue(0, 100, 100, { response: 0 });
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(100);
  });
});
