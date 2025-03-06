import { z, defineCollection } from 'astro:content';

const articlesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    author: z.string(),
    imageWebp: z.string(),
    imagePng: z.string(),
    imgAlt: z.string(),
    creationDate: z.date(),
    updateDate: z.date(),
    tags: z.array(z.string()),
    featured: z.boolean()
  }),
});

export const collections = {
  "en": articlesCollection,
  "zh-tw": articlesCollection,
};
