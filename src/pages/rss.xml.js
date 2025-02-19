import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection("articles");
  return rss({
    title: "Eva Wu's Tech Blog",
    description: "This is my personal tech blog, primarily dedicated to programming study notes and software/digital-related content. Occasionally, I may also share aspects of my personal life.",
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      subtitle: article.data.subtitle,
      creationDate: article.data.creationDate,
      updateDate: article.data.updateDate,
      tags: article.data.tags,
      link: `/articles/${article.id}/`,
    })),
    customData: `<language>zh-tw</language>`,
  })
}
