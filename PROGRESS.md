# Rounds Dash: Migration Progress

Converting the **Rounds** hospital management template (plain HTML, CSS, Bootstrap 5, vanilla JS) into a **Vite + React + TypeScript + Tailwind CSS** app.

- **Project path:** `C:\Users\blessings\Sites\rounds-dash`
- **Package manager:** pnpm
- **Last updated:** after Step 4 (Login and Overview) delivered; `pnpm lint` and `pnpm build` pass with no errors

---

## Status at a glance

| # | Step                                                     | Status                          |
|---|----------------------------------------------------------|---------------------------------|
| 0 | Scaffold Vite + React + TS + ESLint, add Tailwind        | ✅ Done                         |
| 1 | Foundation: tokens, fonts, base styles, folder structure | ✅ Done and verified            |
| 2 | App shell: sidebar, topbar, census bar, footer, routing  | ✅ Done (lint and build pass)   |
| 3 | Shared UI kit                                            | ✅ Done (lint and build pass)   |
| 4 | Login page and Overview page (with charts)               | ✅ Done (lint and build pass)   |
| 5 | Inpatients page                                          | ⬜ Next                         |
| 6 | Patient record page                                      | ⬜ Not started                  |
| 7 | Appointments, Beds, Staff pages                          | ⬜ Not started                  |
| 8 | Polish, accessibility pass, cleanup, build check         | ⬜ Not started                  |

Legend: ✅ done · 🟡 in progress or needs checking · ⬜ not started

---

## Stack and versions

| Tool              | Version                                   |
|-------------------|-------------------------------------------|
| Vite              | 8.3.5                                     |
| React / React DOM | 19.3.1                                    |
| TypeScript        | ~6.0.3                                    |
| ESLint            | 10.13.0                                   |
| Tailwind CSS      | 4.3.3 via `@tailwindcss/vite` (confirmed) |
| Router            | `react-router-dom` 7.18.5 (installed)     |

---

## Decisions made

1. **No Bootstrap.** Offcanvas, modal and dropdown are replaced with React components.
2. **Light mode only.** No dark theme, no theme toggle, no `data-theme`, no `rounds-theme` key.
3. **Design tokens live in `@theme`** in `src/index.css`. The default Tailwind palette is reset (`--color-*: initial`), so only project colors exist (`bg-surface`, `text-muted`, `border-line`, `bg-tint-teal`, and so on).
4. **The vitals monitor stays dark** with fixed colors. It is a deliberate bedside-monitor look, not a theme.
5. **Charts are hand-built SVG React components** (no chart library), each with a visually hidden data table for screen readers.
6. **Demo data is typed arrays in `src/data/`.** State is local to each page (no backend, no global store).
7. **Sidebar collapse state** persists in `localStorage` under `rounds-sidebar`.
8. **Path alias:** `@` maps to `src`.
9. **Drawer and Modal use the native `<dialog>`** through the `useDialog` hook (Esc, backdrop click, scroll lock). React state drives open and close.
10. **`ref` is a normal prop** (React 19), so `Input`, `Select` and others accept it with no `forwardRef`.
11. **Announcements** go through `Announcer` and the `useAnnounce()` hook (replaces `announce()` in the original `main.js`).
12. **Collapsed sidebar** uses a custom Tailwind variant, `rail:`, which matches descendants of `[data-collapsed="true"]` at `lg` and up. Never put `rail:` on the element that carries `data-collapsed`.
13. **No direct `setState` inside effects.** `eslint-plugin-react-hooks` 7 flags it, so derive values during render or use event handlers.
14. **Form handlers use `SyntheticEvent<HTMLFormElement>`.** `FormEvent` is deprecated in the current React types.

---

## Completed

### Step 0: Scaffold
- [x] Vite + React + TypeScript + ESLint, dependencies installed
- [x] Tailwind CSS v4 added

### Step 1: Foundation
- [x] `vite.config.ts` with React plugin, Tailwind plugin, `@` alias (`import.meta.dirname`)
- [x] `tsconfig.app.json` paths for `@/*`
- [x] `src/index.css`: tokens, base styles, `ic` utility, `rail` variant, drawer, modal and flash animations, `.clinical-table` styles
- [x] IBM Plex Sans and Mono loaded via `index.html`
- [x] `public/favicon.svg`

### Step 2: App shell
- [x] `AppShell`, `Sidebar`, `Topbar`, `CensusBar`, `NotificationsMenu`, `UserMenu`, `BrandMark`, `nav.ts`
- [x] `useDismiss`, `cn`, `data/census.ts`, `data/notifications.ts`
- [x] `Icon`, `Avatar`, `IconButton`, `PageHeader`
- [x] Routing in `App.tsx`; `BrowserRouter` in `main.tsx`

