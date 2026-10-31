# Server Boundaries

Cross-cutting server code belongs here. Nothing in this directory may be
imported by a client component.

```text
server/
├── auth/          # Auth.js config, tenant context, passwords, reset tokens
├── db/            # Prisma client and tenant-scoped repositories
├── permissions/   # permission checks and role mappings
├── audit/         # immutable audit-log writes and request metadata
├── email/         # SMTP and development log adapters
├── storage/       # planned local and Supabase storage adapters
└── payments/      # planned sandbox and gateway adapters
```

## Rules

- Resolve the session and active college on the server for every protected
  request.
- `requireTenant()` returns the database-verified user, membership, college, and
  current term.
- Every tenant-owned query receives a `TenantContext`; repository functions
  must not accept a college ID from the browser.
- Server actions call `requirePermission()` before mutations.
- Mutations run in a transaction when they touch multiple tables.
- Regulated mutations write an audit entry in the same transaction.
- Payment and email integrations sit behind interfaces; business logic depends
  on the interface, not a vendor SDK.
- Do not import these modules from client components.

The implemented boundary contract is documented in
[`docs/BACKEND.md`](../../docs/BACKEND.md).
