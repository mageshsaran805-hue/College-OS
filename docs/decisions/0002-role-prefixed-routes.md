# ADR 0002: Role-Prefixed Routes

## Status

Accepted — 31 October 2026.

## Context

The scaffold mixed student and faculty pages under one `(portal)` group. The
platform serves students, faculty, staff, parents, administrators, auditors, and
super-admins, each with different navigation and permissions.

## Decision

Use explicit role prefixes:

- `/student/...`
- `/faculty/...`
- `/parent/...`
- `/admin/...`
- `/platform/...`

Each prefix has its own route group and layout. `/` redirects to the signed-in
user's role home once authentication exists; until then it redirects to
`/student/dashboard`.

## Consequences

- Route-level authorization is simpler and explicit.
- Navigation and breadcrumb configuration is role-specific.
- A user with multiple roles needs a workspace switcher.
- Public URLs remain stable and shareable within a role.
