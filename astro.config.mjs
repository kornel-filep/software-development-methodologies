// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://kornel-filep.github.io',
  // CI sets BASE_PATH so branch previews are served from /preview/<branch>/.
  base: process.env.BASE_PATH ?? '/software-development-methodologies',
  integrations: [mdx(), react()],
});
