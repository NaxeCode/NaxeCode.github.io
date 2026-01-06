'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

interface UseInViewOptions {
  /**
   * Percentage of element that must be visible to trigger
   * @default 0.2 (20%)
   */
  threshold?: number;

  /**
   * Only trigger once (don't re-trigger on scroll up)
   * @default true
   */
  triggerOnce?: boolean;

  /**
   * Root margin (offset from viewport edges)
   * @default '0px'
   */
  rootMargin?: string;
}

/**
 * useInView Hook
 *
 * Detects when an element enters the viewport using Intersection Observer.
 * Respects prefers-reduced-motion by immediately returning true.
 *
 * @example
 * const { ref, inView } = useInView({ threshold: 0.3 });
 * <div ref={ref}>
 *   {inView && <Animation />}
 * </div>
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const {
    threshold = 0.2,
    triggerOnce = true,
    rootMargin = '0px',
  } = options;

  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion()) {
      setInView(true);
      setHasTriggered(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // If already triggered and triggerOnce is true, don't observe
    if (hasTriggered && triggerOnce) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) {
              setHasTriggered(true);
            }
          } else if (!triggerOnce) {
            setInView(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, inView };
}
