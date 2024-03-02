import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify";
import serviceWorker from "astrojs-service-worker";

// https://astro.build/config
export default defineConfig({
  integrations: [preact() , serviceWorker()],
  output: "server",
  adapter: netlify()
});