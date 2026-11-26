import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const host = 'https://naxe.dev';
let browser, server, local;
before(async () => {
  server = spawn('python3', ['scripts/serve-preview.py', '--no-browser'], { stdio: ['ignore', 'pipe', 'ignore'] });
  const [message] = await once(server.stdout, 'data');
  local = new URL(String(message).match(/http:\/\/\S+/)[0]).origin;
  browser = await chromium.launch({ channel: process.env.PORTFOLIO_CHROME_CHANNEL || undefined });
});
after(async () => { await browser?.close(); server?.kill(); });

async function visit(t, { signals = {}, javaScriptEnabled = true, blockTag = false, tagFile } = {}) {
  const context = await browser.newContext({ javaScriptEnabled });
  t.after(() => context.close());
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  const calls = [], google = [], hits = [];
  await context.exposeBinding('recordTagCommand', (_, args) => calls.push(args));
  await context.addInitScript(signals => {
    for (const [key, value] of Object.entries(signals)) {
      Object.defineProperty(navigator, key, { value });
    }
  }, signals);
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (['naxe.dev', 'naxecode.github.io', 'preview.example', 'localhost'].includes(url.hostname)) {
      const response = await route.fetch({ url: local + url.pathname + url.search });
      return route.fulfill({ response });
    }
    google.push(url.href);
    if (url.hostname === 'www.googletagmanager.com' && url.pathname === '/gtag/js') {
      if (blockTag) return route.abort();
      if (tagFile) return route.fulfill({ contentType: 'application/javascript', body: await readFile(tagFile) });
      // Exercise the real site's integration at the Google tag boundary without sending visits.
      return route.fulfill({ contentType: 'application/javascript', body: `
        const observe = entry => window.recordTagCommand(Array.from(entry));
        window.dataLayer.forEach(observe);
        const push = window.dataLayer.push.bind(window.dataLayer);
        window.dataLayer.push = function(entry) { observe(entry); return push(entry) };
      ` });
    }
    if (tagFile && url.hostname.endsWith('.google-analytics.com') && url.pathname.endsWith('/collect')) {
      for (const body of (route.request().postData() || '').split(/\r?\n/)) {
        hits.push(Object.fromEntries([...url.searchParams, ...new URLSearchParams(body)]));
      }
      return route.fulfill({ status: 204, body: '' });
    }
    return route.abort();
  });
  const event = (name) => calls.filter(([cmd, type]) => cmd === 'event' && type === name);
  async function wait(name, count = 1) {
    for (let i = 0; i < 100; i++) {
      if (event(name).length >= count) return event(name).at(-1)[2];
      await new Promise(resolve => setTimeout(resolve, 30));
    }
    assert.fail('Missing ' + name + ' (' + count + ')');
  }
  return { page, google, calls, event, wait, hits };
}

