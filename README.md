# UCLA EMT Course

Working Vite, React, and TypeScript starter deployed with GitHub Pages.

This repository intentionally starts as a clean boilerplate. Course schedule features can be rebuilt on top of this base after the deployment pipeline is stable.

## Stack

- Vite
- React
- TypeScript
- GitHub Pages deployment

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

The GitHub Actions workflow in `.github/workflows/pages.yml` builds `dist/` and publishes it to GitHub Pages.

After the first push, enable Pages for this repository with source `GitHub Actions` if GitHub does not enable it automatically.
