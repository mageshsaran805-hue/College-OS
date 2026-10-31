# Contributing

## Setup

```bash
git lfs install
npm install
npm run dev
```

Screenshots are stored with Git LFS. Without LFS, mockup images will be pointer
files.

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
