import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const articles = await getCollection("zh-tw");

  return rss({
    title: "Eva Wu 的個人網站",
    description: "",
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
