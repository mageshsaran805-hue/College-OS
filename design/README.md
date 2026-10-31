# Design Reference

This directory preserves the complete visual specification for College OS.

## Contents

| Path | Description |
|---|---|
| `DESIGN_SYSTEM.md` | Canonical design tokens and visual guidance |
| `mockups/<screen>/code.html` | 143 static HTML screens |
| `mockups/<screen>/screen.png` | 142 screenshots (all except `communication_overview`) |

The mockups cover student, faculty, parent, admin, finance, library, campus
operations, placement, alumni, communication, and analytics workflows.

## Previewing a mockup

The screens are self-contained HTML files. Serve the mockup directory:

```bash
cd design/mockups
python3 -m http.server 8080
```

Then open a screen, for example:

```text
http://localhost:8080/student_dashboard/code.html
http://localhost:8080/college_os_portal_sign_in/code.html
http://localhost:8080/super_admin_dashboard/code.html
```

## Important constraints

- Every mockup loads Tailwind from `cdn.tailwindcss.com`; this is not suitable
  for production.
- Every mockup inline-copies the Tailwind theme. Do not edit those copies as a
  source of truth; edit `tailwind.config.ts` instead.
- Links are placeholders (`href="#"`); there is no routing between screens.
- Some interactions are inline JavaScript prototypes, not application logic.
- Images use remote Google-hosted URLs. They are not durable production assets.
- The HTML files have no page titles or meta descriptions and limited
  accessibility semantics. Do not copy them directly into the app.

## How to use a mockup

1. Find the relevant screen folder by feature name.
2. Open `code.html` for layout and `screen.png` for the intended visual result.
3. Translate the screen into React components using the shared primitives in
   `src/components/ui/`.
4. Reuse `AppShell`, `Sidebar`, and `Header`; never copy a sidebar or header
   from the HTML.
5. Use tokens from `tailwind.config.ts` instead of the inline hex values.
6. Replace mock data with server-provided data and proper permission checks.
7. Delete the corresponding `ModulePage` placeholder only when the module has
   real content and states.

## Screen inventory by domain

| Domain | Example folders |
|---|---|
| Student | `student_dashboard`, `my_academics`, `student_attendance`, `student_fees`, `student_library_services` |
| Faculty/staff | `faculty_dashboard`, `faculty_attendance_marks`, `workload_management`, `staff_dashboard`, `payroll` |
| Parent | `parent_dashboard`, `parent_academic_monitoring`, `parent_fees_communication` |
| Academic operations | `academic_overview`, `academic_calendar`, `courses`, `curriculum`, `timetable` |
| Examinations | `examination_overview`, `exam_timetable`, `marks_entry`, `results_grades`, `hall_tickets` |
| Finance | `finance_overview`, `fee_structures`, `fee_collection`, `accounting_ledger`, `financial_reports` |
| Library | `library_overview`, `book_catalogue`, `circulation_management`, `digital_library` |
| Campus | `hostel_management`, `transport_management`, `room_booking`, `security_visitor_management` |
| Placement/alumni | `placement_overview`, `placement_drives`, `companies_recruiters`, `alumni_management` |
| Administration | `super_admin_dashboard`, `user_management`, `roles_permissions`, `audit_logs_activity_monitoring` |
| Analytics | `institutional_intelligence`, `data_quality_insights`, `custom_report_builder` |

The folder name is the stable identifier. Add new mockups as
`design/mockups/<snake_case_feature>/code.html` and include a screenshot where
possible.

## Token contract

`design/DESIGN_SYSTEM.md` frontmatter and `tailwind.config.ts` are the canonical
token set. The prose in the design document is guidance; where it differs from
the tokens, the tokens win. The HTML mockups are visual references only.