### Step 3: Shared UI kit
- [x] `Panel` family: `Panel`, `PanelHead`, `PanelMeta`, `PanelBody`, `PanelFoot`, `CountBadge`, `Subhead`
- [x] `Kpi` and `Delta`, `Meter`, `LiveDot`
- [x] `Button` and `ButtonLink` (primary, outline, ghost; xs, sm, md, lg; block)
- [x] `Chip`, `Tag`, `News` (NEWS2 badge), `Pill`
- [x] `Segmented` (buttons and radio modes)
- [x] `Form.tsx`: `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`, `Toolbar`, `ToolbarField`
- [x] `Drawer` and `FormActions`, `Modal`, `ModalBody`, `ModalFooter`, `useDialog`
- [x] `FormDone`, `EmptyState`, `Announcer` and `useAnnounce`
- [x] `DataTable`, `SortHeader`, `Pager`
- [x] `Legend`, `LegendItem`, `Swatch`, `PatientCell`
- [x] `Icon` extended (trends, check, phone, print, download, reset, shield, lock, eye, droplet, activity, pill, flask, fileText, transfer)
- [x] `pages/KitPreview.tsx` at `/kit` (temporary)

### Step 4: Login and Overview
- [x] `Login` page: split layout, validation, focus on first error, show/hide password, forgot panel, success state
- [x] `src/lib/time.ts` (`pad2`, `clockNow`)
- [x] Data files: `wards`, `flow`, `alerts`, `ed`, `opd`, `duty`
- [x] `Sparkline`, `useElementWidth`
- [x] `KpiRow`
- [x] `WardChart` (animated bars, responsive, 85% limit line) and `WardChartPanel`
- [x] `FlowChart` (hover crosshair and tooltip, keyboard arrows, Home/End/Esc, weekend shading) and `FlowChartPanel` (7/14-day toggle, series toggles, totals, net)
- [x] `AlertsPanel` (acknowledge, live count, focus moves to the next alert)
- [x] `EdPanel`, `OpdPreview`, `StaffOnDuty`
- [x] `Overview` page assembled

---

## Housekeeping

Confirm these in the project; I could not see them from the files shared:

- [ ] `src/hooks/useTheme.ts` deleted, if it ever existed
- [ ] Sidebar `<script>` block and `data-theme` removed from `index.html`
- [ ] `src/App.css` and unused Vite demo assets deleted
- [ ] `src/assets/login-hospital.jpg` in place (Login imports it)
- [ ] Replace `FormEvent` with `SyntheticEvent<HTMLFormElement>` in `Login.tsx`
- [ ] Fix the `Topbar.onSubmit` type to `SyntheticEvent<HTMLFormElement>` (currently typed as `ChangeEvent`)
- [ ] `Sidebar` closes its drawer in an effect on `pathname`; if lint ever flags it, close from the `NavLink` `onClick` instead
- [ ] Route `/patients` still renders a stub until Step 5

---

## Remaining work

### Step 5: Inpatients (next)
Planned as two messages: table first, drawer second.
- [ ] `src/data/patients.ts`: 32 typed rows with a computed search string
- [ ] `src/lib/csv.ts` helper
- [ ] Status summary chips
- [ ] Search plus Ward, Status and Attending filters, with reset
- [ ] Read `?q=` from the URL (set by the topbar search)
- [ ] Sortable columns (name, age, bed, attending, admitted, NEWS2, status); Status sorts by rank (critical, observation, post-op, stable, ready) rather than alphabetically, unless you say otherwise
- [ ] Pagination (10 per page) and result count
- [ ] Empty state
- [ ] Export filtered list as CSV
- [ ] Mobile stacked-row layout
- [ ] "Admit patient" drawer: validation, identity checkbox, new row at the top with highlight, success state, "Admit another"
- [ ] Open the drawer from `/patients#admit` (linked from Overview)

### Step 6: Patient record
- [ ] Wristband header (avatar, demographics, tags, fact grid, barcode stub)
- [ ] Allergy banner
- [ ] Sticky section nav with active-section highlighting
- [ ] `VitalsChart`: dark monitor panel, five metrics, normal band, out-of-range dots, tooltip, keyboard support, NEWS2 badge
- [ ] Problem list and care team
- [ ] Medications table with status pills
- [ ] Lab results with range bars, flags, trends, "Abnormal only" switch
- [ ] Plan and discharge checklist
- [ ] Clinical notes timeline plus "Add a note" form
- [ ] Print button and print styles

### Step 7: Appointments, Beds, Staff
**Appointments**
- [ ] Day navigation (prev, next, Today) and weekend empty state
- [ ] Clinic filter
- [ ] Board grid with sticky time column and doctor headers, lunch break row, blocked theatre slots
- [ ] Appointment states (booked, arrived, in consult, seen, no-show), "now" marker
- [ ] Day summary counters
- [ ] Booking modal: slot availability by doctor and date, validation, success state
- [ ] Click a free slot to prefill the modal
- [ ] Seeded generation of other days (deterministic)

