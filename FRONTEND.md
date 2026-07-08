# Frontend Agent Guide

## Mission

Build a fast, accessible schedule dashboard for the EMT course using the typed schedule services. Keep screens reusable for future pages such as study guides, requirements, and exam prep.

## Ownership

Frontend owns:

- `src/App.tsx`
- `src/components/**`
- `src/styles.css`
- route/page files if added later

Frontend does not own schedule data contracts or normalization logic without manager approval.

## UI Rules

- Prioritize scan speed: next item, active windows, deadlines, and weekly timeline.
- Keep mobile useful from the first implementation.
- Use semantic HTML and visible focus states.
- Do not expose private course assets or access codes.
- Keep GitHub Pages constraints in mind: static app, no server-only assumptions.

## Commit Examples

```text
feat: add schedule dashboard shell
fix: improve mobile timeline filters
refactor: split deadline panel
```
