import type { NavGroup } from "@/types";

export const portalNavigation = {
  student: [
    {
      title: "Workspace",
      items: [
        { label: "Overview", href: "/dashboard", icon: "dashboard" },
        { label: "My Academics", href: "/academics", icon: "school" },
        { label: "Attendance", href: "/attendance", icon: "fact_check" },
        { label: "Exams & Results", href: "/examinations", icon: "assignment" },
        { label: "Fees & Payments", href: "/fees", icon: "payments" },
      ],
    },
    {
      title: "Campus & Services",
      items: [
        { label: "Library", href: "/library", icon: "local_library" },
        { label: "Documents", href: "/documents", icon: "folder" },
        { label: "Placements", href: "/placements", icon: "work" },
        { label: "Clubs & Events", href: "/clubs", icon: "groups" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Notifications", href: "/notifications", icon: "notifications" },
        { label: "Grievances", href: "/grievances", icon: "support_agent" },
        { label: "Profile", href: "/profile", icon: "person" },
      ],
    },
  ],
  faculty: [
    {
      title: "Workspace",
      items: [
        { label: "Overview", href: "/dashboard", icon: "dashboard" },
        { label: "My Academics", href: "/academics", icon: "school" },
        { label: "Attendance", href: "/attendance", icon: "fact_check" },
        { label: "Marks Entry", href: "/examinations/marks", icon: "edit_note" },
        { label: "Course Materials", href: "/materials", icon: "menu_book" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Notifications", href: "/notifications", icon: "notifications" },
        { label: "Profile", href: "/profile", icon: "person" },
      ],
    },
  ],
  parent: [
    {
      title: "Monitoring",
      items: [
        { label: "Overview", href: "/dashboard", icon: "dashboard" },
        { label: "Academic Monitoring", href: "/academics", icon: "school" },
        { label: "Attendance", href: "/attendance", icon: "fact_check" },
        { label: "Exams & Results", href: "/examinations", icon: "assignment" },
        { label: "Fees", href: "/fees", icon: "payments" },
      ],
    },
    {
      title: "Account",
      items: [
        { label: "Notifications", href: "/notifications", icon: "notifications" },
        { label: "Profile", href: "/profile", icon: "person" },
      ],
    },
  ],
} satisfies Record<"student" | "faculty" | "parent", NavGroup[]>;

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

export function getPortalNavigation(role: keyof typeof portalNavigation): NavGroup[] {
  return portalNavigation[role] ?? portalNavigation.student;
}
