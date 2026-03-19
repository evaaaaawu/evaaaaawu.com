import { z, defineCollection } from 'astro:content';

const articlesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    creationDate: z.date(),
    updateDate: z.date(),
    topics: z.array(z.string()),
    featured: z.boolean(),
    outdated: z.boolean(),
  }),
});

export const collections = {
  "en": articlesCollection,
  "zh-tw": articlesCollection,
};
