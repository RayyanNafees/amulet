/** @type {Config} */
/** @typedef {import('tailwindcss').Config} Config */

import {addIconSelectors} from '@iconify/tailwind'

export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms"), addIconSelectors(['mdi']),require('rippleui')],
	rippleui: {
		removeThemes: ["dark", ],
	},
};
