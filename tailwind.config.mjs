/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				sm: '640px',
				// => @media (min-width: 640px) { ... }

				md: '768px',
				// => @media (min-width: 768px) { ... }

				lg: '1024px',
				// => @media (min-width: 1024px) { ... }

				xl: '1280px',
				// => @media (min-width: 1280px) { ... }

				'2xl': '1400px',
				// => @media (min-width: 1536px) { ... }
			},
			fontFamily: {
				cascadia: ['CascadiaCode', 'monospace'],
				poppins: ['Poppins', 'sans-serif'],
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
