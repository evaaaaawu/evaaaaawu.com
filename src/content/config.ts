import { z, defineCollection } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    author: z.string(),
    imageSrc: z.string(),
    imgAlt: z.string(),
    creationDate: z.string(),
    updateDate: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean(),
  })
});

export const collections = {
  articles: articlesCollection,
};
