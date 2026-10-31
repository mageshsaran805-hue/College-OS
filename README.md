# College OS

A multi-college operating system for academics, attendance, examinations,
finance, campus operations, placement, and institutional analytics.

This repository contains a runnable Next.js foundation with a Prisma schema,
credentials authentication, server-resolved tenant context, role-based access
control, audit logging, and the complete design reference for 143 screens.
Academic modules remain scaffolded until their vertical slices begin.

## Status

| Area                           | State                                          |
| ------------------------------ | ---------------------------------------------- |
| Next.js app shell              | ✅ Runnable                                    |
| Design tokens                  | ✅ Canonical set in `tailwind.config.ts`       |
| Student, faculty, admin shells | ✅ Role-specific and server-guarded            |
| Database schema                | ✅ PostgreSQL + Prisma, initial migration      |
| Authentication                 | ✅ Auth.js credentials + JWT sessions          |
| Multi-college isolation        | ✅ Membership-scoped tenant context            |
| RBAC                           | ✅ Server-side permission map                  |
| Audit logging                  | ✅ Sign-in and password-reset events           |
| Password reset                 | ✅ Console email in development; SMTP optional |
| Module routes                  | 🟡 Scaffolded placeholders                     |
| Academic data                  | ❌ Not implemented                             |
| File storage / payments        | ❌ Adapters not implemented                    |
| Design mockups                 | ✅ Preserved under `design/mockups/`           |

## Quick start

```bash
cp .env.example .env
# Fill in DATABASE_URL, DIRECT_URL, AUTH_SECRET, APP_URL, and AUTH_URL.
npm install
npm run db:deploy
npm run db:seed
npm run dev
```

Generate `AUTH_SECRET` with:

```bash
openssl rand -base64 32
```

The initial migration creates the identity, college, term, membership,
invitation, password-reset, and audit-log tables. `npm run db:seed` creates two
colleges with one active term each.

### Seeded accounts

The default development password is `CollegeOS!2026`. Set
`SEED_DEMO_PASSWORD` before seeding to use a different password.

| College                 | Role    | Email                 |
| ----------------------- | ------- | --------------------- |
| Apex Institute of Tech. | Student | `student@apex.edu`    |
| Apex Institute of Tech. | Faculty | `faculty@apex.edu`    |
| Apex Institute of Tech. | Admin   | `admin@apex.edu`      |
| Apex Institute of Tech. | Auditor | `auditor@apex.edu`    |
| Horizon Business School | Student | `student@horizon.edu` |
| Horizon Business School | Faculty | `faculty@horizon.edu` |
| Horizon Business School | Admin   | `admin@horizon.edu`   |

These are development fixtures. Replace them before deploying.

Open:

- `http://localhost:3000` → role-aware workspace redirect
- `http://localhost:3000/login` → institutional sign-in
- `http://localhost:3000/student/dashboard` → student workspace
- `http://localhost:3000/faculty/dashboard` → faculty workspace
- `http://localhost:3000/admin` → administration workspace
- `http://localhost:3000/api/health` → liveness check
- `http://localhost:3000/api/auth/*` → Auth.js handlers

Every protected workspace resolves the active membership from the session on the
server. A student session cannot open faculty or admin routes.

## Scripts

```bash
npm run dev            # start the development server
npm run build          # generate Prisma client and build for production
npm run start          # serve the production build
npm run lint           # ESLint
npm run format         # write Prettier formatting
npm run format:check   # verify formatting
npm run type-check     # TypeScript without emitting
npm run check          # format + type-check + lint
npm run screens:index  # regenerate the mockup inventory
npm run clean          # remove the Next.js build cache

npm run db:generate    # regenerate the Prisma client
npm run db:migrate     # create and apply a development migration
npm run db:deploy      # apply committed migrations
npm run db:seed        # seed the two-college development dataset
npm run db:studio      # inspect data with Prisma Studio
npm run db:reset       # reset the database and rerun seed
```

Run `npm run check` and `npm run build` sequentially, not concurrently: both
touch `.next/types`.

## Project structure

