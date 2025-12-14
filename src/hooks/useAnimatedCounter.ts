import { useEffect, useState } from 'react';

interface UseAnimatedCounterOptions {
  target: number;
  duration?: number; // milliseconds
  startDelay?: number; // milliseconds
  enabled?: boolean; // whether to start animation
  precision?: number; // decimal places to keep (0 for ints)
}

/**
 * Animated counter hook that counts from 0 to target value
 * with dynamic speed: fast start, easing near the end
 */
export const useAnimatedCounter = ({
  target,
  duration = 2000,
  startDelay = 0,
  enabled = true,
  precision = 0,
}: UseAnimatedCounterOptions): number => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setCount(0);
      setHasStarted(false);
      return;
    }

    // Delay before starting animation
    const delayTimer = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(delayTimer);
  }, [enabled, startDelay]);

  useEffect(() => {
    if (!hasStarted || !enabled) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = target;

    // Easing function: easeOutCubic for smooth deceleration
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing for smooth deceleration
      const easedProgress = easeOutCubic(progress);

      // Calculate current value
      const rawValue = startValue + (endValue - startValue) * easedProgress;
      const currentValue =
        precision > 0
          ? parseFloat(rawValue.toFixed(precision))
          : Math.floor(rawValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure we end exactly at target
        setCount(parseFloat(endValue.toFixed(precision)));
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, enabled, target, duration]);

  return count;
};
