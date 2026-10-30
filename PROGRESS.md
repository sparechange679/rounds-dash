# Rounds Dash: Migration Progress

Converting the **Rounds** hospital management template (plain HTML, CSS, Bootstrap 5, vanilla JS) into a **Vite + React + TypeScript + Tailwind CSS** app.

- **Project path:** `C:\Users\blessings\Sites\rounds-dash`
- **Package manager:** pnpm
- **Last updated:** after Step 2 delivered

---

## Status at a glance

| # | Step                                                     | Status                                   |
|---|----------------------------------------------------------|------------------------------------------|
| 0 | Scaffold Vite + React + TS + ESLint, add Tailwind        | ✅ Done                                  |
| 1 | Foundation: tokens, fonts, base styles, folder structure | ✅ Done and verified                     |
| 2 | App shell: sidebar, topbar, census bar, footer, routing  | 🟡 Code delivered, awaiting verification |
| 3 | Shared UI kit                                            | ⬜ Not started                           |
| 4 | Login page and Overview page (with charts)               | ⬜ Not started                           |
| 5 | Inpatients page                                          | ⬜ Not started                           |
| 6 | Patient record page                                      | ⬜ Not started                           |
| 7 | Appointments, Beds, Staff pages                          | ⬜ Not started                           |
| 8 | Polish, accessibility pass, cleanup, build check         | ⬜ Not started                           |

Legend: ✅ done · 🟡 in progress or needs checking · ⬜ not started

---

## Stack and versions

| Tool              | Version                                                         |
|-------------------|-----------------------------------------------------------------|
| create-vite       | 9.3.3                                                           |
| Vite              | 8.3.5                                                           |
| React / React DOM | 19.3.1                                                          |
| TypeScript        | 7.0.2                                                           |
| ESLint            | 10.13.0                                                         |
| Tailwind CSS      | v4 via `@tailwindcss/vite` (assumed; confirm in `package.json`) |
| Router            | `react-router-dom`                                              |

---

## Decisions made

1. **No Bootstrap.** Its JS pieces (off canvas, modal, dropdown) are replaced with small React components or plain state.
2. **Light mode only.** The dark theme and theme toggle were dropped. No `data-theme` attribute and no `rounds-theme` storage key.
3. **Design tokens live in `@theme`** in `src/index.css`. The default Tailwind palette is reset (`--color-*: initial`), so only project colors exist (`bg-surface`, `text-muted`, `border-line`, `bg-tint-teal`, and so on).
4. **The vitals monitor on the patient record stays dark** using fixed colors. It is a deliberate bedside-monitor look, not a theme.
5. **Charts are hand-built SVG React components** (no chart library), matching the original.
6. **Demo data is held as typed arrays in `src/data/`** and state is local to each page (no backend, no global store).
7. **Sidebar collapse state** persists in `localStorage` under `rounds-sidebar`.
8. **Path alias:** `@` maps to `src`.

---

## Completed

### Step 0: Scaffold
- [x] `pnpm create vite@latest ./` with React, TypeScript, ESLint
- [x] Dependencies installed, dev server runs
- [x] Tailwind CSS added

### Step 1: Foundation (verified by screenshot)
- [x] `vite.config.ts` with React plugin, Tailwind plugin, and `@` alias
- [x] `tsconfig.app.json` paths for `@/*`
- [x] `src/index.css` with the full token set, base styles, and the `ic` icon utility
- [x] IBM Plex Sans and IBM Plex Mono loaded via `index.html`
- [x] `public/favicon.svg` brand mark
- [x] Folder structure agreed
- [x] Smoke test card rendered correctly (fonts, tints, primary button)
- [x] Vite `__dirname` warning fix issued (`import.meta.dirname`)

### Step 2: App shell (code delivered)
- [x] `src/lib/cn.ts` class joiner
- [x] `src/hooks/useDismiss.ts` outside-click and Esc handling
- [x] `src/data/census.ts` and `src/data/notifications.ts`
- [x] `Icon` component with the first icon set
- [x] `Avatar`, `IconButton`, `PageHeader`
- [x] `BrandMark`, `nav.ts`
- [x] `Sidebar`: collapsible icon rail on desktop, slide-in drawer on mobile
- [x] `Topbar`: search (the `/` shortcut and submit to `/patients?q=`), notifications, user menu
- [x] `NotificationsMenu` with mark-all-read and unread badge
- [x] `UserMenu`
- [x] `CensusBar` with scroll fade and live indicator
- [x] `AppShell` with skip link, `<Outlet />`, footer
- [x] `main.tsx` with `BrowserRouter`, and `App.tsx` with placeholder routes

