import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // TODO: Update site to your GitHub Pages URL before deploying
  // e.g., site: 'https://yourusername.github.io'
  site: undefined,
  base: '/OpenCS',
  output: 'static',
  integrations: [react(), mdx()],
});