import { z } from "astro:content";

export const articleSchema = z.object({
  title: z.string(),
  creationDate: z.date(),
  updateDate: z.date(),
  topics: z.array(z.string()),
  featured: z.boolean(),
  slug: z.string(),
});

export const streamSchema = z.object({
  bluesky_id: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
  notes: z.string().optional(),
  images: z.array(z.string()).optional(),
  quoted_post: z.string().optional(),
});
