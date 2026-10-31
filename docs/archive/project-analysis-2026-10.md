# Project Analysis and Restructuring Record

## 1. Before restructuring

The repository contained three unrelated layers:

| Layer          | What it was                                                             | Size                         |
| -------------- | ----------------------------------------------------------------------- | ---------------------------- |
| Design mockups | 143 `code.html` screens + 142 `screen.png` screenshots                  | 8.3 MB HTML + 74.3 MB images |
| App scaffold   | Next.js 15 + React 19 + TypeScript + Tailwind, but only 12 source files | ~38 KB                       |
| Build artifact | A stale `.next` build of an earlier, different app                      | 96 MB                        |

The project was not under version control and had no `node_modules` or lockfile.

### Key findings

1. **The current scaffold was not runnable.** There was no root layout, no home
   page, no middleware, no API routes, and 46 of 48 route directories were
   empty.
2. **The `.next` build did not match the source.** It contained 43 page routes,
   5 API routes, middleware, and chunks for Prisma, Supabase, `lucide-react`,
   `zod`, and `bcryptjs`. The current `package.json` declared none of those.
3. **Design tokens were incomplete.** `on-surface`, `on-surface-variant`,
   `on-background`, and `surface-container-highest` were missing from
   `tailwind.config.ts`, despite being used throughout the components.
4. **`rounded-full` was broken.** It was overridden to `0.75rem`, so avatars
   were not circular and pills were not true capsules. The design spec says
   `9999px`.
5. **Two competing shells existed.** `PageShell`/`Sidebar`/`Header` (288px) and
   `PortalSidebar`/`PortalHeader` (256px) duplicated navigation and layout.
6. **Demo data was hardcoded in components.** The sidebar and header showed a
   fixed college, term, notification count, and a “Dean” badge for every user.
7. **Component bugs.** `KPICard` rendered trend values twice and always showed
   a status chip. `StatusBadge` used conflicting colors, including invisible
   warning text.
8. **The mockups were monolithic.** All 143 loaded Tailwind CDN, had 4,237
   dead `href="#"` links, no page titles, and 223 remote image URLs.
9. **Documentation was stale.** `FRONTEND_ANALYSIS.md` said there was no
   package.json or component library, which was no longer true. `DESIGN.md`
   contradicted its own radius tokens and prose palette.

## 2. What changed

### Repository structure

- Moved all 143 mockup directories to `design/mockups/<screen>/`.
- Moved the design specification to `design/DESIGN_SYSTEM.md`.
- Moved the old analysis to `docs/archive/frontend-analysis-v1.md`.
- Preserved the pre-restructure build at
  `/tmp/opencode/college-os-next-stale-20261027` and rebuilt `.next/` from the
  new source.
- Added `README.md`, `docs/ARCHITECTURE.md`, and this document.
- Added `design/README.md` with preview instructions and usage rules.

### Application foundation

- Added a root layout with metadata and viewport settings.
- Added a root page that redirects to `/dashboard`.
- Added `not-found.tsx`, `/unauthorized`, and `/api/health`.
- Added `(auth)`, `(portal)`, and `(admin)` route-group layouts.
- Added the first runnable pages: login, forgot password, reset password,
  student dashboard, admin overview, and scaffolded module routes.
- Removed the accidental nested `src/app/app/(admin)` route tree and all empty
  route directories.

### Design system

- Consolidated `PageShell`, `Sidebar`, `Header`, `PortalSidebar`, and
  `PortalHeader` into one `AppShell` with a responsive `Sidebar` and `Header`.
- Added missing color tokens.
- Added accessible success, warning, and info token families.
- Restored `rounded-full` to `9999px`.
- Added `Button`, `Input`, `PageHeader`, and `EmptyState` primitives.
- Fixed `KPICard` trend duplication, status rendering, and icon tone mapping.
- Fixed `StatusBadge` contrast and conflicting classes.
- Replaced remote logos and avatars with local initials/marks.
- Centralized navigation in `src/config/navigation.ts`.
- Centralized demo identities and site metadata in `src/config/site.ts`.

### Configuration

- Added ESLint configuration and dependencies.
- Added `.editorconfig`.
- Added `type-check`, `lint`, and `check` scripts.
- Expanded `.gitignore` for test, coverage, and deployment output.
- Excluded `design/` from TypeScript compilation.

## 3. Current state

The app now has:

- One shared application shell.
- Two role-specific navigation sets (portal and admin).
- A canonical token set.
- A runnable set of routes.
- Clear separation between design references, documentation, and source.
- No database, authentication, or backend.

### Verified checks

| Check                 | Result                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run type-check`  | ✅ Passed                                                                                      |
| `npm run lint`        | ✅ Passed with `--max-warnings=0`                                                              |
| `npm run build`       | ✅ Passed — 30 static routes + dynamic `/api/health`                                           |
| Production smoke test | ✅ `/dashboard`, `/admin`, `/login`, `/api/health` return 200; `/` returns 307 to `/dashboard` |
| Health endpoint       | ✅ Returns `{"status":"ok","service":"College OS","version":"4.3.0"}`                          |

## 4. Remaining risks

1. **The earlier full application is still unaccounted for.** The `.next`
   artifact shows a substantially more complete app existed on Oct 27. If that
   source was accidentally removed, it should be restored from a backup before
   building further. See `docs/archive/previous-build-manifest.md`.
2. **No version control.** The project should be initialized as a Git repository
   and committed before feature work.
3. **No authentication.** All routes are currently public and use demo
   identities.
4. **No database.** `.env.example` describes a backend that does not exist.
5. **Mockup fidelity is not automatic.** The React scaffold implements the
   design language, not every screen.
6. **Design artifacts are large.** The 143 screenshots total ~74 MB; use Git LFS
   or an external asset store if repository size matters.

## 5. Recommended next steps

1. Initialize Git and commit the restructured baseline.
2. Confirm whether to restore the earlier app or continue from this scaffold.
3. Implement authentication and session handling.
4. Define the Prisma schema and seed data.
5. Build vertical slices, starting with the student dashboard → attendance →
   examinations → fees.
6. Add tests and CI.
7. Convert modules one at a time, replacing `ModulePage` placeholders only when
   the real data and permission model exist.
