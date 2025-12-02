import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import metaTags from 'astro-meta-tags';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkFixBoldColon } from './src/plugins/remark-fix-bold-colon.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [metaTags()],
  output: 'static',
  adapter: netlify({
    edgeMiddleware: true
  }),
  site: "https://evaaaaawu.com/",
  // trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-tw'],
    routing: {
      strategy: 'prefix', // Creates URLs like /about, /zh-tw/about
      prefixDefaultLocale: false // English doesn't need /en/ prefix
    },
  },
  markdown: {
    remarkPlugins: [remarkFixBoldColon, remarkMath],
    rehypePlugins: [rehypeKatex],
    smartypants: false,
  },
});