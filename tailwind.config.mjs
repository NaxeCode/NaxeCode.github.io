/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				cascadia: ['CascadiaCode', 'monospace'],
			},
			colors: {
				bg: '#020a17',
				text: '#d9e7fc',
				accent: '#f1892a',
				primary: '#74a6f6',
				secondary: '#940a28',
				'accent-dark': '#000d8a',
				'gray-light': '#4e4e4e',
			},
		},
	},
	plugins: [],
};
