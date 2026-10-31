# Previous Build Manifest (pre-restructure)

This file records the stale `.next` artifact that existed before the project was
restructured. It was built on **27 October 2026** from a different, more
complete implementation than the current source tree.

- Build ID: `RiGPpn7yvM4xS83yzat5w`
- Original location: `/home/magesh/College OS/.next`
- Preserved at: `/tmp/opencode/college-os-next-stale-20261027`
- The artifact is not reproducible from the current `src/`.

## Detected stack

The compiled artifacts referenced:

- `@prisma/client`
- `@supabase/ssr` / `@supabase/supabase-js`
- `lucide-react`
- `zod`
- `bcryptjs`
- `sharp`
- Next.js middleware and server route handlers

The rendered auth screen used a different design vocabulary (`bg-background`,
`bg-sidebar`, `text-brand`, `rounded-xl`) and a split-screen sign-in layout. It
was not generated from the 143 HTML mockups that are now under `design/mockups/`.

## Page routes in the build

```text
/
/login
/forgot-password
/reset-password
/unauthorized
/dashboard
/academics/calendar
/academics/courses
/academics/departments
/academics/sections
/academics/subjects
/admin/audit
/admin/roles
/admin/roles/[id]
/admin/settings
/admin/users
/admin/users/[id]
/announcements
/assignments
/assignments/[id]
/attendance
/attendance/[sessionId]
/clubs
/documents
/examinations
/examinations/marks
/examinations/marks/[examinationId]
/fees
/grievances
/grievances/[id]
/hostel
/library
/materials
/notifications
/placements
/profile
/reports
/results
/search
/timetable
/transport
```

## API routes

```text
/api/auth/logout
/api/files/[...path]
/api/notifications
/api/notifications/read-all
/api/reports/[key]
```

## Why this matters

The artifact proves that a substantially larger application existed in this
directory before 31 October 2026. The current repository is a fresh scaffold
built from the design mockups. If the earlier source is needed, recover it from
a backup or version-control history before it is lost.
