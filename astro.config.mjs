import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://naxecode.github.io/',
	integrations: [
		mdx(),
		sitemap(),
		react(),
		tailwind({
			applyBaseStyles: false,
		}),
	],
});
