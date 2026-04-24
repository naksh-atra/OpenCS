import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

const GitHubPagesSite = 'https://opencs.github.io';

export default defineConfig({
  site: process.env.GITHUB_PAGES_DEPLOY ? GitHubPagesSite : undefined,
  base: '/OpenCS',
  output: 'static',
  integrations: [react(), mdx()],
});