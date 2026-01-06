/**
 * Motion Design System
 * Centralized motion tokens for consistent animations across the portfolio
 */

// Duration tokens (in milliseconds)
export const durations = {
  instant: 0,
  fast: 150,
  base: 220,
  slow: 350,
  slower: 500,
  slowest: 800,
} as const;

// Easing curves (cubic-bezier values for CSS/Framer Motion)
export const easings = {
  // Snappy, responsive feel for interactions
  snappy: [0.4, 0, 0.2, 1] as const,

  // Smooth, professional transitions
  smooth: [0.25, 0.1, 0.25, 1] as const,

  // Bounce effect for playful interactions (use sparingly)
  bounce: [0.68, -0.55, 0.27, 1.55] as const,

  // Ease out for entrances
  easeOut: [0, 0, 0.2, 1] as const,

  // Ease in for exits
  easeIn: [0.4, 0, 1, 1] as const,
} as const;

// Distance tokens (in pixels)
export const distances = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
} as const;

// Framer Motion Variants
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: distances.lg
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.base / 1000,
      ease: easings.easeOut,
    }
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.base / 1000,
      ease: easings.smooth,
    }
  },
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.base / 1000,
      ease: easings.easeOut,
    }
  },
};

// Stagger container variants
export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: distances.md
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.base / 1000,
      ease: easings.easeOut,
    }
  },
};

// Page transition variants
export const pageTransition = {
  initial: {
    opacity: 0,
    y: distances.md,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.base / 1000,
      ease: easings.smooth,
    }
  },
  exit: {
    opacity: 0,
    y: -distances.sm,
    transition: {
      duration: durations.fast / 1000,
      ease: easings.easeIn,
    }
  },
};

// Hover interactions
export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: durations.fast / 1000,
      ease: easings.snappy,
    }
  },
};

export const hoverLift = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: {
      duration: durations.fast / 1000,
      ease: easings.snappy,
    }
  },
};

// Utility: Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility: Get safe animation duration (0 if reduced motion)
export const getSafeDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

// Utility: Get safe variants (no animation if reduced motion)
export const getSafeVariants = <T extends Record<string, any>>(
  variants: T,
  instantKey: keyof T = 'visible' as keyof T
): T => {
  if (!prefersReducedMotion()) return variants;

  // Return object with all states pointing to the instant/visible state
  const instantState = variants[instantKey];
  const safeVariants: Record<string, any> = {};

  Object.keys(variants).forEach((key) => {
    safeVariants[key] = { ...instantState, transition: { duration: 0 } };
  });

  return safeVariants as T;
};
