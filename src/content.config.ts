import { z, defineCollection } from 'astro:content';

const articlesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    author: z.string(),
    imageSrc: z.string(),
    imgAlt: z.string(),
    creationDate: z.date(),
    updateDate: z.date(),
    tags: z.array(z.string()),
    featured: z.boolean()
  })
});

const authorsCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    image: z.string(),
    description: z.string()
  })
});

export const collections = {
  articles: articlesCollection,
  authors: authorsCollection
};