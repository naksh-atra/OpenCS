import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://opencs.github.io',
  base: '/OpenCS',
  output: 'static',
  integrations: [react(), mdx()],
});