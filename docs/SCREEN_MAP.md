# Screen Map

This inventory is generated from `design/mockups/`. Do not edit the table by
hand; update the classification or route mapping in
`scripts/generate-screen-index.mjs` and run `npm run screens:index`.

- Screens: 143
- Screenshots: 142
- Missing screenshots: 1
- Status meanings:
  - **Scaffolded** — a route exists and currently renders a placeholder.
  - **Design reference** — the screen is designed but not yet routed.

Route and phase assignments are refined when each module enters implementation.

| Screen                                  | Domain                    | Role                    | Phase | Route                 | Screenshot | Status           |
| --------------------------------------- | ------------------------- | ----------------------- | ----- | --------------------- | ---------- | ---------------- |
| `academic_analytics`                    | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `academic_calendar`                     | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `academic_overview`                     | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `academic_years_terms`                  | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `courses`                               | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `courses_subjects`                      | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `curriculum`                            | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `degree_programs`                       | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `departments_management`                | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `subjects`                              | Academics                 | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `timetable`                             | Academics                 | Admin, Faculty, Student | 1     | /student/timetable    | Yes        | Scaffolded       |
| `admissions_management`                 | Admissions                | Admin                   | 5     | —                     | Yes        | Design reference |
| `enrollment_management`                 | Admissions                | Admin                   | 5     | —                     | Yes        | Design reference |
| `accreditation_compliance_reports`      | Analytics & Reporting     | Admin                   | 6     | —                     | Yes        | Design reference |
| `custom_report_builder`                 | Analytics & Reporting     | Admin                   | 6     | —                     | Yes        | Design reference |
| `data_import_export_management`         | Analytics & Reporting     | Admin                   | 6     | —                     | Yes        | Design reference |
| `data_quality_insights`                 | Analytics & Reporting     | Admin                   | 6     | —                     | Yes        | Design reference |
| `institutional_intelligence`            | Analytics & Reporting     | Admin                   | 6     | —                     | Yes        | Design reference |
| `scheduled_reports_data_exports`        | Analytics & Reporting     | Admin                   | 6     | —                     | Yes        | Design reference |
| `attendance_examination_analytics`      | Attendance                | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `attendance_overview`                   | Attendance                | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `attendance_records`                    | Attendance                | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `attendance_settings`                   | Attendance                | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `shortage_defaulters`                   | Attendance                | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `account_role_switcher`                 | Authentication & Access   | All roles               | 0     | —                     | Yes        | Design reference |
| `authentication_security`               | Authentication & Access   | All roles               | 0     | —                     | Yes        | Design reference |
| `college_os_portal_sign_in`             | Authentication & Access   | All roles               | 0     | /login                | Yes        | Scaffolded       |
| `password_recovery_account_security`    | Authentication & Access   | All roles               | 0     | —                     | Yes        | Design reference |
| `buildings_facilities`                  | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `campus_operations_reports_settings`    | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `campus_overview`                       | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `campuses_facilities`                   | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `hostel_management`                     | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `housekeeping_asset_management`         | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `maintenance_management`                | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `room_booking`                          | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `security_visitor_management`           | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `sports_athletics`                      | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `transport_management`                  | Campus Operations         | Admin, Staff            | 4     | —                     | Yes        | Design reference |
| `announcements_and_circulars`           | Communication             | All roles               | 3     | /admin/notifications  | Yes        | Scaffolded       |
| `communication_overview`                | Communication             | All roles               | 3     | —                     | Missing    | Design reference |
| `communication_reports_and_settings`    | Communication             | All roles               | 3     | —                     | Yes        | Design reference |
| `email_management`                      | Communication             | All roles               | 3     | —                     | Yes        | Design reference |
| `grievance_management`                  | Communication             | All roles               | 3     | —                     | Yes        | Design reference |
| `messaging_and_conversations`           | Communication             | All roles               | 3     | —                     | Yes        | Design reference |
| `push_notifications`                    | Communication             | All roles               | 3     | —                     | Yes        | Design reference |
| `sms_management`                        | Communication             | All roles               | 3     | —                     | Yes        | Design reference |
| `templates_and_automation`              | Communication             | All roles               | 3     | —                     | Yes        | Design reference |
| `exam_management`                       | Examinations              | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `exam_timetable`                        | Examinations              | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `examination_overview`                  | Examinations              | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `hall_tickets`                          | Examinations              | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `results_grades`                        | Examinations              | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `revaluation_supplementary`             | Examinations              | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `seating_arrangement`                   | Examinations              | Admin, Faculty, Student | 1     | —                     | Yes        | Design reference |
| `faculty_attendance_marks`              | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `faculty_dashboard`                     | Faculty                   | Faculty                 | 1     | /faculty/dashboard    | Yes        | Scaffolded       |
| `faculty_directory`                     | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `faculty_hr_analytics`                  | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `faculty_leave_tasks_payroll`           | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `faculty_profile`                       | Faculty                   | Faculty                 | 1     | /faculty/profile      | Yes        | Scaffolded       |
| `faculty_profile_communication`         | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `faculty_student_advisory`              | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `faculty_teaching_class_management`     | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `mark_attendance`                       | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `marks_entry`                           | Faculty                   | Faculty                 | 1     | /faculty/marks        | Yes        | Scaffolded       |
| `workload_management`                   | Faculty                   | Faculty                 | 1     | —                     | Yes        | Design reference |
| `accounting_ledger`                     | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `expenses_vendor_payments`              | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `fee_collection`                        | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `fee_structures`                        | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `finance_analytics`                     | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `finance_overview`                      | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `financial_reports`                     | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `fines_library_payments`                | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `scholarships_financial_aid`            | Finance                   | Admin, Student          | 2     | —                     | Yes        | Design reference |
| `leave_management`                      | HR & Payroll              | Admin, Faculty, Staff   | 5     | —                     | Yes        | Design reference |
| `payroll`                               | HR & Payroll              | Admin, Faculty, Staff   | 5     | —                     | Yes        | Design reference |
| `performance_management`                | HR & Payroll              | Admin, Faculty, Staff   | 5     | —                     | Yes        | Design reference |
| `staff_dashboard`                       | HR & Payroll              | Admin, Faculty, Staff   | 5     | —                     | Yes        | Design reference |
| `staff_directory`                       | HR & Payroll              | Admin, Faculty, Staff   | 5     | —                     | Yes        | Design reference |
| `staff_leave_payroll_profile`           | HR & Payroll              | Admin, Faculty, Staff   | 5     | —                     | Yes        | Design reference |
| `staff_tasks_operations`                | HR & Payroll              | Admin, Faculty, Staff   | 5     | —                     | Yes        | Design reference |
| `book_catalogue`                        | Library                   | Admin, Student          | 4     | —                     | Yes        | Design reference |
| `book_inventory`                        | Library                   | Admin, Student          | 4     | —                     | Yes        | Design reference |
| `circulation_management`                | Library                   | Admin, Student          | 4     | —                     | Yes        | Design reference |
| `digital_library`                       | Library                   | Admin, Student          | 4     | —                     | Yes        | Design reference |
| `library_overview`                      | Library                   | Admin, Student          | 4     | —                     | Yes        | Design reference |
| `library_reports_settings`              | Library                   | Admin, Student          | 4     | —                     | Yes        | Design reference |
| `reservations_requests`                 | Library                   | Admin, Student          | 4     | —                     | Yes        | Design reference |
| `parent_academic_monitoring`            | Parent                    | Parent                  | 3     | —                     | Yes        | Design reference |
| `parent_communication`                  | Parent                    | Parent                  | 3     | —                     | Yes        | Design reference |
| `parent_dashboard`                      | Parent                    | Parent                  | 3     | —                     | Yes        | Design reference |
| `parent_fees_communication`             | Parent                    | Parent                  | 3     | —                     | Yes        | Design reference |
| `parent_profile_linked_students`        | Parent                    | Parent                  | 3     | —                     | Yes        | Design reference |
| `alumni_events_contributions`           | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `alumni_management`                     | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `companies_recruiters`                  | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `job_internship_opportunities`          | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `placement_alumni_analytics`            | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `placement_alumni_reports_settings`     | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `placement_drives`                      | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `placement_overview`                    | Placement & Alumni        | Admin, Student          | 5     | /student/placements   | Yes        | Scaffolded       |
| `placement_results_offers`              | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `placement_training_career_development` | Placement & Alumni        | Admin, Student          | 5     | —                     | Yes        | Design reference |
| `approval_workflow_builder`             | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `audit_logs_activity_monitoring`        | Platform & Administration | Admin                   | 6     | /admin/audit          | Yes        | Scaffolded       |
| `backup_retention_data_management`      | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `college_branding_configuration`        | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `college_directory`                     | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `college_onboarding`                    | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `college_os_main_application_dashboard` | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `college_profile`                       | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `integration_api_management`            | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `permission_matrix`                     | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `platform_settings`                     | Platform & Administration | Admin                   | 6     | /admin/settings       | Yes        | Scaffolded       |
| `roles_permissions`                     | Platform & Administration | Admin                   | 6     | /admin/roles          | Yes        | Scaffolded       |
| `subscription_management`               | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `super_admin_dashboard`                 | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `system_preferences_notifications`      | Platform & Administration | Admin                   | 6     | —                     | Yes        | Design reference |
| `user_management`                       | Platform & Administration | Admin                   | 6     | /admin/users          | Yes        | Scaffolded       |
| `achievements_certifications`           | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `course_registration`                   | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `my_academics`                          | Student                   | Student                 | 1     | /student/academics    | Yes        | Scaffolded       |
| `student_analytics`                     | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_attendance`                    | Student                   | Student                 | 1     | /student/attendance   | Yes        | Scaffolded       |
| `student_career_profiles`               | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_communication_campus_life`     | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_counseling`                    | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_dashboard`                     | Student                   | Student                 | 1     | /student/dashboard    | Yes        | Scaffolded       |
| `student_directory`                     | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_documents`                     | Student                   | Student                 | 1     | /student/documents    | Yes        | Scaffolded       |
| `student_engagement_wellbeing`          | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_examinations_results`          | Student                   | Student                 | 1     | /student/examinations | Yes        | Scaffolded       |
| `student_fees`                          | Student                   | Student                 | 1     | /student/fees         | Yes        | Scaffolded       |
| `student_id_cards`                      | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_library_services`              | Student                   | Student                 | 1     | /student/library      | Yes        | Scaffolded       |
| `student_life_overview`                 | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_life_reports_settings`         | Student                   | Student                 | 1     | —                     | Yes        | Design reference |
| `student_profile`                       | Student                   | Student                 | 1     | /student/profile      | Yes        | Scaffolded       |
| `student_profile_account`               | Student                   | Student                 | 1     | /student/profile      | Yes        | Scaffolded       |
| `clubs_organizations`                   | Unclassified              | TBD                     | TBD   | /student/clubs        | Yes        | Scaffolded       |
| `events_activities`                     | Unclassified              | TBD                     | TBD   | —                     | Yes        | Design reference |
