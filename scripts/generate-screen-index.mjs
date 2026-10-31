import { readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const mockupsDir = join(root, "design", "mockups");
const outputFile = join(root, "docs", "SCREEN_MAP.md");

const domainRules = [
  {
    domain: "Authentication & Access",
    role: "All roles",
    phase: "0",
    patterns: [
      /^authentication_security$/,
      /^password_recovery/,
      /^account_role_switcher$/,
      /^college_os_portal_sign_in$/,
    ],
  },
  {
    domain: "Student",
    role: "Student",
    phase: "1",
    patterns: [
      /^student_/,
      /^my_academics$/,
      /^course_registration$/,
      /^achievements_certifications$/,
      /^student_life_/,
      /^student_engagement/,
      /^student_counseling$/,
      /^student_career_profiles$/,
      /^student_id_cards$/,
    ],
  },
  {
    domain: "Parent",
    role: "Parent",
    phase: "3",
    patterns: [/^parent_/],
  },
  {
    domain: "Faculty",
    role: "Faculty",
    phase: "1",
    patterns: [/^faculty_/, /^mark_attendance$/, /^marks_entry$/, /^workload_management$/],
  },
  {
    domain: "Examinations",
    role: "Admin, Faculty, Student",
    phase: "1",
    patterns: [
      /^examination_/,
      /^exam_/,
      /^hall_tickets$/,
      /^results_grades$/,
      /^revaluation_supplementary$/,
      /^seating_arrangement$/,
    ],
  },
  {
    domain: "Attendance",
    role: "Admin, Faculty, Student",
    phase: "1",
    patterns: [/^attendance_/, /^shortage_defaulters$/],
  },
  {
    domain: "Finance",
    role: "Admin, Student",
    phase: "2",
    patterns: [
      /^finance_/,
      /^fee_/,
      /^accounting_/,
      /^financial_reports$/,
      /^scholarships_financial_aid$/,
      /^expenses_vendor_payments$/,
      /^fines_library_payments$/,
    ],
  },
  {
    domain: "Library",
    role: "Admin, Student",
    phase: "4",
    patterns: [
      /^library_/,
      /^book_/,
      /^circulation_/,
      /^digital_library$/,
      /^reservations_requests$/,
    ],
  },
  {
    domain: "Campus Operations",
    role: "Admin, Staff",
    phase: "4",
    patterns: [
      /^hostel_/,
      /^transport_/,
      /^room_booking$/,
      /^maintenance_/,
      /^security_visitor/,
      /^buildings_/,
      /^campuses_/,
      /^campus_/,
      /^housekeeping_/,
      /^sports_/,
    ],
  },
  {
    domain: "Placement & Alumni",
    role: "Admin, Student",
    phase: "5",
    patterns: [/^placement_/, /^companies_/, /^job_/, /^alumni_/],
  },
  {
    domain: "HR & Payroll",
    role: "Admin, Faculty, Staff",
    phase: "5",
    patterns: [
      /^payroll$/,
      /^leave_management$/,
      /^performance_management$/,
      /^staff_/,
      /^faculty_hr_analytics$/,
    ],
  },
  {
    domain: "Admissions",
    role: "Admin",
    phase: "5",
    patterns: [/^admissions_/, /^enrollment_/],
  },
  {
    domain: "Communication",
    role: "All roles",
    phase: "3",
    patterns: [
      /^communication_/,
      /^announcements_/,
      /^messaging_/,
      /^email_/,
      /^sms_/,
      /^push_/,
      /^templates_/,
      /^grievance_/,
    ],
  },
  {
    domain: "Academics",
    role: "Admin, Faculty, Student",
    phase: "1",
    patterns: [
      /^academic_/,
      /^courses$/,
      /^courses_subjects$/,
      /^curriculum$/,
      /^degree_/,
      /^departments_/,
      /^subjects$/,
      /^timetable$/,
    ],
  },
  {
    domain: "Analytics & Reporting",
    role: "Admin",
    phase: "6",
    patterns: [
      /analytics/,
      /^institutional_intelligence$/,
      /^custom_report_builder$/,
      /^data_quality_insights$/,
      /^accreditation_/,
      /^scheduled_reports/,
      /^data_import_export/,
    ],
  },
  {
    domain: "Platform & Administration",
    role: "Admin",
    phase: "6",
    patterns: [
      /^super_admin_/,
      /^college_/,
      /^platform_/,
      /^subscription_/,
      /^roles_/,
      /^permission_/,
      /^user_management$/,
      /^audit_/,
      /^system_preferences/,
      /^integration_/,
      /^backup_/,
      /^approval_workflow/,
      /^college_os_main/,
    ],
  },
];

const routeMap = {
  college_os_portal_sign_in: "/login",
  student_dashboard: "/student/dashboard",
  my_academics: "/student/academics",
  student_attendance: "/student/attendance",
  student_examinations_results: "/student/examinations",
  student_fees: "/student/fees",
  student_library_services: "/student/library",
  student_documents: "/student/documents",
  placement_overview: "/student/placements",
  clubs_organizations: "/student/clubs",
  student_profile: "/student/profile",
  student_profile_account: "/student/profile",
  timetable: "/student/timetable",
  faculty_dashboard: "/faculty/dashboard",
  marks_entry: "/faculty/marks",
  faculty_profile: "/faculty/profile",
  user_management: "/admin/users",
  roles_permissions: "/admin/roles",
  audit_logs_activity_monitoring: "/admin/audit",
  platform_settings: "/admin/settings",
  announcements_and_circulars: "/admin/notifications",
};

function classify(screen) {
  for (const rule of domainRules) {
    if (rule.patterns.some((pattern) => pattern.test(screen))) {
      return {
        domain: rule.domain,
        role: rule.role,
        phase: rule.phase,
      };
    }
  }

  return {
    domain: "Unclassified",
    role: "TBD",
    phase: "TBD",
  };
}

const entries = await readdir(mockupsDir, { withFileTypes: true });
const screens = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const rows = [];
let screenshots = 0;

for (const screen of screens) {
  const classification = classify(screen);
  const hasScreenshot = await stat(join(mockupsDir, screen, "screen.png"))
    .then(() => true)
    .catch(() => false);

  if (hasScreenshot) screenshots += 1;

  const route = routeMap[screen] ?? "—";
  const status = route === "—" ? "Design reference" : "Scaffolded";

  rows.push({
    screen,
    ...classification,
    route,
    screenshot: hasScreenshot ? "Yes" : "Missing",
    status,
  });
}

rows.sort((a, b) => a.domain.localeCompare(b.domain) || a.screen.localeCompare(b.screen));

const table = [
  "| Screen | Domain | Role | Phase | Route | Screenshot | Status |",
  "| --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map(
    (row) =>
      `| \`${row.screen}\` | ${row.domain} | ${row.role} | ${row.phase} | ${row.route} | ${row.screenshot} | ${row.status} |`,
  ),
].join("\n");

const content = `# Screen Map

This inventory is generated from \`design/mockups/\`. Do not edit the table by
hand; update the classification or route mapping in
\`scripts/generate-screen-index.mjs\` and run \`npm run screens:index\`.

- Screens: ${screens.length}
- Screenshots: ${screenshots}
- Missing screenshots: ${screens.length - screenshots}
- Status meanings:
  - **Scaffolded** — a route exists and currently renders a placeholder.
  - **Design reference** — the screen is designed but not yet routed.

Route and phase assignments are refined when each module enters implementation.

${table}
`;

await writeFile(outputFile, content, "utf8");

console.log(`Wrote ${screens.length} screens (${screenshots} screenshots) to ${outputFile}`);
