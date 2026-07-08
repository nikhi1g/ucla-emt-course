# Backend/Data Agent Guide

## Mission

Own the schedule data foundation for the static app. Backend/data work here means browser-safe TypeScript data, service functions, validation, and optional build-time scripts. It does not mean a runtime server.

## Ownership

Backend/data owns:

- `src/data/**`
- `src/lib/**` when files expose schedule services
- future `scripts/**`
- data validation fixtures/tests if added

Backend/data does not own visual components or styling without manager approval.

## Contract Rules

- Keep `ScheduleItem` explicit and stable.
- Prefer service functions over direct frontend filtering of raw data.
- Represent dates as ISO strings with timezone offsets when known.
- Exclude access codes, personal data, private URLs, raw Canvas mirrors, and copyrighted course files.
- When changing data shape, document the frontend impact in the commit or PR notes.

## Commit Examples

```text
feat: add normalized schedule data
fix: correct trauma exam window
refactor: expose upcoming schedule service
```
