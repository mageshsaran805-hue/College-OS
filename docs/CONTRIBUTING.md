# Contributing

## Setup

```bash
git lfs install
cp .env.example .env
# Fill in DATABASE_URL, DIRECT_URL, AUTH_SECRET, APP_URL, and AUTH_URL.
npm install
npm run db:deploy
npm run db:seed
npm run dev
```

Screenshots are stored with Git LFS. Without LFS, mockup images will be pointer
files. Never commit `.env`.

## Database changes

```bash
npm run db:migrate -- --name describe_the_change
```

- Review the generated SQL before committing it.
- Never edit an applied migration; add a new one.
- Keep the seed idempotent.
- Every tenant-owned model carries `collegeId`.
- Migrations must be applied with `npm run db:deploy` before the app starts in a
  new environment.

## Authentication and authorization

- Resolve identity on the server. Never trust a role, user ID, or college ID from
  the browser.
- Protected layouts use `requireRole()`.
- Feature queries use `requireTenant()` and scope by `tenant.college.id`.
- Server actions call `requirePermission()` before mutations.
- Student and parent queries must also scope rows to the authenticated user or
  their linked student.
- Write audit rows inside the same transaction as regulated mutations.
- Add a cross-tenant test before merging any new data-access path.

See [`BACKEND.md`](BACKEND.md) for the full contract.

## Before committing

Run these sequentially:

```bash
npm run check
npm run build
```

`check` runs Prettier, TypeScript, and ESLint. `build` runs the production
compiler. Do not run them in parallel because both touch `.next/types`.

## Route rules

- Student routes: `src/app/(student)/student/<route>/page.tsx`
- Faculty routes: `src/app/(faculty)/faculty/<route>/page.tsx`
- Admin routes: `src/app/(admin)/admin/<route>/page.tsx`
- Auth routes: `src/app/(auth)/<route>/page.tsx`
- Use the role group's existing layout; do not create a second shell.
- Add the route to the relevant navigation config in `src/config/navigation.ts`.
- If the route is not implemented, use `ModulePlaceholder` and record it in
  `docs/SCREEN_MAP.md`.

## Feature modules

Add domain code under `src/features/<domain>/`. Follow the structure in
`src/features/README.md`.

- Components: PascalCase.
- Utilities and functions: camelCase.
- Types: `PascalCase` interfaces.
- Zod schemas: `<domain>.schema.ts` or `schemas.ts`.
- Server services must receive tenant and permission context explicitly.
- Never import server-only modules into client components.

## Design system

- Use tokens from `tailwind.config.ts`; do not add raw hex values.
- Use `cn()` for conditional classes.
- Reuse `Button`, `Input`, `PageHeader`, `StatusBadge`, and `EmptyState`.
- Use `rounded-lg` for controls, `rounded-xl` for panels, `rounded-full` for
  pills and avatars.
- Check every page at mobile and desktop widths.

## Mockups

- Mockups live in `design/mockups/<screen_id>/`.
- Do not rename folders; they are stable identifiers.
- `code.html` is visual reference only. Translate it into React; do not copy it
  into the app.
- Add a screenshot as `screen.png` when a new screen is designed.
- Regenerate the inventory with `npm run screens:index`.

## Commits

Use imperative, scoped messages:

```text
feat(attendance): add subject-wise summary
fix(auth): reject expired reset tokens
refactor(routes): move faculty pages under /faculty
docs(architecture): document tenant boundaries
```

Keep commits focused. Do not commit `.env`, build output, or storage files.

## Secrets

- Never commit credentials, tokens, or private keys.
- Use `.env.example` to document required variables.
- Production secrets belong in the deployment platform, not the repository.
