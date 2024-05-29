import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon(), mdx()],
  image: {
    domains: ["astro.build"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  site: "https://astro-pico.netlify.app",
});
