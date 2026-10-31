import type { NavGroup } from "@/types";

export const studentNavigation: NavGroup[] = [
  {
    title: "Workspace",
    items: [
      { label: "Overview", href: "/student/dashboard", icon: "dashboard" },
      { label: "My Academics", href: "/student/academics", icon: "school" },
      { label: "Attendance", href: "/student/attendance", icon: "fact_check" },
      { label: "Exams & Results", href: "/student/examinations", icon: "assignment" },
      { label: "Fees & Payments", href: "/student/fees", icon: "payments" },
    ],
  },
  {
    title: "Campus & Services",
    items: [
      { label: "Library", href: "/student/library", icon: "local_library" },
      { label: "Documents", href: "/student/documents", icon: "folder" },
      { label: "Placements", href: "/student/placements", icon: "work" },
      { label: "Clubs & Events", href: "/student/clubs", icon: "groups" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Notifications", href: "/student/notifications", icon: "notifications" },
      { label: "Grievances", href: "/student/grievances", icon: "support_agent" },
      { label: "Profile", href: "/student/profile", icon: "person" },
    ],
  },
];

export const facultyNavigation: NavGroup[] = [
  {
    title: "Workspace",
    items: [
      { label: "Overview", href: "/faculty/dashboard", icon: "dashboard" },
      { label: "Marks Entry", href: "/faculty/marks", icon: "edit_note" },
      { label: "Course Materials", href: "/faculty/materials", icon: "menu_book" },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Notifications", href: "/faculty/notifications", icon: "notifications" },
      { label: "Profile", href: "/faculty/profile", icon: "person" },
    ],
  },
];

export const adminNavigation: NavGroup[] = [
  {
    title: "Overview",
    items: [{ label: "Platform Overview", href: "/admin", icon: "admin_panel_settings" }],
  },
  {
    title: "People & Access",
    items: [
      { label: "Users", href: "/admin/users", icon: "group" },
      { label: "Roles & Permissions", href: "/admin/roles", icon: "shield_person" },
    ],
  },
  {
    title: "Governance",
    items: [
      { label: "Audit Logs", href: "/admin/audit", icon: "history" },
      { label: "Notifications", href: "/admin/notifications", icon: "notifications" },
      { label: "Settings", href: "/admin/settings", icon: "settings" },
    ],
  },
];
