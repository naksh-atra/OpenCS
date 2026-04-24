# OpenCS Release Checklist

This document contains the exact steps required to deploy OpenCS to GitHub Pages.

## Pre-Release Checklist

- [x] Build passes: `npm run build` completes without errors
- [x] All 10 topics have `status: "published"` in frontmatter
- [x] All internal links use `/OpenCS` base path
- [x] No broken links in topics, homepage, navigation
- [x] `astro.config.mjs` has `base: '/OpenCS'`
- [x] `lang="en"` set in BaseLayout

## Build

```bash
# Local verification
npm run build
# Expected: 15 pages built successfully
```

## Deploy Steps

### Option 1: GitHub Actions (Recommended)

1. Ensure `.github/workflows/deploy.yml` exists with the Astro GitHub Action
2. Push to `main` branch:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```
3. Go to repository **Settings → Pages**
4. Under **Build and deployment**, select **Source**: GitHub Actions
5. Watch the Action run in **Actions** tab
6. Site deploys to `https://opencs.github.io/OpenCS/`

### Option 2: Manual Deploy

1. Build with site configured:
   ```bash
   GITHUB_PAGES_DEPLOY=1 npm run build
   ```
2. Go to repository **Settings → Pages**
3. Set **Source**: Deploy from a branch
4. Select branch: `gh-pages` (or create it from `dist/`)
5. Folder: `/ (root)`
6. Click **Save**

## Post-Deploy Verification

1. Visit `https://opencs.github.io/OpenCS/`
2. Check homepage loads
3. Click **All Topics** — verify filter tabs work
4. Click a topic — verify prev/next navigation works
5. Test a visualizer — verify Play/Step controls work

## Maintainer Action Required Before First Public Deploy

The Astro config uses conditional `site` based on environment:

```javascript
// astro.config.mjs
site: process.env.GITHUB_PAGES_DEPLOY ? GitHubPagesSite : undefined,
```

For the first public deploy, **ensure the GitHub Actions workflow sets `GITHUB_PAGES_DEPLOY: 1`** to enable canonical URLs.

If deploying manually, either:
- Set `site` directly in `astro.config.mjs`:
  ```javascript
  site: 'https://opencs.github.io',
  ```
- Or set the environment variable before build

## Rollback

If something goes wrong:

1. Go to repository **Settings → Pages**
2. Change source to a previous known-good branch
3. Or revert the commit and re-push

---

_Last updated: 2025_