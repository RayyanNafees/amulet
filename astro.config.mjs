import { defineConfig } from "astro/config";
import astrolace from "@matthiesenxyz/astrolace";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
      astrolace(),
      preact({ compat: true, devtools: true }),
      tailwind(),
	],

  prefetch: {
      prefetchAll: true,
      defaultStrategy: "viewport",
	},

  output: "server",
  adapter: vercel(),
});