```text
.
├── design/
│   ├── DESIGN_SYSTEM.md          # canonical design tokens and guidance
│   ├── README.md                 # how to use the mockups
│   └── mockups/                  # 143 HTML screens + 142 screenshots (LFS)
├── docs/
│   ├── ARCHITECTURE.md           # how the app is put together
│   ├── BACKEND.md                # database, auth, tenancy, and permissions
│   ├── ROADMAP.md                # delivery phases
│   ├── SCREEN_MAP.md             # mockup inventory and mapping
│   ├── CONTRIBUTING.md           # conventions and workflow
│   ├── decisions/                # architecture decision records
│   └── archive/                  # historical analysis and manifests
├── prisma/
│   ├── schema.prisma             # multi-tenant data model
│   ├── migrations/               # committed SQL migrations
│   └── seed.ts                   # two-college development dataset
├── scripts/
│   └── generate-screen-index.mjs # mockup inventory generator
├── src/
│   ├── app/
│   │   ├── (auth)/               # login, forgot-password, reset-password
│   │   ├── (student)/student/    # student workspace
│   │   ├── (faculty)/faculty/    # faculty workspace
│   │   ├── (admin)/admin/        # administration workspace
│   │   ├── api/auth/             # Auth.js route handlers
│   │   ├── api/health/           # liveness route
│   │   ├── layout.tsx            # root layout and metadata
│   │   ├── page.tsx              # role-aware redirect
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/               # AppShell, Sidebar, Header
│   │   ├── scaffold/             # temporary module placeholders
│   │   └── ui/                   # design-system primitives
│   ├── features/
│   │   └── auth/                 # auth schemas, actions, and forms
│   ├── server/
│   │   ├── auth/                 # Auth.js config, tenant, password reset
│   │   ├── audit/                # audit writes and request metadata
│   │   ├── db/                   # Prisma client singleton
│   │   ├── email/                # SMTP and development log adapter
│   │   └── permissions/          # role-to-permission map
│   ├── config/                   # site metadata and navigation
│   ├── data/demo/                # temporary dashboard fixtures
│   ├── lib/                      # utilities and role helpers
│   └── types/                    # shared and Auth.js types
├── auth.ts                       # Auth.js exports
├── .env.example                  # backend configuration template
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Authentication and tenancy

- Auth.js uses a credentials provider backed by bcrypt password hashes.
- Sessions are signed JWT cookies with an eight-hour lifetime.
- The server resolves the active `Membership` on every protected request; the
  browser cannot supply a college ID, role, or user ID.
- `TenantContext` contains the authenticated user, active college, current term,
  and role from the database.
- A student only receives the student workspace; faculty/staff receive the
  faculty workspace; admins and auditors receive the administration workspace.
- Password resets increment `User.sessionVersion`, invalidating older sessions.
- Sign-in and password-reset events are written to `AuditLog`.

See [`docs/BACKEND.md`](docs/BACKEND.md) for the schema, environment, permission
map, migration workflow, and module checklist.

## Route map

### Authentication

| Route              | Purpose                         |
| ------------------ | ------------------------------- |
| `/login`           | Credentials sign-in             |
| `/forgot-password` | Request a password-reset link   |
| `/reset-password`  | Consume a reset token           |
| `/unauthorized`    | Role and permission denial page |

### Student workspace

| Route                    | Purpose                       |
| ------------------------ | ----------------------------- |
| `/student/dashboard`     | Student dashboard             |
| `/student/academics`     | Academics module placeholder  |
| `/student/attendance`    | Attendance module placeholder |
| `/student/examinations`  | Examinations and results      |
| `/student/fees`          | Fees and payments             |
| `/student/library`       | Library                       |
| `/student/documents`     | Document vault                |
| `/student/placements`    | Placements                    |
| `/student/clubs`         | Clubs and events              |
| `/student/notifications` | Notifications                 |
| `/student/grievances`    | Grievances                    |
| `/student/profile`       | Profile                       |
| `/student/timetable`     | Timetable                     |

### Faculty workspace

| Route                    | Purpose                      |
| ------------------------ | ---------------------------- |
| `/faculty/dashboard`     | Faculty overview placeholder |
| `/faculty/marks`         | Marks entry placeholder      |
| `/faculty/materials`     | Course materials placeholder |
| `/faculty/notifications` | Notifications                |
| `/faculty/profile`       | Profile                      |

### Administration

| Route                  | Purpose                                   |
| ---------------------- | ----------------------------------------- |
| `/admin`               | Admin overview                            |
| `/admin/users`         | User management placeholder               |
| `/admin/roles`         | Roles and permissions placeholder         |
| `/admin/audit`         | Audit logs placeholder                    |
| `/admin/notifications` | Admin notification governance placeholder |
| `/admin/settings`      | Settings placeholder                      |
| `/api/health`          | Liveness check                            |

> The 143 mockups cover far more screens than the current route scaffold. See
> [`docs/SCREEN_MAP.md`](docs/SCREEN_MAP.md) for the full inventory.

## Design system

- Tokens live in `tailwind.config.ts` and `design/DESIGN_SYSTEM.md`.
- Color names follow the Material 3-style role naming used by the mockups
  (`surface`, `on-surface`, `secondary`, `outline`, etc.).
- Semantic status colors cover accessible success, warning, and info states.
- `rounded-full` is `9999px`, so avatars and pills render correctly.
- Shared primitives: `Button`, `Input`, `KPICard`, `StatusBadge`,
  `CircularProgress`, `PageHeader`, `EmptyState`.
- Layout: one `AppShell` with a responsive `Sidebar` and `Header`.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — routing, components, and
  system boundaries.
- [`docs/BACKEND.md`](docs/BACKEND.md) — database, auth, tenancy, permissions,
  audit, and deployment setup.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — delivery phases and scope.
- [`docs/SCREEN_MAP.md`](docs/SCREEN_MAP.md) — all 143 design screens.
- [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) — conventions and workflow.
- [`docs/archive/project-analysis-2026-10.md`](docs/archive/project-analysis-2026-10.md) —
  historical audit record.
- [`design/README.md`](design/README.md) — how to use the mockups.
- [`design/DESIGN_SYSTEM.md`](design/DESIGN_SYSTEM.md) — token specification.

## Repository notes

- Design screenshots are stored with Git LFS. Run `git lfs install` before
  cloning or checking out the mockups.
- `.env` is ignored. Never commit database credentials, Auth.js secrets, or SMTP
  passwords.
- Supabase Storage and the payment adapters are not implemented yet. The email
  adapter writes reset links to the server log when SMTP is unset in development
  and refuses to send in production without SMTP.
- The design mockups use Tailwind CDN and external image URLs. They are
  reference material, not production assets.
- The pre-restructure build artifact was preserved at
  `/tmp/opencode/college-os-next-stale-20261027` for forensics; see
  [`docs/archive/previous-build-manifest.md`](docs/archive/previous-build-manifest.md).
