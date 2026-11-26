// Keep Google's document listeners away from portfolio links, inputs and uploads.
(() => {
  'use strict';
  if (parent === window || !['https://naxe.dev', 'https://naxecode.github.io'].includes(location.origin)) return;
  try {
    if (parent.location.origin !== location.origin || !frameElement?.hasAttribute('data-portfolio-collector')) return;
  } catch { return; }

  const id = document.currentScript.dataset.measurementId;
  const disableKey = 'ga-disable-' + id;
  let initialized = false;
  window.dataLayer = [];
  function gtag() { window.dataLayer.push(arguments); }

  window.portfolioStop = () => { window[disableKey] = true; };
  window.portfolioCollect = (name, fields) => {
    if (window[disableKey]) return;
    if (!initialized) {
      initialized = true;
      gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied',
        ad_personalization: 'denied', analytics_storage: 'granted' });
      gtag('js', new Date());
    }
    if (name === 'page_view') {
      const settings = { ...fields, send_page_view: false, allow_google_signals: false,
        allow_ad_personalization_signals: false, cookie_domain: location.hostname };
      gtag('config', id, settings);
    }
    gtag('event', name, { ...fields, send_to: id });
    if (!document.getElementById('google-tag')) {
      const script = document.createElement('script');
      script.id = 'google-tag';
      script.async = true;
      script.referrerPolicy = 'no-referrer';
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.append(script);
    }
  };
})();
