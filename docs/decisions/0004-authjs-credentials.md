# ADR 0004: Auth.js Credentials with JWT Sessions

## Status

Accepted — 31 October 2026.

## Context

The first release needs institutional email/password sign-in without depending
on an external identity provider. The role and active college must be available
on every protected request, and sessions must be revocable after a password
reset.

Auth.js credentials providers require JWT sessions; database sessions are not
supported with the credentials provider alone.

## Decision

- Use Auth.js v5 with the credentials provider and bcrypt password hashes.
- Store the user, membership, college, role, and session version in the signed
  JWT.
- Re-read the membership and college from PostgreSQL in `getTenantContext()` on
  every protected request.
- Increment `User.sessionVersion` when a password is reset and reject tokens
  whose version no longer matches.
- Keep Auth.js handlers under `/api/auth/*` and use server actions for the login
  and password-recovery forms.

## Consequences

- Sessions do not require a session table but remain signed and HTTP-only.
- Revoked memberships and suspended colleges take effect without waiting for the
  JWT to expire.
- Password reset invalidates older sessions.
- A future SSO or MFA provider can be added alongside credentials.
- A future workspace switcher must issue a new session or add a verified active
  membership endpoint; it must not accept a college ID from the browser.
