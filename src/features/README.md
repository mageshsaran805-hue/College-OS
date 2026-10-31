# Feature Modules

Domain code belongs here. A feature is created only when its first vertical
slice begins; do not add empty module folders in advance.

```text
features/<domain>/
├── components/     # domain-specific UI
├── server/         # queries, mutations, services
├── schemas.ts      # Zod schemas shared by forms and server actions
└── types.ts        # domain types not already in src/types
```

## Rules

- Route files in `src/app/` stay thin: parse params, guard access, call a
  feature service, render components.
- Feature code must receive the active tenant and authorization context from
  `src/server/`; never read them from client input.
- Cross-feature imports are allowed only through a public `index.ts` or a
  documented service. Shared UI belongs in `src/components/`.
- Server-only modules must not be imported into client components.
- A feature is not complete until it has loading, empty, error, and
  permission-denied states.

## Planned domains

`academics`, `attendance`, `examinations`, `finance`, `people`, `institution`,
`communication`, `library`, `campus`, `placement`, `analytics`, `platform`.
