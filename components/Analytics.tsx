import { GoogleAnalytics } from '@next/third-parties/google';

export function Analytics() {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_TRACKING_ID) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_TRACKING_ID} />;
}
