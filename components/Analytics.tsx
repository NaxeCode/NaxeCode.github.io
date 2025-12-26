import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { AnalyticsClient } from './AnalyticsClient';

export function Analytics() {
  return (
    <>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <AnalyticsClient />
    </>
  );
}
