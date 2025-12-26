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
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent("button_click", {
    button_name: buttonName,
    location: location || window.location.pathname,
  });
};

// Track link clicks
export const trackLinkClick = (linkUrl: string, linkText: string) => {
  trackEvent("link_click", {
    link_url: linkUrl,
    link_text: linkText,
    page: window.location.pathname,
  });
};

// Track form submissions
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent("form_submit", {
    form_name: formName,
    success: success,
    page: window.location.pathname,
  });
};

// Track project views
export const trackProjectView = (projectSlug: string, projectTitle: string) => {
  trackEvent("project_view", {
    project_slug: projectSlug,
    project_title: projectTitle,
  });
};

// Track filter usage
export const trackFilterChange = (filterType: string, filterValue: string) => {
  trackEvent("filter_change", {
    filter_type: filterType,
    filter_value: filterValue,
    page: window.location.pathname,
  });
};

// Track navigation
export const trackNavigation = (destination: string) => {
  trackEvent("navigation_click", {
    destination: destination,
    from: window.location.pathname,
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
