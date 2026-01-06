'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * PageTransition Component
 *
 * Implements View Transitions API for smooth page transitions
 * with progressive enhancement and reduced motion support.
 *
 * Works with Next.js App Router and static export.
 */

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Skip if pathname hasn't changed (initial mount)
    if (previousPathname.current === pathname) {
      return;
    }

    // Skip if browser doesn't support View Transitions API
    if (!document.startViewTransition) {
      previousPathname.current = pathname;
      return;
    }

    // Skip if user prefers reduced motion
    if (prefersReducedMotion()) {
      previousPathname.current = pathname;
      return;
    }

    // Trigger view transition
    // Note: The actual DOM update happens automatically via React
    // We just need to wrap it in startViewTransition
    document.startViewTransition(() => {
      // React will handle the DOM update
      // This callback is synchronous, but the transition is async
      previousPathname.current = pathname;
    });

  }, [pathname]);

  return <>{children}</>;
}
