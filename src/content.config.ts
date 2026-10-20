import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every Markdown file in src/content/oldalak becomes a page.
// index.md is the home page; other files are served at /<file name>/.
const oldalak = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/oldalak' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(100),
  }),
});

export const collections = { oldalak };