---

## Pending housekeeping (do before or during Step 3)

- [ ] Apply the `vite.config.ts` fix: use `import.meta.dirname` instead of `__dirname`
- [ ] `pnpm add react-router-dom`
- [ ] Delete `src/hooks/useTheme.ts` if it still exists
- [ ] Delete the sidebar `<script>` block from `index.html` (React handles it now)
- [ ] Remove `data-theme` from `<html>` in `index.html` if still present
- [ ] Delete `src/App.css` and the unused Vite demo assets
- [ ] Copy `img/login-hospital.jpg` from the original template into `src/assets/`
- [ ] Confirm `@tailwindcss/vite` is the setup in use (Tailwind v4)

---

## Step 2 verification checklist

Tick these off after running the app:

- [ ] Desktop: navy sidebar, mint active bar on the current page
- [ ] The collapse button shrinks the sidebar to an icon rail; a refresh remembers it
- [ ] All six nav links change the page title and breadcrumb, and the active highlight follows
- [ ] Bell shows a "4" badge; "Mark all read" clears it
- [ ] Notifications and user menu close on the outside click and on Esc
- [ ] Pressing `/` focuses search; submitting goes to `/patients?q=...`
- [ ] Below 1024px the sidebar becomes a drawer opened by the hamburger, and it closes after choosing a link
- [ ] Census strip scrolls sideways on narrow screens with a fade at the edge

**If the sidebar rail does not collapse:** check the Tailwind version (needs v4.0 or newer) because the layout uses `group-data-[collapsed=true]/sb:` variants.

---

## Remaining work

### Step 3: Shared UI kit
- [ ] `Panel` (head, title, subtitle, meta, body, foot)
- [ ] `Kpi` card (label, icon, value, unit, footer, optional meter, and sparkline)
- [ ] `Meter` (plain and target-marker versions)
- [ ] `Button` (primary, outline, ghost; sm, xs, lg)
- [ ] `Chip` (critical, observation, stable, post-op, ready, new) and `Tag`
- [ ] `Segmented` control (button group and radio group variants)
- [ ] `Toolbar`, `FormField`, `Input`, `Select`, `Textarea`, `Checkbox`, `Switch`
- [ ] `Drawer` (replaces Bootstrap offcanvas: focus trap, Esc, backdrop)
- [ ] `Modal` (replaces Bootstrap modal)
- [ ] `FormDone` success state
- [ ] `EmptyState`
- [ ] `Toast` or live-region announcer (replaces `announce()`)
- [ ] `DataTable` styling helpers (clinical table, sortable header, pager)
- [ ] `Legend` and `Swatch`
- [ ] Extend `Icon` with the remaining icons (trend arrows, check, phone, print, export, reset, shield, and others)

### Step 4: Login and Overview
**Login** (outside the app shell)
- [ ] Split layout with the hospital photo, system status list, quote
- [ ] Form: staff ID or email, password with show/hide, remember checkbox
- [ ] Validation, "Forgot password" panel, success state

**Overview**
- [ ] Four KPI cards (admissions with sparkline, discharges with meter, ED wait with target, bed occupancy with target)
- [ ] `WardChart`: horizontal bars, 85% limit line, animated, responsive, with an accessible data table
- [ ] Critical alerts list with Acknowledge (live count, focus moves to the next alert)
- [ ] `FlowChart`: admissions vs. discharges line chart, 7/14-day toggle, series toggles, hover crosshair, keyboard arrows, weekend shading, totals
- [ ] ED panel: stat grid, triage bar, triage table
- [ ] OPD appointments preview table
- [ ] Staff on duty: counts, nurse ratio list, consultants on call

