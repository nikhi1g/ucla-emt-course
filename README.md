# UCLA EMT Course Schedule

Static GitHub Pages app for a sanitized UCLA EMT course schedule.

This repository intentionally contains only app code, normalized schedule data, and development docs. It excludes personal documents, medical/immunization files, Canvas mirrors, PDFs, screenshots, access codes, and lecture media.

## Stack

- Vite
- React
- TypeScript
- Static data and browser-safe schedule services
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
