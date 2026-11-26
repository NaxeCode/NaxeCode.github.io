'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function notifyNavigation() {
  window.dispatchEvent(new Event('portfolio:navigation'));
}

export function Analytics() {
  const path = usePathname();
  useEffect(notifyNavigation, [path]);
  if (!path || path.startsWith('/aura-gainz/') || path.startsWith('/server-backups/')) return null;
  return <Script src="/analytics/portfolio.js" strategy="afterInteractive" onReady={notifyNavigation} />;
}
