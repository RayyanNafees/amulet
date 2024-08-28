/** @type {Config} */
/** @typedef {import('tailwindcss').Config} Config */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
};