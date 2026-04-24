# OpenCS Deployment Guide

This document explains how OpenCS deploys to GitHub Pages and the configuration decisions behind it.

## Overview

OpenCS deploys as a **project site** (not a user site) at:
```
https://opencs.github.io/OpenCS/
```

This means:
- The site is owned by the `opencs` organization
- It's accessible under the `/OpenCS` path prefix
- All internal links must use `/OpenCS` as the base

## Configuration

### Astro Config

`astro.config.mjs` sets the base path and conditionally sets `site`:

```javascript
const GitHubPagesSite = 'https://opencs.github.io';

export default defineConfig({
  site: process.env.GITHUB_PAGES_DEPLOY ? GitHubPagesSite : undefined,
  base: '/OpenCS',
  output: 'static',
  integrations: [react(), mdx()],
});
```

- `base: '/OpenCS'` — Required for project sites. All internal links are prefixed with this path.
- `site` — Set to the GitHub Pages URL when `GITHUB_PAGES_DEPLOY` env var is truthy. This enables correct canonical URLs in generated HTML.
- `output: 'static'` — Pre-rendered at build time; no serverless function needed.

### Why Not a User Site?

User sites (`username.github.io`) deploy to the root (`/`). Project sites (`username.github.io/repo/`) require the base path prefix.

Without `base: '/OpenCS'`:
- Links would point to `/topics/time-complexity/` instead of `/OpenCS/topics/time-complexity/`

## Build

```bash
# Local development (base path set, no site)
npm run dev
# Visit: http://localhost:4321/OpenCS/

# Production build
npm run build
# Output: dist/
```

## GitHub Actions

The deployment workflow runs on push to `main`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          GITHUB_PAGES_DEPLOY: 1
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: angular/angular-pages-action@v1
```

Key points:
- Sets `GITHUB_PAGES_DEPLOY: 1` so Astro sets the correct `site` URL
- Uploads `dist/` as a Pages artifact
- Angular action deploys to the project site

### Repository Settings

The workflow does not automatically enable Pages. You must also:

1. Go to repository **Settings → Pages**
2. Under **Build and deployment**, select **Source**: GitHub Actions
3. Wait for the workflow to complete

Without this setting, the site will not publish.

## Forking

If you fork this repository:

1. **Update `site` in `astro.config.mjs`** to your GitHub Pages URL:
   ```javascript
   site: 'https://your-username.github.io',
   ```

2. **Change `base`** to your repo name if different:
   ```javascript
   base: '/your-repo-name',
   ```

3. **Update the workflow** to remove the `GITHUB_PAGES_DEPLOY` check or set it directly:
   ```yaml
   env:
     GITHUB_PAGES_DEPLOY: 1
   ```

4. **GitHub Pages settings**: Set Source to "GitHub Actions" in your repo settings.

## Local Testing

To test the production build locally with the correct base path:

```bash
# Build with site configured
GITHUB_PAGES_DEPLOY=1 npm run build

# Serve the dist folder (e.g., with http-server)
npx http-server dist -p 8080 -c-1
# Visit: http://localhost:8080/OpenCS/
```

Or use `npm run preview` after building (Astro's built-in preview server):
```bash
npm run build
npm run preview
# Visit: http://localhost:4321
```

`npm run preview` serves `dist/` with the configuration applied.

## Troubleshooting

### Links are 404

- Ensure `base: '/OpenCS'` is set in `astro.config.mjs`
- Ensure the workflow sets `GITHUB_PAGES_DEPLOY: 1`

### Site loads but assets 404

- Check `site` is set to the correct GitHub Pages URL
- Verify the base path matches your repo name exactly

### Redirect loops

- If using a custom domain, ensure `site` matches your custom domain
- Do not set both a custom domain and the GitHub Pages URL

---

_Last updated: 2025_