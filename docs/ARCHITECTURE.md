# Architecture

## 1. Purpose

College OS is a multi-role institutional platform. The current repository is a
frontend foundation: a runnable Next.js App Router application with a shared
design system, one application shell, route-level structure for the first
module set, and the full 143-screen design reference preserved separately.

The architecture is intentionally **vertical-slice friendly**. Each module
should be implemented end to end — schema, query, permission, page, and tests —
rather than building all pages as static shells first.

## 2. Repository layers

```text
design/     Visual specification and reference mockups
docs/       Architecture, audit, and delivery documentation
src/        The application
```

### `design/`
- `DESIGN_SYSTEM.md` — canonical tokens mirrored in `tailwind.config.ts`.
- `mockups/<screen>/code.html` — 143 static reference screens.
- `mockups/<screen>/screen.png` — 142 screenshots.

The mockups are **not imported by the application**. They exist for visual
reference and are excluded from TypeScript and Tailwind content scanning.

### `src/`
- `app/` — routes, layouts, metadata, route handlers.
- `components/layout/` — the single application shell.
- `components/ui/` — design-system primitives.
- `components/shared/` — composed cross-module components.
- `config/` — static configuration (site metadata, navigation).
- `data/` — demo-only data for the scaffold.
- `lib/` — utilities and RBAC helpers.
- `types/` — shared domain types.

## 3. Rendering model

- The App Router is used throughout.
- Route group layouts (`(auth)`, `(portal)`, `(admin)`) own the page chrome.
- `AppShell` is the only client-side shell. It owns mobile drawer state.
- `Sidebar` and `Header` are client components because they use `usePathname`.
- Pages are server components by default. Add `"use client"` only when a page
  needs browser state or events.
- `metadata` is exported per page for titles.

### Route groups

| Group | URL prefix | Layout |
|---|---|---|
| `(auth)` | `/login`, `/forgot-password`, `/reset-password` | Centered auth frame |
| `(portal)` | `/dashboard`, `/academics`, ... | `AppShell` with portal navigation |
| `(admin)` | `/admin`, `/admin/users`, ... | `AppShell` with admin navigation |

Route groups do not affect the URL. Keep admin routes under `(admin)/admin`
and portal routes under `(portal)`. Do not create a second admin tree under
`(portal)`.

## 4. Layout and component system

```text
AppShell
├── Sidebar        (responsive drawer, active-route state)
├── Header         (breadcrumbs, search, term, notifications, profile)
└── main
    └── page content
```

- **`AppShell`** — the only page shell. Accepts `navGroups`, `user`, `college`,
  and `termLabel`.
- **`Sidebar`** — renders navigation groups from `src/config/navigation.ts`.
- **`Header`** — derives breadcrumbs from the active navigation item and
  `usePathname`.
- **`PageHeader`** — consistent page title, description, and actions.
- **`ModulePage`** — temporary placeholder for scaffolded routes. Replace it
  module by module with real content.

### UI primitives

| Component | Use |
|---|---|
| `Button` / `buttonStyles` | Actions and link-styled buttons |
| `Input` | Labeled form fields with hint/error states |
| `KPICard` | Dashboard metrics and progress |
| `StatusBadge` | Semantic status chips |
| `CircularProgress` | Radial progress |
| `PageHeader` | Page-level heading |
| `EmptyState` | Empty and scaffolded states |

All primitives are server-compatible unless they explicitly need client state.

## 5. Design tokens

`tailwind.config.ts` is the implementation source of truth. It mirrors the
frontmatter in `design/DESIGN_SYSTEM.md`.

Key rules:

- Use semantic tokens, not raw hex values, in components.
- Use `rounded-lg` for controls, `rounded-xl` for cards, and `rounded-full` for
  pills and avatars.
- Use `text-on-surface` for primary text and `text-on-surface-variant` for
  secondary text.
- Use `success`, `warning`, `error`, and `info` tokens for semantic states.
- Keep numeric displays in `font-code-metric` and use `tabular-nums` where
  columns must align.

## 6. Data and authentication plan

The current app has **no database and no auth**. The intended stack, based on
`.env.example` and the previous build artifact, is:

