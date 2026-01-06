'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

function SearchParamsHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrl = useRef<string>('');

  useEffect(() => {
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // Prevent double-firing by checking if we already tracked this exact URL
    if (lastTrackedUrl.current === url) {
      return;
    }

    // Debounce to prevent rapid successive calls
    const timeoutId = setTimeout(() => {
      trackPageView(url);
      lastTrackedUrl.current = url;
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsClient() {
  return (
    <Suspense fallback={null}>
      <SearchParamsHandler />
    </Suspense>
  );
}
