LY Timetable Frontend

Stack recommendation and scaffold

- React + TypeScript (Vite)
- UI: Material UI (MUI) — chosen for this scaffold (can swap to Chakra easily)
- State & data: @tanstack/react-query for remote data; zustand for local UI state
- Router: react-router-dom
- Form: react-hook-form
- Date utilities: date-fns

What I scaffolded

- package.json, tsconfig.json, vite.config.ts
- basic `src` skeleton with `main.tsx`, `App.tsx`, pages and component stubs
- README (this file) and .gitignore

Timetable display & UX notes (from the brief)

- Grid-based visualizer: use CSS Grid to model days (columns) and time slots (rows). Compute rowSpan from duration.
- Libraries to consider: FullCalendar, React Big Calendar for calendar features, but custom grid + MUI is recommended for compact timetables.
- Responsive: mobile = stacked day view (accordion per day); desktop = weekly grid with times on left and day columns.
- Interactions: inline edit (click → modal showing original crop + editable fields), drag-and-drop later, keyboard accessibility, high-contrast modes.
- UI toggles: show/hide original upload, highlight bounding boxes on hover, confidence color outlines, CSV/JSON export.

Run locally

1) Install dependencies

```powershell
npm install
```

2) Run dev server

```powershell
npm run dev
```