- PostgreSQL (Supabase) via Prisma.
- Supabase Auth or a cookie-backed session layer.
- Private Supabase Storage or the local storage driver.
- SMTP for transactional email.
- Zod for request and form validation.
- RBAC enforced server-side, not in navigation.

### Recommended data flow

```text
Route (server component)
  → session / RBAC guard
  → server-side query (Prisma)
  → serialisable view model
  → server-rendered page
  → client components only for interaction
```

### First schema domains

1. Identity: `User`, `Role`, `Permission`, `Session`, `AuditLog`.
2. Institution: `College`, `Campus`, `Department`, `AcademicYear`, `Term`.
3. Academics: `Program`, `Course`, `Subject`, `Section`, `Enrollment`.
4. Attendance: `AttendanceSession`, `AttendanceRecord`, `AttendancePolicy`.
5. Examinations: `Examination`, `ExamSchedule`, `Mark`, `Result`, `Revaluation`.
6. Finance: `FeeStructure`, `Invoice`, `Payment`, `Scholarship`, `LedgerEntry`.
7. Campus: `Hostel`, `Room`, `Allocation`, `TransportRoute`, `Booking`.
8. Library: `Book`, `BookCopy`, `Loan`, `Reservation`, `Fine`.
9. Placement: `Company`, `Drive`, `Application`, `Offer`.
10. Communication: `Announcement`, `Notification`, `Message`, `Template`.

### RBAC

`src/lib/rbac.ts` defines role labels, home routes, and admin/portal checks.
The current demo layouts bypass auth. When auth is implemented:

- Resolve the session on the server.
- Redirect unauthenticated users to `/login`.
- Redirect unauthorised users to `/unauthorized`.
- Enforce permissions in route handlers and server actions, not only in the UI.
- Never trust a role supplied by the client.

## 7. Module implementation pattern

For each module:

1. Add the route under the correct route group.
2. Define the data contract and validation schema.
3. Add the Prisma model and migration.
4. Implement server-side queries and mutations.
5. Enforce RBAC at the server boundary.
6. Replace the `ModulePage` placeholder with real components.
7. Add loading, empty, and error states.
8. Add unit tests for logic and a Playwright flow for the primary task.
9. Run `npm run check` and `npm run build`.

## 8. Conventions

- File names: PascalCase for components, kebab-case for route files as required
  by the App Router, camelCase for utilities.
- Imports: use the `@/` alias for `src/`.
- Server/client boundary: keep `"use client"` as low in the tree as possible.
- Accessibility: label every input, give icon-only buttons an `aria-label`, and
  keep focus-visible styles.
- No hardcoded tenant, term, or user data outside `src/config/site.ts` (demo)
  or the session layer.
- No direct `fetch` in client components when a server component can query.
- Do not add a second layout shell.

## 9. Testing and CI

Recommended baseline:

```bash
npm run check      # TypeScript + ESLint
npm run build      # production build
```

Add next:

- Vitest + React Testing Library for UI logic.
- Playwright for auth, attendance, marks entry, and fee payment flows.
- A CI workflow that runs `npm ci`, `npm run check`, `npm run build`, and tests.

## 10. Known constraints

- The pre-restructure `.next/` build was moved to
  `/tmp/opencode/college-os-next-stale-20261027` for forensics. The current
  `.next/` is a fresh build of this source tree.
- `.env.example` documents a planned backend; the corresponding dependencies
  and modules do not exist yet.
- The demo identities in `src/config/site.ts` are for UI development only.
- The 143 mockups use Tailwind CDN, external images, and inline JavaScript.
  Treat them as visual references, not source code.

## 11. Immediate roadmap

1. Decide whether to restore the earlier full application or continue from this
   scaffold. The stale `.next` output is evidence that a more complete app
   existed previously.
2. Put the repository under Git and commit the restructured baseline.
3. Implement auth, session handling, and RBAC.
4. Add Prisma and the identity/institution schema.
5. Build the student portal vertical slice: dashboard → attendance →
   examinations → fees.
6. Add the faculty slice: classes → attendance → marks entry → materials.
7. Add the admin slice: users → roles → audit → settings.
8. Expand to finance, library, hostel, transport, placement, and communication.
