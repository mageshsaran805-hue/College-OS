# College OS

A multi-college operating system for academics, attendance, examinations,
finance, campus operations, placement, and institutional analytics.

This repository contains a runnable Next.js frontend scaffold and the complete
design reference for 143 screens. The backend, authentication, and database are
not implemented yet.

## Status

| Area                    | State                                       |
| ----------------------- | ------------------------------------------- |
| Next.js app shell       | ✅ Runnable                                 |
| Design tokens           | ✅ Canonical set in `tailwind.config.ts`    |
| Student, faculty, admin | ✅ Role-specific shells                     |
| Sample pages            | ✅ Dashboards, admin overview, auth screens |
| Module routes           | 🟡 Scaffolded placeholders                  |
| Authentication / RBAC   | ❌ Not wired                                |
| Database / API          | ❌ Not wired                                |
| Design mockups          | ✅ Preserved under `design/mockups/`        |

## Quick start

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000` → redirects to `/student/dashboard`
- `http://localhost:3000/student/dashboard` → student demo workspace
- `http://localhost:3000/faculty/dashboard` → faculty demo workspace
- `http://localhost:3000/admin` → admin demo workspace
- `http://localhost:3000/login` → sign-in scaffold
- `http://localhost:3000/api/health` → health check

The demo layouts use fixed identities from `src/data/demo/`. They are clearly
marked as demo data and are not an authentication mechanism.

## Scripts

```bash
npm run dev            # start the development server
npm run build          # production build
npm run start          # serve the production build
npm run lint           # ESLint
npm run format         # write Prettier formatting
npm run format:check   # verify formatting
npm run type-check     # TypeScript without emitting
npm run check          # format + type-check + lint
npm run screens:index  # regenerate the mockup inventory
npm run clean          # remove the Next.js build cache
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
│   ├── ROADMAP.md                # delivery phases
│   ├── SCREEN_MAP.md             # mockup inventory and mapping
│   ├── CONTRIBUTING.md           # conventions and workflow
│   ├── decisions/                # architecture decision records
│   └── archive/                  # historical analysis and manifests
├── scripts/
│   └── generate-screen-index.mjs # mockup inventory generator
├── src/
│   ├── app/
│   │   ├── (auth)/               # login, forgot-password, reset-password
│   │   ├── (student)/student/    # student workspace
│   │   ├── (faculty)/faculty/    # faculty workspace
│   │   ├── (admin)/admin/        # administration workspace
│   │   ├── api/health/           # health route
│   │   ├── layout.tsx            # root layout and metadata
│   │   ├── page.tsx              # redirects to /student/dashboard
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/               # AppShell, Sidebar, Header
│   │   ├── scaffold/             # temporary module placeholders
│   │   └── ui/                   # design-system primitives
│   ├── features/                 # domain modules (added per vertical slice)
│   ├── server/                   # auth, db, permissions, audit (planned)
│   ├── config/                   # site metadata and navigation
│   ├── data/demo/                # temporary demo data
│   ├── lib/                      # utilities and role helpers
│   └── types/                    # shared TypeScript types
├── .env.example                  # planned backend configuration
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Route map

### Authentication

| Route              | Purpose                |
| ------------------ | ---------------------- |
| `/login`           | Sign-in scaffold       |
| `/forgot-password` | Password reset request |
| `/reset-password`  | Password reset form    |

### Student workspace

| Route                    | Purpose                       |
| ------------------------ | ----------------------------- |
| `/student/dashboard`     | Student demo dashboard        |
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
| `/unauthorized`        | 403 page                                  |
| `/api/health`          | Health check                              |

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

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — routing, components, data/auth
  plan, conventions.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — delivery phases and scope.
- [`docs/SCREEN_MAP.md`](docs/SCREEN_MAP.md) — all 143 design screens.
- [`docs/archive/project-analysis-2026-10.md`](docs/archive/project-analysis-2026-10.md) —
  historical audit record.
- [`design/README.md`](design/README.md) — how to use the mockups.
- [`design/DESIGN_SYSTEM.md`](design/DESIGN_SYSTEM.md) — token specification.

## Repository notes

- Design screenshots are stored with Git LFS. Run `git lfs install` before
  cloning or checking out the mockups.
- `.env.example` describes the planned Prisma/Supabase/storage/email
  configuration. Those dependencies and integrations are not present yet.
- The design mockups use Tailwind CDN and external image URLs. They are
  reference material, not production assets.
- The pre-restructure build artifact was preserved at
  `/tmp/opencode/college-os-next-stale-20261027` for forensics; see
  [`docs/archive/previous-build-manifest.md`](docs/archive/previous-build-manifest.md).
