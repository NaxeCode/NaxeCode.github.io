export const UTM_CAMPAIGN = "career-portfolio-2026";

export const withOutboundUtm = (url: string, content: string) => {
  if (!url) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const params = parsed.searchParams;

    if (params.has("utm_source") || params.has("utm_medium") || params.has("utm_campaign")) {
      return url;
    }

    params.set("utm_source", "portfolio");
    params.set("utm_medium", "site");
    params.set("utm_campaign", UTM_CAMPAIGN);
    params.set("utm_content", content);
    parsed.search = params.toString();
    return parsed.toString();
  } catch {
    return url;
  }
};