**Beds**
- [ ] Hospital totals strip
- [ ] Ward tabs (keyboard arrows, Home and End)
- [ ] Bay layouts with bed states (occupied, free, cleaning, reserved), isolation and fall-risk flags
- [ ] "Mark clean" action that updates all counters
- [ ] Bed queue with Assign buttons
- [ ] Assign-bed modal (patient, ward, bed, ETA, options) that reserves the bed and updates queue and counts
- [ ] All-wards summary table with occupancy meters

**Staff**
- [ ] KPI cards
- [ ] Role toggle, department filter, name search, live count
- [ ] Weekly shift grid with sticky staff column, today highlight, hours
- [ ] Week navigation (generated patterns for other weeks)
- [ ] Coverage footer with shortfall highlighting
- [ ] Shift legend
- [ ] Open shifts with "Offer to bank"
- [ ] Bleep holders list
- [ ] Print rota

### Step 8: Polish and finish
- [ ] Delete `pages/KitPreview.tsx` and the `/kit` route
- [ ] Keyboard and screen-reader pass (focus order, labels, live regions)
- [ ] Reduced-motion handling (base rule already in `index.css`; verify)
- [ ] Print styles
- [ ] Responsive check at 375, 768, 1024 and 1440 widths
- [ ] Strict TypeScript and ESLint clean (no warnings, including IDE deprecation hints)
- [ ] `pnpm build` and `pnpm preview` succeed
- [ ] Remove unused code, files and dependencies
- [ ] README with run, build and project structure notes

---

## Current folder structure

```
src/
  assets/              login-hospital.jpg
  components/
    charts/            Sparkline, FlowChart, flowSeries, WardCharts
    icons/             Icon
    layout/            AppShell, Sidebar, Topbar, CensusBar, NotificationsMenu, UserMenu, BrandMark, nav
    overview/          KpiRow, WardChartPanel, AlertsPanel, FlowChartPanel, EdPanel, OpdPreview, StaffOnDuty
    ui/                Announcer, Avatar, Button, Chip, DataTable, Drawer, EmptyState, Form, FormDone,
                       IconButton, Kpi, Legend, LiveDot, Meter, Modal, PageHeader, PatientCell, Panel,
                       Pill, Segmented
  data/                alerts, census, duty, ed, flow, notifications, opd, wards
  hooks/               useAnnounce, useDialog, useDismiss, useElementWidth
  lib/                 cn, time
  pages/               Login, Overview, KitPreview (temporary)
  App.tsx
  main.tsx
  index.css
```

Still to add: `data/patients`, `data/vitals`, `data/appointments`, `data/beds`, `data/staff`, `lib/csv`, `lib/seeded`, and the pages `Patients`, `PatientRecord`, `Appointments`, `Beds`, `Staff`. The vitals chart goes in `components/charts/`.

---

## Original-to-React mapping (reference)

| Original (`main.js`)                                  | React replacement                         | State |
|-------------------------------------------------------|-------------------------------------------|-------|
| `initTheme`                                           | Removed (light only)                      | ✅    |
| `initSidebar`                                         | `AppShell` state plus `Sidebar`           | ✅    |
| `initSearchShortcut`                                  | `Topbar` effect                           | ✅    |
| `initNotifications`                                   | `NotificationsMenu`                       | ✅    |
| `initAlerts`                                          | `AlertsPanel`                             | ✅    |
| `initSparklines`                                      | `Sparkline`                               | ✅    |
| `initWardChart` / `initFlowChart`                     | `WardChart` / `FlowChart`                 | ✅    |
| `initLogin`                                           | `Login` page                              | ✅    |
| `announce()`                                          | `Announcer` and `useAnnounce`             | ✅    |
| `initVitalsChart`                                     | `charts/VitalsChart`                      | ⬜    |
| `initPatientTable`                                    | `Patients` page (filters, sort, pager)    | ⬜    |
| `initExport`                                          | CSV helper on `Patients`                  | ⬜    |
| `initAdmitForm`                                       | `Drawer` plus form on `Patients`          | ⬜    |
| `initLabFilter` / `initRecordNav` / `initNoteForm`    | `PatientRecord` page                      | ⬜    |
| `initAppointments`                                    | `Appointments` page                       | ⬜    |
| `initBedMap`                                          | `Beds` page                               | ⬜    |
| `initRoster`                                          | `Staff` page                              | ⬜    |
| Bootstrap offcanvas, modal, dropdown                  | `Drawer`, `Modal`, `useDismiss` menus     | ✅    |

---

## Next action

Apply the two `SyntheticEvent` fixes (`Login.tsx`, `Topbar.tsx`), then start **Step 5: Inpatients**, message 1 (data, CSV helper, and the table page).
