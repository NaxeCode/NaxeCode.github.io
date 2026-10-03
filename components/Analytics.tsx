'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { AnalyticsClient } from './AnalyticsClient';

// App policy pages promise no tracking, so Google Analytics never loads there.
const UNTRACKED_PREFIXES = ['/aura-gainz/'];

export function Analytics() {
  const pathname = usePathname() ?? '';
  if (UNTRACKED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <AnalyticsClient />
    </>
  );
}