const consent = page => page.getByRole('checkbox', { name: 'Allow Google Analytics' });
const campaign = '?utm_source=ats&utm_medium=resume_pdf&utm_campaign=applied_ai&utm_content=v1_project1';
test('shares an approved campaign through the case study and working lab while keeping raw URLs private', async t => {
  const { page, calls, wait, event, google } = await visit(t);
  await page.goto(host + '/' + campaign + '&token=DO_NOT_COLLECT#projects');
  await page.waitForLoadState('networkidle');
  assert.equal(google.length, 0, 'Google requires an opt-in');
  await consent(page).check();
  const home = await wait('page_view');
  assert.equal(home.page_location, host + '/');
  assert.equal(home.campaign_source, 'ats');
  assert.equal(home.campaign_content, 'v1_project1');
  await page.locator('a[href="/projects/cosmic-digest/"]').first().click();
  const study = await wait('case_study_view');
  assert.equal(study.project_slug, 'cosmic-digest');
  assert.equal(study.campaign_medium, 'resume_pdf');
  assert.equal(event('page_view').length, 2);
  await page.locator('a.lab-link').first().click();
  const lab = await wait('lab_open');
  assert.match(page.url(), /#model\/north-hold\/reversed$/);
  assert.equal(lab.campaign_name, 'applied_ai');
  await page.locator('[data-view="corrections"]').click();
  assert.equal((await wait('lab_interaction')).action, 'inspect_corrections');
  assert.equal(event('page_view').length, 3);
  assert.doesNotMatch(JSON.stringify(calls), /DO_NOT_COLLECT|utm_source|#model|north-hold/);
  assert.equal(calls.filter(([cmd]) => cmd === 'config').every(([, , p]) => p.send_page_view === false), true);
});

const controls = [
  ['frame-triage', '#baseline', 'compare_detectors'],
  ['photon-trail', '.pt-import', 'apply_import'],
  ['cosmic-digest', '[data-view="corrections"]', 'inspect_corrections'],
  ['shallow-water', '#step', 'step_simulation'],
  ['rigid-body', '#step', 'step_simulation'],
  ['schedule-rehearsal', '#actions button', 'rehearse_migration'],
  ['lmms-session', '#add', 'edit_score'],
];
for (const [slug, selector, action] of controls) {
  test('distinguishes opening ' + slug + ' from deliberately using a control', async t => {
    const { page, event, wait } = await visit(t);
    await page.goto(host + '/labs/' + slug + '/' + campaign + '&private=DO_NOT_COLLECT');
    await consent(page).check();
    assert.equal((await wait('lab_open')).project_slug, slug === 'lmms-session' ? 'lmms-nebula' : slug);
    assert.equal(event('lab_interaction').length, 0);
    const control = page.locator(selector).first();
    await control.click();
    await control.click();
    const result = await wait('lab_interaction');
    assert.equal(result.action, action);
    assert.equal(event('lab_interaction').length, 1);
    assert.equal(event('page_view').length, 1);
  });
}

test('suppresses tracking on excluded origins, paths and privacy signals', async t => {
  for (const signals of [{}, { doNotTrack: '1' }, { globalPrivacyControl: true }, { cookieEnabled: false }]) {
    const { page, google } = await visit(t, { signals });
    const urls = Object.keys(signals).length ? [host + '/'] : [
      'https://preview.example/', 'http://localhost/', 'https://naxe.dev:8443/', host + '/aura-gainz/support/',
      host + '/aura-gainz/privacy/', host + '/server-backups/privacy.html', host + '/unknown/private/',
    ];
    for (const url of urls) {
      await page.goto(url);
      await page.evaluate(() => localStorage.setItem('portfolio-analytics-consent', 'granted'));
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(google.length, 0, 'Unexpected external request on ' + url);
    }
  }
});

test('invalid campaign fields and mailto destinations stay out of analytics', async t => {
  const { page, calls, wait } = await visit(t);
  await page.goto(host + '/contact/?utm_source=DO_NOT_COLLECT&utm_medium=resume_pdf&utm_campaign=applied_ai&utm_content=v1_project1');
  await consent(page).check();
  const view = await wait('page_view');
  assert.equal(view.campaign_medium, undefined);
  await page.locator('a[href^="mailto:"]').click();
  assert.equal((await wait('contact_click')).action, 'email');
  assert.doesNotMatch(JSON.stringify(calls), /DO_NOT_COLLECT|mailto:|@naxe/);
  await consent(page).uncheck();
  await page.waitForFunction(() => !document.querySelector('iframe[data-portfolio-collector]'));
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await consent(page).isChecked(), false);
});

test('native links keep their destination when JavaScript is disabled', async t => {
  const { page, google } = await visit(t, { javaScriptEnabled: false });
  await page.goto(host + '/projects/cosmic-digest/');
  await page.locator('a.lab-link').first().click();
  assert.match(page.url(), /\/labs\/cosmic-digest\/#model\/north-hold\/reversed$/);
  await page.getByRole('link', { name: 'Project notes' }).click();
  assert.match(page.url(), /\/projects\/cosmic-digest\/$/);
  assert.equal(google.length, 0);
});

test('records GitHub source intent and a real tour play without link text or URLs', async t => {
  const { page, calls, wait } = await visit(t);
  await page.goto(host + '/projects/cosmic-digest/');
  await consent(page).check();
  await wait('case_study_view');
  // Open a real source anchor in a new tab so the case study stays available.
  const source = page.locator('.source-list a[href^="https://github.com/"]').first();
  await source.evaluate(a => { a.target = '_blank' });
  await source.click();
  assert.equal((await wait('github_click')).project_slug, 'cosmic-digest');
  await page.getByRole('link', { name: 'All work' }).click();
  const video = page.locator('#tour video');
  await video.evaluate(async v => { v.muted = true; await v.play() });
  await wait('tour_start');
  assert.doesNotMatch(JSON.stringify(calls), /github\.com\/NaxeCode|link_url|link_text/);
});

test('revoking consent in another tab stops events and discards the former campaign', async t => {
  const { page, wait, event } = await visit(t);
  await page.goto(host + '/labs/shallow-water/' + campaign);
  await consent(page).check();
  await wait('lab_open');
  const other = await page.context().newPage();
  await other.goto(host + '/contact/');
  await consent(other).uncheck();
  await page.waitForFunction(() => !document.querySelector('iframe[data-portfolio-collector]'));
  await page.locator('#step').click();
  assert.equal(event('lab_interaction').length, 0);
  assert.equal(await page.evaluate(() => sessionStorage.getItem('portfolio-campaign-v1')), null);
});

test('recognizes the production Pages hostname and keeps Kruu referral fragments usable', async t => {
  const { page, wait } = await visit(t);
  await page.goto('https://naxecode.github.io/?utm_source=github&utm_medium=readme&utm_campaign=portfolio&utm_content=v1_project1#kruu');
  assert.equal(await page.locator(':target').textContent(), 'Kruu');
  await consent(page).check();
  const fields = await wait('page_view');
  assert.equal(fields.campaign_source, 'github');
  assert.equal(fields.page_location, 'https://naxecode.github.io/');
});

test('honors the same measurement ID override on a Next page and a mirrored lab', async t => {
  const { page, google, wait } = await visit(t);
  await page.goto(host + '/projects/photon-trail/');
  await consent(page).check();
  await wait('case_study_view');
  await page.locator('a.lab-link').click();
  await wait('lab_open');
  assert.deepEqual(google.map(url => new URL(url).searchParams.get('id')),
    Array(2).fill(process.env.NEXT_PUBLIC_GA_ID || 'G-BPXEKM7YBC'));
});

test('retains a known referring case path and counts a lab reference click without sending its URL', async t => {
  const { page, wait, calls } = await visit(t);
  await page.goto(host + '/labs/shallow-water/', {
    referer: host + '/projects/shallow-water/?token=DO_NOT_COLLECT#private-fragment',
  });
  await consent(page).check();
  const open = await wait('lab_open');
  assert.equal(open.page_referrer, host + '/projects/shallow-water/');
  await page.locator('details').filter({ has: page.locator('a[href^="https://www.clawpack.org/"]') }).locator('summary').click();
  const reference = page.locator('a[href^="https://www.clawpack.org/"]');
  await reference.evaluate(a => { a.target = '_blank'; });
  await reference.click();
  assert.equal((await wait('source_click')).action, 'reference');
  assert.doesNotMatch(JSON.stringify(calls), /DO_NOT_COLLECT|private-fragment|clawpack.org/);
});

test('a blocked Google tag leaves the simulation and return link usable', async t => {
  const { page, google } = await visit(t, { blockTag: true });
  await page.goto(host + '/labs/shallow-water/');
  await consent(page).check();
  await page.locator('#restart').click();
  const before = await page.locator('#timeLabel').textContent();
  await page.locator('#step').click();
  assert.notEqual(await page.locator('#timeLabel').textContent(), before);
  await page.getByRole('link', { name: 'Project notes' }).click();
  assert.equal(page.url(), host + '/projects/shallow-water/');
  assert.ok(google.some(url => url.startsWith('https://www.googletagmanager.com/')));
});

test('the real Google tag encodes only the approved campaign and sanitized page context', {
  skip: !process.env.PORTFOLIO_GA_TAG_FILE,
}, async t => {
  const { page, hits, google } = await visit(t, { tagFile: process.env.PORTFOLIO_GA_TAG_FILE });
  await page.goto(host + '/labs/cosmic-digest/' + campaign + '&gclid=DO_NOT_COLLECT#corrections', {
    referer: 'https://www.linkedin.com/private/DO_NOT_COLLECT?email=DO_NOT_COLLECT',
  });
  await consent(page).check();
  await page.locator('[data-view="corrections"]').click();
  const deadline = Date.now() + 15_000;
  while (!hits.some(hit => hit.en === 'lab_interaction') && Date.now() < deadline) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.deepEqual(hits.map(hit => hit.en), ['page_view', 'lab_open', 'lab_interaction']);
  for (const hit of hits) {
    assert.equal(hit.tid, process.env.NEXT_PUBLIC_GA_ID || 'G-BPXEKM7YBC');
    assert.equal(hit.dl, host + '/labs/cosmic-digest/');
    assert.equal(hit.dr, 'https://linkedin.com/');
    assert.deepEqual([hit.cs, hit.cm, hit.cn, hit.cc], ['ats', 'resume_pdf', 'applied_ai', 'v1_project1']);
  }
  assert.doesNotMatch(JSON.stringify([hits, google]), /DO_NOT_COLLECT|#corrections/);
});

test('a restored lab counts as another visit and can record its own first interaction', async t => {
  const { page, wait, event } = await visit(t);
  await page.goto(host + '/labs/rigid-body/');
  await consent(page).check();
  await page.locator('#step').click();
  await wait('lab_interaction');
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
  await wait('lab_open', 2);
  await page.locator('#step').click();
  await wait('lab_interaction', 2);
  assert.equal(event('page_view').length, 2);
});

test('the collector restricts networking to the tag and GA collection endpoints', async t => {
  const { page, wait, google } = await visit(t);
  await page.goto(host + '/projects/');
  await consent(page).check();
  await wait('page_view');
  const frame = page.frames().find(frame => frame.url() === host + '/analytics/collector.html');
  await frame.evaluate(async () => {
    try { await fetch('https://www.googletagmanager.com/td?diagnostic=DO_NOT_COLLECT'); } catch {}
  });
  assert.ok(google.every(url => !url.includes('DO_NOT_COLLECT')));
});
