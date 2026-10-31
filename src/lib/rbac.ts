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
  student: "/student/dashboard",
  faculty: "/faculty/dashboard",
  staff: "/faculty/dashboard",
  parent: "/parent/dashboard",
  admin: "/admin",
  "super-admin": "/platform",
  auditor: "/admin/audit",
};

export interface RoleLinks {
  home: string;
  profile: string;
  notifications: string;
}

export function getRoleLinks(role: UserRole): RoleLinks {
  switch (role) {
    case "student":
      return {
        home: "/student/dashboard",
        profile: "/student/profile",
        notifications: "/student/notifications",
      };
    case "faculty":
    case "staff":
      return {
        home: "/faculty/dashboard",
        profile: "/faculty/profile",
        notifications: "/faculty/notifications",
      };
    case "parent":
      return {
        home: "/parent/dashboard",
        profile: "/parent/profile",
        notifications: "/parent/notifications",
      };
    case "super-admin":
      return {
        home: "/platform",
        profile: "/platform/settings",
        notifications: "/platform/notifications",
      };
    case "admin":
    case "auditor":
      return {
        home: "/admin",
        profile: "/admin/settings",
        notifications: "/admin/notifications",
      };
  }
}

export function isAdminRole(role: UserRole): boolean {
  return role === "admin" || role === "super-admin";
}

export function isPortalRole(role: UserRole): boolean {
  return role === "student" || role === "faculty" || role === "staff" || role === "parent";
}