### Step 5: Inpatients
- [ ] Status summary chips
- [ ] Search plus Ward, Status, and Attending filters, with reset
- [ ] Read `?q=` from the URL (set by the topbar search)
- [ ] Sortable columns (name, age, bed, attending, admitted, NEWS2, status)
- [ ] Pagination (10 per page) and result count
- [ ] Empty state
- [ ] Export filtered list as CSV
- [ ] "Admit patient" drawer: validation, identity checkbox, new row added to the top, success state, "Admit another"
- [ ] Mobile stacked-row layout
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
- [ ] Board grid with sticky time column and doctor headers, lunch break row, blocked theater slots
- [ ] Appointment states (booked, arrived, in consult, seen, no-show), "now" marker
- [ ] Day summary counters
- [ ] Booking modal: slot availability by doctor and date, validation, success state
- [ ] Click a free slot to prefill the modal
- [ ] Seeded generation of other days (deterministic)

**Beds**
- [ ] Hospital totals strip
- [ ] Ward tabs (keyboard arrows, Home, and End)
- [ ] Bay layouts with bed states (occupied, free, cleaning, reserved), isolation, and fall-risk flags
- [ ] "Mark clean" action that updates all counters
- [ ] Bed queue with Assign buttons
- [ ] Assign-bed modal (patient, ward, bed, ETA, options) that reserves the bed and updates queue and counts
- [ ] All-wards summary table with occupancy meters

**Staff**
- [ ] KPI cards
- [ ] Role toggle, department filter, name search, live count
- [ ] Weekly shift grid with a sticky staff column, today highlight, hours
- [ ] Week navigation (generated patterns for other weeks)
- [ ] Coverage footer with shortfall highlighting
- [ ] Shift legend
- [ ] Open shifts with "Offer to bank"
- [ ] Bleep holders list
- [ ] Print rota

### Step 8: Polish and finish
- [ ] Keyboard and screen-reader pass (focus order, labels, live regions)
- [ ] Reduced-motion handling
- [ ] Print styles
- [ ] Responsive check at 375, 768, 1024, and 1440 widths
- [ ] Strict TypeScript and ESLint clean (no warnings)
- [ ] `pnpm build` and `pnpm preview` succeed
- [ ] Remove unused code, files, and dependencies
- [ ] README with run, build, and project structure notes

---

## Target folder structure

```
src/
  assets/              login-hospital.jpg
  components/
    charts/            WardChart, FlowChart, VitalsChart, Sparkline
    icons/             Icon
    layout/            AppShell, Sidebar, Topbar, CensusBar, NotificationsMenu, UserMenu, BrandMark, nav
    ui/                Avatar, IconButton, PageHeader, Panel, Kpi, Chip, Button, Modal, Drawer, ...
  data/                census, notifications, wards, flow, vitals, patients, appointments, staff
  hooks/               useDismiss, ...
  lib/                 cn
  pages/               Login, Overview, Patients, PatientRecord, Appointments, Beds, Staff
  types/
  App.tsx
  main.tsx
  index.css
```

---

## Original-to-React mapping (reference)

| Original (`main.js`)                                  | React replacement                      |
|-------------------------------------------------------|----------------------------------------|
| `initTheme`                                           | Removed (light only)                   |
| `initSidebar`                                         | `AppShell` state plus `Sidebar`        |
| `initSearchShortcut`                                  | `Topbar` effect                        |
| `initNotifications`                                   | `NotificationsMenu`                    |
| `initAlerts`                                          | Overview alerts component              |
| `initSparklines`                                      | `Sparkline` component                  |
| `initWardChart` / `initFlowChart` / `initVitalsChart` | `charts/` components                   |
| `initPatientTable`                                    | `Patients` page (filters, sort, pager) |
| `initExport`                                          | CSV helper on `Patients`               |
| `initAdmitForm`                                       | `Drawer` plus form on `Patients`       |
| `initLabFilter` / `initRecordNav` / `initNoteForm`    | `PatientRecord` page                   |
| `initAppointments`                                    | `Appointments` page                    |
| `initBedMap`                                          | `Beds` page                            |
| `initRoster`                                          | `Staff` page                           |
| `initLogin`                                           | `Login` page                           |
| Bootstrap offcanvas, modal, dropdown                  | `Drawer`, `Modal`, `useDismiss` menus  |

---

## Next action

Verify Step 2 using the checklist above, finish the pending housekeeping, then move to **Step 3: Shared UI kit**.
