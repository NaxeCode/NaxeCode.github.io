// Runs in the portfolio and each independently exported lab. Only the collector loads Google.
(() => {
  'use strict';
  const portfolio = ['https://naxe.dev', 'https://naxecode.github.io'].includes(location.origin);
  const publicDemos = {
    'https://watchlist.naxe.dev': { path: '/demo/', project: 'stargazers-cosmic-watchlist', action: 'apply_filter',
      collector: '/demo/analytics-collector.html', cookies: '/demo' },
    'https://stargazers-stella.github.io': { path: '/cosmic-ui/', project: 'cosmic-ui', action: 'compare_themes',
      collector: '/cosmic-ui/analytics-collector.html', cookies: '/cosmic-ui' },
  };
  const demo = publicDemos[location.origin];
  if (window.top !== window || (!portfolio && !demo)) return;

  const consentKey = 'portfolio-analytics-consent';
  const cohortKey = 'portfolio-campaign-v1';
  const labs = {
    'frame-triage': 'frame-triage', 'photon-trail': 'photon-trail', 'cosmic-digest': 'cosmic-digest',
    'lmms-session': 'lmms-nebula', 'shallow-water': 'shallow-water', 'rigid-body': 'rigid-body',
    'schedule-rehearsal': 'schedule-rehearsal',
  };
  const projectSlugs = [...Object.values(labs), 'ground', 'stargazers-cosmic-watchlist', 'activitymux', 'minnen'];
  const sources = ['ats', 'recruiter', 'linkedin', 'github', 'x', 'referral', 'print'];
  const media = ['resume_pdf', 'profile', 'readme', 'repo_homepage', 'post', 'direct_message', 'email', 'qr'];
  const campaigns = ['applied_ai', 'dotnet', 'portfolio'];
  const contentLabels = ['profile', 'readme', 'repo_homepage', 'portfolio', 'tour', 'v1_cover', 'v1_portfolio',
    ...Array.from({ length: 7 }, (_, i) => 'v1_project' + (i + 1)), ...projectSlugs, ...Object.keys(labs), 'cosmic-ui'];
  const controls = {
    'frame-triage': [['click', '#baseline, #learned', 'compare_detectors'], ['change', '#scene', 'change_scene']],
    'photon-trail': [['click', '.pt-import', 'apply_import'], ['click', '.pt-interrupt', 'interrupt_import']],
    'cosmic-digest': [['click', '[data-view="corrections"]', 'inspect_corrections'],
      ['change', '#correction-trial', 'compare_corrections'], ['change', '#model-packet', 'compare_packets']],
    'lmms-session': [['click', '#add, #remove', 'edit_score'], ['click', '#play', 'play_score']],
    'shallow-water': [['click', '#step', 'step_simulation'], ['change', '#mesh, #release', 'change_simulation']],
    'rigid-body': [['click', '#step', 'step_simulation'], ['change', '[name="axis"]', 'change_axis'],
      ['click', '#play', 'release_rotor']],
    'schedule-rehearsal': [['click', '#actions button:first-child', 'rehearse_migration'],
      ['change', '#policy', 'compare_policy'], ['change', '#scenario', 'change_scenario']],
  };

  function routeInfo(pathname = location.pathname) {
    const path = pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');
    if (demo) return path === demo.path ? { ...demo, publicDemo: true } : null;
    if (path === '/activitymux/') return { path, project: 'activitymux', publicDemo: true, action: 'open_release' };
    if (['/', '/about/', '/contact/', '/projects/'].includes(path)) return { path };
    const [, group, slug, tail] = path.split('/');
    if (tail !== '' || path !== '/' + group + '/' + slug + '/') return null;
    if (group === 'labs' && Object.hasOwn(labs, slug)) return { path, lab: slug, project: labs[slug] };
    if (group === 'projects' && projectSlugs.includes(slug)) return { path, project: slug };
    return null;
  }

  function browserAllowsAnalytics() {
    return navigator.cookieEnabled && !navigator.globalPrivacyControl &&
      !['1', 'yes'].includes(navigator.doNotTrack || window.doNotTrack);
  }

  function granted() {
    try { return browserAllowsAnalytics() && localStorage.getItem(consentKey) === 'granted'; }
    catch { return false; }
  }

  function validCohort(data) {
    return data && sources.includes(data.campaign_source) && media.includes(data.campaign_medium) &&
      campaigns.includes(data.campaign_name) && contentLabels.includes(data.campaign_content);
  }

  function campaign() {
    const params = new URLSearchParams(location.search);
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
    const supplied = keys.some(key => params.has(key));
    let data;
    if (supplied && keys.every(key => params.getAll(key).length === 1)) {
      data = { campaign_source: params.get('utm_source'), campaign_medium: params.get('utm_medium'),
        campaign_name: params.get('utm_campaign'), campaign_content: params.get('utm_content') };
    }
    try {
      if (!supplied) {
        const saved = JSON.parse(sessionStorage.getItem(cohortKey));
        if (saved?.expires > Date.now()) data = saved.data;
      }
      if (validCohort(data)) {
        // Copy only these fields, including when reading browser storage.
        const { campaign_source, campaign_medium, campaign_name, campaign_content } = data;
        const clean = { campaign_source, campaign_medium, campaign_name, campaign_content };
        sessionStorage.setItem(cohortKey, JSON.stringify({ data: clean, expires: Date.now() + 30 * 60_000 }));
        return clean;
      }
      sessionStorage.removeItem(cohortKey);
    } catch { /* An approved landing can still be measured with session storage disabled. */ }
    return supplied && validCohort(data) ? data : {};
  }

  function referringPage() {
    // A referrer subdomain may itself encode an account or organization. Keep public sources only.
    try {
      const url = new URL(document.referrer);
      if (url.origin === location.origin) {
        const previous = routeInfo(url.pathname);
        return previous ? url.origin + previous.path : '';
      }
      const domains = ['github.com', 'linkedin.com', 'google.com', 'bing.com', 'x.com', 't.co', 'naxe.dev', 'naxecode.github.io'];
      const domain = domains.find(d => url.hostname === d || url.hostname === 'www.' + d);
      return domain ? 'https://' + domain + '/' : '';
    } catch { return ''; }
  }

  let frame, route, fields, previousPath;
  let pending = [], usedLab = false, playedTour = false;
  function flush() {
    if (!frame?.contentWindow?.portfolioCollect || !granted() || !routeInfo()) return;
    for (const entry of pending.splice(0)) frame.contentWindow.portfolioCollect(...entry);
  }
  function emit(name, action) {
    if (!granted() || !route || routeInfo()?.path !== route.path) return;
    const params = { ...fields };
    if (route.project) params.project_slug = route.project;
    if (action) params.action = action;
    pending.push([name, params]);
    flush();
  }
  function stop() {
    // Disable transport before the frame unloads (including automatic engagement events).
    frame?.contentWindow?.portfolioStop?.();
    frame?.remove();
    frame = route = fields = previousPath = undefined;
    pending = [];
  }

  function refresh() {
    let next = routeInfo();
    // Only a marked public demo may initialize the tag. Watchlist omits the marker for signed-in visitors.
    if (next?.publicDemo && !document.querySelector('[data-public-project="' + next.project + '"]')) next = null;
    const allowed = granted();
    for (const label of document.querySelectorAll('[data-analytics-preference]')) {
      label.hidden = !next || !browserAllowsAnalytics();
      label.querySelector('input').checked = allowed;
    }
    if (!next || !allowed) { stop(); return; }
    if (next.path === route?.path) return;
    previousPath = route?.path;
    route = next;
    fields = { page_location: location.origin + route.path, page_referrer: previousPath ? location.origin + previousPath : referringPage(),
      page_title: route.project || ({ '/': 'Portfolio', '/projects/': 'Engineering work', '/contact/': 'Contact', '/about/': 'About' })[route.path],
      ...campaign() };
    usedLab = playedTour = false;
    if (!frame) {
      frame = document.createElement('iframe');
      frame.dataset.portfolioCollector = '';
      // A display:none frame has zero document height. GA interprets that as a completed scroll.
      frame.style.cssText = 'position:fixed;left:0;bottom:0;width:1px;height:1px;opacity:0;border:0;pointer-events:none';
      frame.setAttribute('aria-hidden', 'true');
      frame.tabIndex = -1;
      frame.title = 'Portfolio analytics';
      frame.referrerPolicy = 'no-referrer';
      frame.addEventListener('load', flush);
      frame.src = route.collector || '/analytics/collector.html';
      document.body.append(frame);
    }
    emit('page_view');
    if (route.publicDemo) emit('project_site_view');
    else if (route.lab) emit('lab_open');
    else if (route.project) emit('case_study_view');
  }

  function changeConsent(allow) {
    try {
      localStorage.setItem(consentKey, allow ? 'granted' : 'denied');
      if (!allow) {
        sessionStorage.removeItem(cohortKey);
        for (const pair of document.cookie.split(';')) {
          const name = pair.trim().split('=')[0];
          if (name !== '_ga' && !/^_ga_[A-Z0-9]+$/.test(name)) continue;
          const remove = name + '=; Max-Age=0; Path=' + (demo?.cookies || '/');
          document.cookie = remove;
          document.cookie = remove + '; Domain=' + location.hostname;
        }
      }
    } catch { /* Unavailable consent storage leaves tracking off. */ }
    refresh();
  }

  function interaction(event) {
    if (!event.isTrusted || !(event.target instanceof Element)) return;
    const target = event.target;
    if (event.type === 'change' && target.matches('[data-analytics-preference] input')) {
      changeConsent(target.checked);
      return;
    }
    if (!route || !granted() || routeInfo()?.path !== route.path) return;
    if (!usedLab && route.publicDemo && event.type === 'click' && target.closest('[data-demo-action="' + route.action + '"]')) {
      usedLab = true;
      emit('demo_interaction', route.action);
    }
    if (!usedLab && route.lab) {
      const match = controls[route.lab].find(([type, selector]) => type === event.type && target.closest(selector));
      if (match) { usedLab = true; emit('lab_interaction', match[2]); }
    }
    if (event.type === 'play' && !playedTour && target.matches('#tour video')) {
      playedTour = true;
      emit('tour_start');
    }
    if (event.type !== 'click' && !(event.type === 'auxclick' && event.button === 1)) return;
    const link = target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.protocol === 'mailto:') emit('contact_click', 'email');
    else if (url.protocol === 'https:') {
      if (url.hostname === 'github.com') emit('github_click', 'github');
      else if (['www.linkedin.com', 'linkedin.com', 'x.com', 'twitter.com'].includes(url.hostname)) {
        emit('contact_click', url.hostname.endsWith('linkedin.com') ? 'linkedin' : 'x');
      } else if (url.origin !== location.origin && (route.lab || link.closest('.source-list'))) emit('source_click', 'reference');
    }
  }

  for (const type of ['click', 'auxclick', 'change', 'play']) document.addEventListener(type, interaction, true);
  window.addEventListener('portfolio:navigation', refresh);
  window.addEventListener('portfolio:leave', stop);
  window.addEventListener('pageshow', event => {
    if (event.persisted) route = undefined;
    refresh();
  });
  window.addEventListener('storage', event => {
    if (event.key !== consentKey && event.key !== null) return;
    if (!granted()) {
      try { sessionStorage.removeItem(cohortKey); } catch { /* Storage is unavailable. */ }
    }
    refresh();
  });
  refresh();
})();
