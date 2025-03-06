import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('en');
  
  return rss({
    title: "Eva Wu's Tech Blog",
    description: "This is my personal tech blog, primarily dedicated to programming study notes and software/digital-related content. In the long term, I will also write other broader software/digital content and share my personal life.",
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
