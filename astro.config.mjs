import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import webVitals from '@astrojs/web-vitals';

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
	output: hybrid,
	site: 'https://naxe.dev/',
	integrations: [
		mdx(),
		sitemap(),
		preact({
			devtools: true,
		}),
		webVitals(),
		db(),
	],
});
