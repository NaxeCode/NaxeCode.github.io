import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://naxe.dev/',
	integrations: [
		mdx(),
		sitemap(),
		preact({
			devtools: true,
		}),
		tailwind({
			applyBaseStyles: false,
		}),
	],
});
