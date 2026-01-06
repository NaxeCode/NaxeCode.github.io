declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-BPXEKM7YBC";

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

export const trackProjectClick = (projectSlug: string, projectTitle: string) => {
  trackEvent("project_click", {
    project_slug: projectSlug,
    project_title: projectTitle,
    page: window.location.pathname,
  });
};

export const trackOutboundLink = (linkUrl: string, linkText: string) => {
  trackEvent("outbound_link", {
    link_url: linkUrl,
    link_text: linkText,
    page: window.location.pathname,
  });
};

// Track page views for client-side navigation
export const trackPageView = (path: string, title?: string) => {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title ?? document.title,
  });
};
