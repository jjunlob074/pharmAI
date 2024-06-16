import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import node from '@astrojs/node';
import db from "@astrojs/db";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-moon-landing.netlify.app/",
  integrations: [tailwind(), icon(), db(), mdx()],
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