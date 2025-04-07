import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import metaTags from 'astro-meta-tags';

// https://astro.build/config
export default defineConfig({
  integrations: [metaTags()],
  adapter: netlify(),
  site: "https://evaaaaawu-tech-blog.netlify.app",
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-tw'],
    routing: {
      strategy: 'prefix', // Creates URLs like /en/about, /zh-tw/about
      prefixDefaultLocale: true // Include prefix for default locale too for consistency
    },
    fallback: {
      'zh-tw': 'en' // Fallback to English if Chinese translation isn't available
    }
  }
});