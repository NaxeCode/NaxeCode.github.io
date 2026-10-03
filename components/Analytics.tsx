'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { AnalyticsClient } from './AnalyticsClient';

// App policy pages promise no tracking. They are only reached from outside
// (App Store, email), so a fresh load never includes Google Analytics.
const UNTRACKED_PREFIXES = ['/aura-gainz/'];

export function Analytics() {
  const pathname = usePathname() ?? '';
  const untracked = UNTRACKED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // Leave untracked pages with a full page load. A client-side transition
  // would let GA load in this document, and its history listener would then
  // report these pages on Back/Forward.
  useEffect(() => {
    if (!untracked) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(url.href);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [untracked]);

  if (untracked) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <AnalyticsClient />
    </>
  );
}
