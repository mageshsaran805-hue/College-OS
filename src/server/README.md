# Server Boundaries

Cross-cutting server code belongs here. Nothing in this directory may be
imported by a client component.

```text
server/
├── auth/          # session resolution, password reset, invitations
├── db/            # Prisma client, tenant-scoped repositories
├── permissions/   # permission checks and role mappings
├── audit/         # immutable audit-log writes
├── storage/       # local and Supabase storage adapters
├── email/         # SMTP and development log adapters
└── payments/      # sandbox and gateway adapters
```

## Rules

- Resolve the session and active college on the server for every protected
  request.
- Every tenant-owned query receives a `TenantContext`; repository functions
  must not accept a college ID from the browser.
- Mutations run in a transaction when they touch multiple tables.
- Every mutation writes an audit entry.
- Payment and email integrations sit behind interfaces; business logic depends
  on the interface, not a vendor SDK.

These modules will be added as the backend foundation is implemented.
