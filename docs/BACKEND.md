# Backend Foundation

## 1. Runtime shape

```text
Browser
  → Next.js route group layout
  → Auth.js session (signed JWT cookie)
  → TenantContext (database-verified membership + college + current term)
  → Role and permission check
  → Feature query scoped by TenantContext.college.id
  → Server-rendered page or server action
```

- Auth.js owns credentials sign-in, session signing, and sign-out.
- Prisma is the only database access path.
- The browser never supplies the active college, role, user ID, or membership ID.
- Protected route groups call `requireRole()` in their layout.
- Feature code calls `requireTenant()` and scopes every query by
  `tenant.college.id`.

## 2. Environment

| Variable             | Required | Purpose                                               |
| -------------------- | -------- | ----------------------------------------------------- |
| `DATABASE_URL`       | Yes      | Pooled Supabase PostgreSQL connection used by the app |
| `DIRECT_URL`         | Yes      | Direct PostgreSQL connection used by migrations       |
| `AUTH_SECRET`        | Yes      | Auth.js JWT signing secret                            |
| `AUTH_URL`           | Yes      | Canonical application URL for Auth.js                 |
| `APP_URL`            | Yes      | Base URL for password-reset links                     |
| `SESSION_SAME_SITE`  | No       | `lax`, `strict`, or `none`; defaults to `lax`         |
| `SMTP_HOST`          | No       | Enables real email delivery                           |
| `SMTP_PORT`          | No       | Defaults to `587`                                     |
| `SMTP_USER`          | No       | SMTP username                                         |
| `SMTP_PASSWORD`      | No       | SMTP password                                         |
| `SMTP_FROM`          | No       | Sender address                                        |
| `SEED_DEMO_PASSWORD` | No       | Overrides the development password used by `db:seed`  |

In development, without SMTP, reset emails are printed to the server log. In
production, missing SMTP causes password-reset delivery to fail rather than
logging a live token. `SESSION_SAME_SITE=none` is forced back to `lax` outside
production because a non-secure `SameSite=None` cookie is rejected by browsers.

Generate the secret with:

```bash
openssl rand -base64 32
```

## 3. Data model

The first migration creates:

| Model                | Purpose                                                         |
| -------------------- | --------------------------------------------------------------- |
| `User`               | Identity, bcrypt password hash, session version, login metadata |
| `College`            | Tenant root with unique slug and institutional code             |
| `AcademicTerm`       | College-scoped terms; one current term per college in seed data |
| `Membership`         | User-to-college link carrying role, department, and designation |
| `PasswordResetToken` | SHA-256 token hash, expiry, and single-use marker               |
| `Invitation`         | Invitation schema for the onboarding slice                      |
| `AuditLog`           | Actor, college, action, resource, metadata, IP, and user agent  |

Roles are stored on `Membership`, not on `User`, because a person may belong to
more than one college with different roles. Every tenant-owned table carries
`collegeId` either directly or through a parent relation.

### Tenant rules

- `College` is the tenant root.
- A user can have multiple memberships.
- V1 selects the first active membership at sign-in. A workspace switcher will
  set the active membership explicitly in a later slice.
- `getTenantContext()` re-reads the membership and college from the database, so
  revoked memberships and suspended colleges stop working immediately.
- `User.sessionVersion` is embedded in the JWT. Password reset increments it,
  invalidating older sessions.
- Every new tenant table must carry `collegeId` and every repository function
  must require a `TenantContext`.

## 4. Authentication flows

### Sign-in

1. The server action validates the email and password with Zod.
2. Auth.js calls the credentials provider.
3. The provider normalizes the email, looks up the user and first active
   membership, and compares the bcrypt hash.
4. Unknown emails still execute a dummy bcrypt comparison to reduce timing
   leakage.
5. A successful sign-in updates `lastLoginAt`, `lastAccessedAt`, and writes an
   `auth.sign_in` audit event.
6. The JWT contains user, membership, college, role, and session-version claims.
7. `/` redirects the user to the role workspace.

### Sign-out

The header posts to a server action that calls Auth.js `signOut()` and clears
the session cookie.

### Password reset

1. `/forgot-password` validates the email and always returns the same message.
2. A 32-byte token is generated; only its SHA-256 hash is stored.
3. Tokens expire after one hour and are single-use.
4. Requests are rate-limited to one token per user per minute.
5. `/reset-password?token=...` verifies the token before rendering the form.
6. Consumption uses an atomic `updateMany` guard against concurrent reuse.
7. The password is rehashed with bcrypt cost 12, other tokens are deleted, and
   `sessionVersion` is incremented.
8. `auth.password_reset_requested` and `auth.password_reset_completed` are
   audited.

## 5. RBAC

Permissions are defined in `src/server/permissions/index.ts`.

| Role          | Scope                                                                |
| ------------- | -------------------------------------------------------------------- |
| `student`     | Read own courses, attendance, marks, exams, fees, library, placement |
| `faculty`     | Read students/courses, mark attendance, enter marks, read exams      |
| `staff`       | Read students and attendance                                         |
| `parent`      | Read linked student's attendance, marks, exams, fees                 |
| `admin`       | College operations, users, announcements, audit, settings            |
| `super-admin` | All college operations plus platform management                      |
| `auditor`     | Read users and audit logs                                            |

Permissions are coarse-grained. Row-level ownership checks are still required:
for example, a student with `attendance.read` may only read their own records.
Use `requirePermission(tenant.role, permission)` for actions and page guards,
then scope the query by both college and user.

## 6. Audit logging

`writeAuditLog()` writes immutable events with actor, college, action, resource,
metadata, IP, and user agent. `safeWriteAuditLog()` is used for authentication
events so an audit outage does not block sign-in. Regulated business mutations
should write audit rows inside the same transaction as the change.

Current events:

- `auth.sign_in`
- `auth.password_reset_requested`
- `auth.password_reset_completed`

## 7. Migration and seed workflow

Development:

```bash
npm run db:migrate -- --name add_attendance
npm run db:seed
```

Deployment:

```bash
npm run db:deploy
```

The initial migration is committed at
`prisma/migrations/20261031090000_init/migration.sql`. Migration SQL is generated
with Prisma and reviewed before commit. Never edit an applied migration; add a
new one.

The seed is idempotent and creates:

- Apex Institute of Technology (`APEX-US`)
- Horizon Business School (`HORIZON-UK`)
- One current academic term per college
- Student, faculty, admin, and auditor accounts for Apex
- Student, faculty, and admin accounts for Horizon

Production seeding requires `SEED_DEMO_PASSWORD`; the default is for development
only.

## 8. Adding a protected module

1. Add the route under the correct role group.
2. Call `requireRole()` or `requirePermission()` in the page or server action.
3. Call `requireTenant()` and pass `tenant.college.id` into every query.
4. Add the Prisma model and a new migration.
5. Add a Zod schema and a feature service under `src/features/<domain>/`.
6. Write audit rows inside the mutation transaction.
7. Add loading, empty, error, and permission-denied states.
8. Add a cross-tenant test before merging.
9. Run `npm run check` and `npm run build` sequentially.

## 9. Current limitations

- Credentials-only authentication; SSO and MFA are not configured.
- No invitation acceptance UI yet, although the schema exists.
- No workspace switcher for users with multiple memberships.
- No distributed login rate limiting beyond the reset-token cooldown.
- Email delivery is SMTP-only; the development adapter logs to the console.
- File storage and payment adapters are not implemented.
- Academic modules still render placeholders.
- Automated tests and CI database integration are the next hardening step.
