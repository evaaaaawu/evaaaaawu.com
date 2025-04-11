import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_Ccd8h_Ip.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/en/about.astro.mjs');
const _page2 = () => import('./pages/en/articles/_slug_.astro.mjs');
const _page3 = () => import('./pages/en/articles.astro.mjs');
const _page4 = () => import('./pages/en/rss.xml.astro.mjs');
const _page5 = () => import('./pages/en/tags/_tag_.astro.mjs');
const _page6 = () => import('./pages/en/tags.astro.mjs');
const _page7 = () => import('./pages/en.astro.mjs');
const _page8 = () => import('./pages/open-graph/_---route_.astro.mjs');
const _page9 = () => import('./pages/robots.txt.astro.mjs');
const _page10 = () => import('./pages/sitemap-index.xml.astro.mjs');
const _page11 = () => import('./pages/zh-tw/about.astro.mjs');
const _page12 = () => import('./pages/zh-tw/articles/_slug_.astro.mjs');
const _page13 = () => import('./pages/zh-tw/articles.astro.mjs');
const _page14 = () => import('./pages/zh-tw/rss.xml.astro.mjs');
const _page15 = () => import('./pages/zh-tw/tags/_tag_.astro.mjs');
const _page16 = () => import('./pages/zh-tw/tags.astro.mjs');
const _page17 = () => import('./pages/zh-tw.astro.mjs');
const _page18 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/en/about.astro", _page1],
    ["src/pages/en/articles/[slug].astro", _page2],
    ["src/pages/en/articles/index.astro", _page3],
    ["src/pages/en/rss.xml.js", _page4],
    ["src/pages/en/tags/[tag].astro", _page5],
    ["src/pages/en/tags/index.astro", _page6],
    ["src/pages/en/index.astro", _page7],
    ["src/pages/open-graph/[...route].ts", _page8],
    ["src/pages/robots.txt.js", _page9],
    ["src/pages/sitemap-index.xml.js", _page10],
    ["src/pages/zh-tw/about.astro", _page11],
    ["src/pages/zh-tw/articles/[slug].astro", _page12],
    ["src/pages/zh-tw/articles/index.astro", _page13],
    ["src/pages/zh-tw/rss.xml.js", _page14],
    ["src/pages/zh-tw/tags/[tag].astro", _page15],
    ["src/pages/zh-tw/tags/index.astro", _page16],
    ["src/pages/zh-tw/index.astro", _page17],
    ["src/pages/index.astro", _page18]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: undefined
});
const _args = {
    "middlewareSecret": "92596299-a383-40a4-b4c4-da79cc28c037"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
