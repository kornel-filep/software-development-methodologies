import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every Markdown file in src/content/pages becomes a page.
// index.md is the home page; other files are served at /<file name>/.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(100),
    // Menu label; defaults to the title.
    navLabel: z.string().optional(),
    // Site-wide footer text, read from index.md only.
    footer: z.string().optional(),
  }),
});

export const collections = { pages };
