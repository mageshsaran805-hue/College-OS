# Architecture

## 1. Purpose

College OS is a multi-college SaaS platform for academic and campus operations.
The current repository is an application foundation: a runnable Next.js App
Router application with role-specific shells, a shared design system, a Prisma
PostgreSQL schema, credentials authentication, tenant-aware authorization,
scaffolded module routes, and the complete 143-screen design reference.

The architecture is intentionally **vertical-slice friendly**. Each module is
implemented end to end — schema, query, permission, page, states, and tests —
rather than building every page as a static shell first.

## 2. Repository layers

```text
design/     Visual specification and reference mockups
docs/       Architecture, backend, roadmap, screen map, and decisions
prisma/     Schema, migrations, and development seed
src/        The application
scripts/    Repository maintenance scripts
```

### `design/`

- `DESIGN_SYSTEM.md` — canonical tokens mirrored in `tailwind.config.ts`.
- `mockups/<screen>/code.html` — 143 static reference screens.
- `mockups/<screen>/screen.png` — 142 screenshots, stored with Git LFS.

The mockups are **not imported by the application**. They are excluded from
TypeScript, ESLint, Prettier, and Tailwind content scanning.

## 3. Source structure

```text
src/
├── app/                 # routes, layouts, metadata, route handlers
├── components/
│   ├── layout/          # AppShell, Sidebar, Header
│   ├── scaffold/        # temporary module placeholders
│   ├── ui/              # design-system primitives
│   ├── data-table/      # added with the first table
│   ├── forms/           # added with the first form
│   └── charts/          # added with the first chart
├── features/            # auth now; other domains added per vertical slice
├── server/              # auth config, tenant context, db, permissions, audit
├── config/              # site metadata and role navigation
├── data/demo/           # temporary dashboard metrics and schedule fixtures
├── lib/                 # shared utilities and role helpers
└── types/               # shared identity, navigation, UI, and Auth.js types
```

Feature and server folders contain a `README.md` describing their boundaries.
Empty implementation folders are not created in advance. `src/features/auth/`
owns auth schemas, server actions, and forms; `src/server/auth/` owns session
configuration, tenant resolution, password hashing, and reset-token handling.

## 4. Rendering model

- The App Router is used throughout.
- Route group layouts own the page chrome.
- `AppShell` is the only client-side shell. It owns mobile drawer state.
- `Sidebar` and `Header` are client components because they use `usePathname`.
- Pages are server components by default. Add `"use client"` only for browser
  state or events.
- `metadata` is exported per page for titles.

### Route groups

| Group       | URL prefix                                      | Layout and guard                                               |
| ----------- | ----------------------------------------------- | -------------------------------------------------------------- |
| `(auth)`    | `/login`, `/forgot-password`, `/reset-password` | Centered auth frame                                            |
| `(student)` | `/student/dashboard`, `/student/academics`, ... | `AppShell`; `requireRole(["student"])`                         |
| `(faculty)` | `/faculty/dashboard`, `/faculty/marks`, ...     | `AppShell`; `requireRole(["faculty", "staff"])`                |
| `(admin)`   | `/admin`, `/admin/users`, ...                   | `AppShell`; `requireRole(["admin", "super-admin", "auditor"])` |

Route groups do not affect the URL. Keep admin routes under `(admin)/admin` and
student routes under `(student)/student`. Parent and platform groups will be
added when those workspaces enter implementation. Layouts export
`dynamic = "force-dynamic"` because authentication is resolved per request.

## 5. Layout and component system

```text
AppShell
├── Sidebar        (responsive drawer, active-route state)
├── Header         (breadcrumbs, search, term, notifications, profile)
└── main
    └── page content
```

- **`AppShell`** — the only page shell. Accepts `navGroups`, `user`, `college`,
  and `termLabel`, and derives role-specific links.
- **`Sidebar`** — renders navigation groups from `src/config/navigation.ts`.
- **`Header`** — derives breadcrumbs from the active navigation item.
- **`PageHeader`** — consistent page title, description, and actions.
- **`ModulePlaceholder`** — temporary placeholder for scaffolded routes.

### UI primitives

| Component                 | Use                                        |
| ------------------------- | ------------------------------------------ |
| `Button` / `buttonStyles` | Actions and link-styled buttons            |
| `Input`                   | Labeled form fields with hint/error states |
| `KPICard`                 | Dashboard metrics and progress             |
| `StatusBadge`             | Semantic status chips                      |
| `CircularProgress`        | Radial progress                            |
| `PageHeader`              | Page-level heading                         |
| `EmptyState`              | Empty and scaffolded states                |

All primitives are server-compatible unless they explicitly need client state.

## 6. Design tokens

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

## 7. Data and authentication

The foundation includes:

- PostgreSQL (Supabase in deployment) through Prisma.
- Auth.js credentials authentication with signed JWT sessions.
- bcrypt password hashes and single-use, hashed password-reset tokens.
- Server-resolved tenant context and membership roles.
- SMTP for transactional email, console logging in development.
- Zod for request and form validation.
- Audit logging for authentication events.
- Server-enforced RBAC and tenant isolation.

