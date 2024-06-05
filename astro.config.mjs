import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-pico.netlify.app",
  integrations: [react(), icon(), mdx(), sitemap()],
  image: {
    domains: ["astro.build"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
});
