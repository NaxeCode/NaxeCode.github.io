'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

interface UseSectionTrackingOptions {
  /**
   * Section ID for tracking (e.g., 'about', 'projects')
   */
  sectionId: string;

  /**
   * Percentage of section that must be visible to trigger
   * @default 0.5 (50%)
   */
  threshold?: number;
}

/**
 * useSectionTracking Hook
 *
 * Tracks when a section becomes visible in the viewport.
 * Fires a 'section_view' event once per session per section.
 *
 * @example
 * useSectionTracking({ sectionId: 'projects', threshold: 0.5 });
 */
export function useSectionTracking(options: UseSectionTrackingOptions) {
  const { sectionId, threshold = 0.5 } = options;
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackEvent('section_view', {
              section_id: sectionId,
              page: window.location.pathname,
            });
            hasTracked.current = true;
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [sectionId, threshold]);
}