The full schema, environment, permission map, and operational workflow are in
[`BACKEND.md`](BACKEND.md).

### Tenant model

- `College` is the tenant root.
- `Membership` links a user to a college and carries the role.
- A user can belong to more than one college; V1 selects the first active
  membership at sign-in. A workspace switcher will make this explicit.
- The active college is resolved from the server session and re-verified against
  the database on every protected request. Subdomain branding can be added later
  without changing the schema.
- Every tenant-owned table carries `collegeId`.
- Repository functions require a `TenantContext` and always scope queries to it.
- Cross-tenant access tests are mandatory.

### Data flow

```text
Route (server component)
  → Auth.js session
  → requireTenant / requireRole (database-verified)
  → feature service
  → tenant-scoped Prisma query
  → serialisable view model
  → server-rendered page
  → client components only for interaction
```

Server actions follow the same path and call `requirePermission` before a
mutation. The browser never supplies the active college, user, membership, or
role.

### RBAC

`src/lib/rbac.ts` describes UI role labels and workspace links. Authorization is
enforced in `src/server/permissions/` and `src/server/auth/tenant.ts`:

- Resolve the session on the server.
- Redirect unauthenticated users to `/login`.
- Redirect unauthorised users to `/unauthorized`.
- Enforce permissions in route handlers and server actions, not only in the UI.
- Never trust a role or college ID supplied by the client.
- Scope student and parent queries to their own linked records in addition to
  the college.

### Schema domains

Implemented in the first migration:

1. Identity: `User`, `Membership`, `Invitation`, `PasswordResetToken`,
   `AuditLog`.
2. Institution: `College`, `AcademicTerm`.

Planned vertical slices:

3. Academics: `Department`, `Program`, `Course`, `CourseOffering`, `Section`,
   `Enrollment`.
4. Attendance: `AttendanceSession`, `AttendanceRecord`, `AttendancePolicy`.
5. Examinations: `Examination`, `ExamSchedule`, `AssessmentComponent`, `Mark`,
   `Result`, `HallTicket`, `RevaluationRequest`.
6. Finance: `FeeStructure`, `Invoice`, `Payment`, `Scholarship`, `LedgerEntry`.
7. Communication: `Announcement`, `Notification`, `Message`, `Grievance`.

## 8. Module implementation pattern

For each module:

1. Add the route under the correct role group.
2. Call `requireRole()` or `requirePermission()` in the page or action.
3. Define the data contract and Zod schema.
4. Add the Prisma model and a reviewed migration.
5. Implement tenant-scoped queries and mutations with `TenantContext`.
6. Write audit records inside mutation transactions.
7. Replace `ModulePlaceholder` with real components and all UI states.
8. Add unit tests, a cross-tenant test, and a Playwright flow.
9. Run `npm run check` and `npm run build` sequentially.

## 9. Conventions

- File names: PascalCase for components, lowercase route folders, camelCase for
  utilities.
- Imports: use the `@/` alias for `src/`.
- Server/client boundary: keep `"use client"` as low in the tree as possible.
- Accessibility: label every input, give icon-only buttons an `aria-label`, and
  keep focus-visible styles.
- No hardcoded tenant, term, or user identity. Dashboard fixtures in
  `src/data/demo/` are temporary display data, not authorization inputs.
- No direct `fetch` in client components when a server component can query.
- Do not add a second layout shell.
- Add domain code to `src/features/<domain>/`, not to `src/lib/`.

## 10. Testing and CI

Current gate:

```bash
npm run check      # Prettier + TypeScript + ESLint
npm run build      # production build
```

Run them sequentially because both touch `.next/types`.

Next:

- Vitest + React Testing Library for logic and component tests.
- A disposable PostgreSQL service in CI for migration, seed, and tenant tests.
- Playwright for authentication, attendance, marks entry, and fee payment.
- Accessibility checks with axe on primary screens.

CI runs formatting, lint, type-check, and build on every push and pull request.
The build runs `prisma generate` first; migrations are applied separately during
deployment.

## 11. Design assets and version control

- Mockup screenshots are tracked with Git LFS.
- HTML mockups remain regular Git files.
- Do not rename mockup folders; they are stable screen IDs.
- Regenerate the inventory with `npm run screens:index`.

## 12. Known constraints

- Academic modules still render placeholders; the first vertical slice has not
  started.
- Authentication is credentials-only. SSO, MFA, and login rate limiting are not
  implemented.
- The invitation schema exists, but invitation delivery and acceptance are not
  wired.
- Supabase Storage, payment adapters, and the notification pipeline are not
  implemented.
- Dashboard metrics in `src/data/demo/` are display fixtures, not database
  queries.
- Automated database, component, and Playwright tests are not set up yet.
- The 143 mockups use Tailwind CDN, external images, and inline JavaScript.
  Treat them as visual references, not source code.
- The pre-restructure build artifact is preserved at
  `/tmp/opencode/college-os-next-stale-20261027` for forensics.

See [`BACKEND.md`](BACKEND.md) for the backend contract,
[`ROADMAP.md`](ROADMAP.md) for delivery phases, and
[`SCREEN_MAP.md`](SCREEN_MAP.md) for the screen inventory.
