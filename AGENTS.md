# Agent Operating Model

## Commit Policy

Use one focused commit per substantial user-facing turn. Keep commits independently revertible and use messages like `feat: add schedule filters` or `docs: define data ownership`.

## Repository Boundary

This repository is the sanitized, publishable app repo. Do not copy raw course mirrors, PDFs, screenshots, access codes, personal medical files, or lecture media into it.

## Stack

Use Vite, React, TypeScript, static JSON/TypeScript data, and GitHub Pages. Do not add a runtime backend while GitHub Pages is the hosting target.

## Agent Roles

Manager:

- Owns integration on `main`.
- Keeps the pushed fileset localized to this repository.
- Reviews contract changes between UI and schedule data.

Frontend agent:

- Branch/worktree naming: `agent/frontend/<short-scope>`.
- Owns UI components, pages, styling, accessibility, responsive behavior, and interaction polish.
- Reads `FRONTEND.md` before changing UI files.

Backend/data agent:

- Branch/worktree naming: `agent/backend/<short-scope>`.
- Owns schedule data shape, normalization scripts, typed service functions, and data validation.
- Reads `BACKEND.md` before changing data or service files.

## Worktree Practice

When using worktrees, place them outside this repository or in a local ignored folder named `.worktrees/`.

Path format:

```text
.worktrees/<role>-<short-scope>
```

Branch format:

```text
agent/<role>/<short-scope>
```

Examples:

```bash
git worktree add -b agent/frontend/schedule-ui .worktrees/frontend-schedule-ui main
git worktree add -b agent/backend/schedule-data .worktrees/backend-schedule-data main
```
