'use client';

import { useEffect, useState } from 'react';

/**
 * useActiveSection Hook
 *
 * Tracks which section is currently in the viewport based on scroll position.
 * Used for highlighting the active navigation link.
 *
 * @param sectionIds - Array of section IDs to track (e.g., ['about', 'projects'])
 * @returns The ID of the currently active section
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Find the section that's most visible in the viewport
    const handleScroll = () => {
      // Get all section elements
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      if (sections.length === 0) return;

      // Find which section is most visible
      let maxVisibility = 0;
      let mostVisibleSection: string | null = null;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(viewportHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Weight sections near the top of the viewport more heavily
        const centerOffset = Math.abs((rect.top + rect.bottom) / 2 - viewportHeight / 2);
        const weight = visibleHeight - centerOffset * 0.1;

        if (weight > maxVisibility) {
          maxVisibility = weight;
          mostVisibleSection = section.id;
        }
      });

      setActiveSection(mostVisibleSection);
    };

    // Initial check
    handleScroll();

    // Throttle scroll handler for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds]);

  return activeSection;
}
