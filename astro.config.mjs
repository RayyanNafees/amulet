import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";
import serviceWorker from "astrojs-service-worker";
import UnoCSS from 'unocss/astro';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), serviceWorker(), UnoCSS()],
  output: "server",
  adapter: netlify()
});