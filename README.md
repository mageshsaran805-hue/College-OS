# College OS

A unified college operating system for academics, attendance, examinations, finance, campus operations, placement, and institutional analytics.

This repository currently contains a **runnable frontend scaffold** plus the complete **design specification** for 143 screens. Authentication, the database, and the backend modules are not implemented yet.

## Status

| Area | State |
|---|---|
| Next.js app shell | ✅ Runnable |
| Design tokens | ✅ Canonical set in `tailwind.config.ts` |
| Portal and admin layouts | ✅ One shared `AppShell` |
| Sample pages | ✅ Dashboard, admin overview, auth screens |
| Module routes | 🟡 Scaffolded placeholders |
| Authentication / RBAC | ❌ Not wired |
| Database / API | ❌ Not wired |
| Design mockups | ✅ Preserved under `design/mockups/` |

## Quick start

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000` → redirects to `/dashboard`
- `http://localhost:3000/dashboard` → student demo workspace
- `http://localhost:3000/admin` → admin demo workspace
- `http://localhost:3000/login` → sign-in scaffold
- `http://localhost:3000/api/health` → health check

The demo layouts use fixed identities from `src/config/site.ts`. They are clearly marked as demo data and are not an authentication mechanism.

## Scripts

```bash
npm run dev          # start the development server
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run type-check   # TypeScript without emitting
npm run check        # type-check + lint
```

## Project structure

```text
.
├── design/
│   ├── DESIGN_SYSTEM.md          # canonical design tokens and guidance
│   ├── README.md                 # how to use the mockups
│   └── mockups/                  # 143 HTML screens + 142 screenshots
├── docs/
│   ├── ARCHITECTURE.md           # how the app is put together
│   ├── PROJECT_ANALYSIS.md       # audit and restructuring record
│   └── archive/                  # historical analysis
├── src/
│   ├── app/
│   │   ├── (auth)/               # login, forgot-password, reset-password
│   │   ├── (portal)/             # student/faculty/parent workspace
│   │   ├── (admin)/admin/        # administration workspace
│   │   ├── api/health/           # health route
│   │   ├── layout.tsx            # root layout and metadata
│   │   ├── page.tsx              # redirects to /dashboard
│   │   ├── not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/               # AppShell, Sidebar, Header
│   │   ├── shared/               # composed shared components
│   │   └── ui/                   # design-system primitives
│   ├── config/                   # site metadata and navigation
│   ├── data/                     # demo-only data
│   ├── lib/                      # utilities and RBAC helpers
│   └── types/                    # shared TypeScript types
├── .env.example                  # planned backend configuration
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Route map

| Route | Purpose |
|---|---|
| `/login` | Sign-in scaffold |
| `/forgot-password` | Password reset request |
| `/reset-password` | Password reset form |
| `/dashboard` | Student demo dashboard |
| `/academics` | Academics module placeholder |
| `/attendance` | Attendance module placeholder |
| `/examinations` | Examinations and results placeholder |
| `/examinations/marks` | Faculty marks entry placeholder |
| `/fees` | Fees and payments placeholder |
| `/library` | Library placeholder |
| `/documents` | Document vault placeholder |
| `/placements` | Placement module placeholder |
| `/clubs` | Clubs and events placeholder |
| `/notifications` | Notifications placeholder |
| `/grievances` | Grievances placeholder |
| `/profile` | Profile placeholder |
| `/materials` | Faculty course materials placeholder |
| `/timetable` | Timetable placeholder |
| `/admin` | Admin overview |
| `/admin/users` | User management placeholder |
| `/admin/roles` | Roles and permissions placeholder |
| `/admin/audit` | Audit logs placeholder |
| `/admin/notifications` | Admin notification governance placeholder |
| `/admin/settings` | Settings placeholder |
| `/unauthorized` | 403 page |
| `/api/health` | Health check |

> The 143 mockups cover far more screens than the current route scaffold. See `design/mockups/` for the full inventory.

## Design system

- Tokens live in `tailwind.config.ts` and `design/DESIGN_SYSTEM.md`.
- Color names follow the Material 3-style role naming used by the mockups (`surface`, `on-surface`, `secondary`, `outline`, etc.).
- Semantic status colors were added for accessible success, warning, and info states.
- `rounded-full` is restored to `9999px`, so avatars and pills render correctly.
- Shared primitives: `Button`, `Input`, `KPICard`, `StatusBadge`, `CircularProgress`, `PageHeader`, `EmptyState`.
- Layout: one `AppShell` with a responsive `Sidebar` and `Header`.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — routing, components, data/auth plan, conventions, roadmap.
- [`docs/PROJECT_ANALYSIS.md`](docs/PROJECT_ANALYSIS.md) — what was found, what changed, and what remains.
- [`design/README.md`](design/README.md) — how to use the 143 mockups.
- [`design/DESIGN_SYSTEM.md`](design/DESIGN_SYSTEM.md) — token and visual specification.

## Important notes

- `.next/` now contains a fresh production build. The pre-restructure build artifact was preserved at `/tmp/opencode/college-os-next-stale-20261027` for forensics; see [`docs/archive/previous-build-manifest.md`](docs/archive/previous-build-manifest.md). It is not part of the project.
- `.env.example` describes the planned Prisma/Supabase/storage/email configuration. Those dependencies and integrations are not present yet; do not assume the backend exists.
- The design mockups use Tailwind CDN and external image URLs. They are reference material, not production assets.
- The repository is not currently under Git version control. Initialize a repository before starting feature work.
