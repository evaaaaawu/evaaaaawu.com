import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Eva Wu | Tech Blog',
    description: 'My Tech Blog',
    site: context.site,
    //TODO: glob 路徑要改成正確的，但不知道怎麼改
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>zh-tw</language>`,
  });
}
