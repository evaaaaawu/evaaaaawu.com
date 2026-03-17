import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const articles = await getCollection("en");

  return rss({
    title: "Eva Wu's Personal Website",
    description: "",
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      subtitle: article.data.subtitle,
      pubDate: article.data.updateDate,
      link: `/en/articles/${article.slug}/`,
    })),
    customData: `<language>en</language>`,
  });
}
