import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://evaaaaawu.com",
  output: "static",
  integrations: [tailwind()],
});
