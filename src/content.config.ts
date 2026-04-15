import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { articleSchema, streamSchema } from "./content/schemas";

const stripMdExtension = (entry: string) => entry.replace(/\.md$/, "");

const articles = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./content/articles",
    generateId: ({ entry }) => stripMdExtension(entry),
  }),
  schema: articleSchema,
});

const stream = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./content/stream",
    generateId: ({ entry }) => stripMdExtension(entry),
  }),
  schema: streamSchema,
});

export const collections = { articles, stream };
