'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { AnalyticsClient } from './AnalyticsClient';

// App policy pages promise no tracking, so Google Analytics never loads there.
const UNTRACKED_PREFIXES = ['/aura-gainz/'];

export function Analytics() {
  const pathname = usePathname() ?? '';
  const untracked = UNTRACKED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // If GA already loaded on another page, client-side navigation back here
  // would still send hits. Google's opt-out flag stops them until we leave.
  useEffect(() => {
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = untracked;
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
