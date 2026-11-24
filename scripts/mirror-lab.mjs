import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Only public artifacts listed here may cross from a source checkout into the site.
const labs = {
  'frame-triage': {
    project: 'frame-triage',
    files: ['index.html', 'style.css', 'app.mjs', 'analysis.mjs'],
    assets: /^[-a-z0-9]+\.(json|png)$/,
  },
  'photon-trail': { project: 'photon-trail', files: ['index.html'] },
  'cosmic-digest': { project: 'cosmic-digest', files: ['index.html', 'report.json'] },
  'lmms-session': {
    project: 'lmms-nebula',
    files: [
      'index.html',
      'session.css',
      'session.js',
      'score.js',
      'synth.js',
      'low-tide-relay.ogg',
      'low-tide-relay.mmp',
      'low-tide-relay.jsonl',
    ],
  },
};

const [slug, input, upstream, licenseFile] = process.argv.slice(2);
if (
  !Object.hasOwn(labs, slug) ||
  !input ||
  !licenseFile ||
  !upstream?.startsWith('https://github.com/')
) {
  throw new Error(
    'Usage: node scripts/mirror-lab.mjs <lab> <artifact directory> <public GitHub source URL> <source repository license>',
  );
}
const lab = labs[slug];
const directory = resolve(input);
const publicLabs = fileURLToPath(new URL('../public/labs/', import.meta.url));
const target = join(publicLabs, slug);
if (directory === target) throw new Error('Use the original source export as input.');
const paths = [...lab.files];
if (lab.assets) {
  const assets = await readdir(join(directory, 'assets'));
  paths.push(
    ...assets
      .filter((name) => lab.assets.test(name))
      .sort()
      .map((name) => 'assets/' + name),
  );
}

await mkdir(publicLabs, { recursive: true });
const staging = await mkdtemp(join(publicLabs, '.sync-'));
const next = join(staging, 'next');
const previous = join(staging, 'previous');
const records = {};
try {
  for (const name of paths) {
    const data = await readFile(join(directory, name));
    records[name] = createHash('sha256').update(data).digest('hex');
    let output = data;
    if (name === 'index.html') {
      const nav = `<div class="naxe-lab-context" role="navigation" aria-label="Portfolio navigation"><a href="/">Aladdin Ali</a><span aria-hidden="true">/</span><a href="/projects/">Engineering work</a><a class="naxe-case-link" href="/projects/${lab.project}/">Project notes <span aria-hidden="true">↗</span></a></div>`;
      const html = data.toString('utf8');
      if (
        !/<\/head>/i.test(html) ||
        !/<body(?:\s[^>]*)?>/i.test(html) ||
        html.includes('naxe-lab-context')
      ) {
        throw new Error(`Unexpected source document in ${basename(directory)}`);
      }
      output = html
        .replace(/<\/head>/i, '<link rel="stylesheet" href="../portfolio-nav.css"></head>')
        .replace(/<body(?:\s[^>]*)?>/i, (tag) => tag + nav);
    }
    await mkdir(dirname(join(next, name)), { recursive: true });
    await writeFile(join(next, name), output);
  }
  const license = await readFile(licenseFile);
  await writeFile(join(next, 'UPSTREAM-LICENSE.txt'), license);
  await writeFile(
    join(next, 'provenance.json'),
    JSON.stringify(
      {
        upstream,
        modifications: 'The portfolio adds navigation and its stylesheet to index.html.',
        license: 'UPSTREAM-LICENSE.txt',
        sourceSha256: records,
      },
      null,
      2,
    ) + '\n',
  );
  const exists = await stat(target).then(
    () => true,
    (err) => {
      if (err.code === 'ENOENT') return false;
      throw err;
    },
  );
  if (exists) await rename(target, previous);
  try {
    await rename(next, target);
  } catch (error) {
    if (exists) await rename(previous, target);
    throw error;
  }
} finally {
  await rm(staging, { recursive: true, force: true });
}
console.log(`Mirrored ${paths.length} public artifacts for ${slug}.`);
