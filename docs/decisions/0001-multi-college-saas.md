# ADR 0001: Multi-College SaaS Tenancy

## Status

Accepted — 31 October 2026.

## Context

The design set includes a college directory, college onboarding, subscription
management, platform settings, and a super-admin dashboard. These screens only
make sense if one deployment serves multiple institutions.

## Decision

College OS is a multi-college SaaS platform.

- `College` is the tenant root.
- Users join colleges through `Membership`.
- Every tenant-owned table carries `collegeId`.
- Server-side repository functions require a `TenantContext`.
- Super-admins use a separate platform role with audited impersonation.
- V1 resolves the active college from the server session; subdomain branding is
  a later addition that does not change the schema.

## Consequences

- Cross-tenant isolation must be tested on every data-access path.
- Unique constraints are scoped to a college where appropriate.
- Platform-level screens need a separate route group and permission model.
- The first usable release can still target a single pilot college while the
  schema remains multi-tenant.
