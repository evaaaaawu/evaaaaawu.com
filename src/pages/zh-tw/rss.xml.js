import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('zh-tw');
  
  return rss({
    title: "Eva Wu 的技術部落格",
    description: "歡迎來到我的個人部落格，目前這裡主要會分享我的程式/技術學習筆記。長期規劃上，我也會撰寫其他更廣泛的軟體/數位相關內容和分享我的個人生活。",
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      subtitle: article.data.subtitle,
      pubDate: article.data.updateDate,
      link: `/zh-tw/articles/${article.slug}/`,
    })),
    customData: `<language>zh-tw</language>`,
  });
}
