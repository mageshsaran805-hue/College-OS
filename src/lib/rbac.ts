import type { UserRole } from "@/types";

export const roleLabels: Record<UserRole, string> = {
  student: "Student",
  faculty: "Faculty",
  staff: "Staff",
  parent: "Parent / Guardian",
  admin: "Administrator",
  "super-admin": "Super Administrator",
  auditor: "Auditor",
};

export const roleHome: Record<UserRole, string> = {
  student: "/dashboard",
  faculty: "/dashboard",
  staff: "/dashboard",
  parent: "/dashboard",
  admin: "/admin",
  "super-admin": "/admin",
  auditor: "/admin/audit",
};

export function isAdminRole(role: UserRole): boolean {
  return role === "admin" || role === "super-admin";
}

export function isPortalRole(role: UserRole): boolean {
  return role === "student" || role === "faculty" || role === "staff" || role === "parent";
}
