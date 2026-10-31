# Roadmap

The project is delivered in vertical slices. Each phase ends with working data,
permissions, states, and tests — not just screens.

## Phase 0 — Foundation

- ✅ Git, LFS, CI, and repository conventions
- ✅ Prisma schema, initial migration, and two-college seed
- ✅ Auth.js credentials, password reset, and JWT sessions
- ✅ Tenant context, RBAC, and audit logging
- 🟡 Email adapter (console/SMTP); file, SMS, and payment adapters pending
- 🟡 Auth forms exist; shared data-table and chart infrastructure pending
- 🟡 Invitation schema exists; delivery and acceptance flow pending

**Exit:** authenticated users land in the correct workspace; cross-tenant access
is denied and tested. Role isolation is implemented and must gain automated
cross-tenant tests before the phase is marked complete.

## Phase 1 — Academic core

- College, campus, academic year, and term setup
- Departments, programs, courses, sections, and timetable
- Student and faculty directories, invitations, and CSV import
- Student dashboard, course registration, attendance, exams, and results
- Faculty class roster, attendance marking, and marks entry
- In-app announcements and notifications

**Exit:** a complete term can be run end to end for a seeded college.

## Phase 2 — Finance

- Fee structures and invoices
- Scholarships and concessions
- Sandbox payments, receipts, and reconciliation
- Ledger entries and finance reports

**Exit:** a student can view and pay an invoice; an administrator can reconcile
the payment and download a receipt.

## Phase 3 — Parent and communication

- Parent linking and read-only monitoring
- Announcements and circulars
- Messaging, grievances, and notification preferences

## Phase 4 — Campus operations

- Library catalogue, circulation, and digital resources
- Hostel allocation and room management
- Transport routes and allocations
- Room booking, facilities, maintenance, and visitor management

## Phase 5 — Placement, alumni, HR, and admissions

- Placement drives, applications, interviews, and offers
- Alumni records, events, and contributions
- Staff leave, workload, performance, and payroll
- Admissions pipeline and enrollment

## Phase 6 — Analytics and SaaS platform

- Institutional intelligence and custom reports
- Data quality, imports, and exports
- College directory, onboarding, subscriptions, and platform settings
- Integration and API management, backups, and retention

## Phase 7 — Launch hardening

- Accessibility and responsive QA
- Performance and load testing
- Security review and penetration testing
- Backup, monitoring, and incident runbooks
- UAT and production deployment

## Current status

Phase 0 core authentication, tenancy, RBAC, audit, migration, and seed work is
in place. Remaining foundation items are the invitation flow, file/SMS/payment
adapters, shared data-table/chart infrastructure, and automated cross-tenant
tests. Phase 1 academic work starts after the Supabase environment is
provisioned and the remaining foundation items are scheduled. See
`SCREEN_MAP.md` for screen-level status.
