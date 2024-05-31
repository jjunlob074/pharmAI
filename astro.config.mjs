import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import node from '@astrojs/node';

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-moon-landing.netlify.app/",
  integrations: [tailwind(), icon(), db()],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  },
  output: 'server',
  adapter: node({
    mode: 'standalone'
  })
});
