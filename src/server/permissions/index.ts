import "server-only";

import type { UserRole } from "@/types";

export type Permission =
  | "students.read"
  | "students.manage"
  | "faculty.read"
  | "faculty.manage"
  | "courses.read"
  | "courses.manage"
  | "attendance.read"
  | "attendance.mark"
  | "marks.read"
  | "marks.write"
  | "exams.read"
  | "exams.manage"
  | "fees.read"
  | "fees.manage"
  | "library.read"
  | "library.manage"
  | "placements.read"
  | "placements.manage"
  | "announcements.read"
  | "announcements.manage"
  | "users.read"
  | "users.manage"
  | "roles.manage"
  | "audit.read"
  | "settings.manage"
  | "platform.manage";

const permissionsByRole: Record<UserRole, readonly Permission[]> = {
  student: [
    "courses.read",
    "attendance.read",
    "marks.read",
    "exams.read",
    "fees.read",
    "library.read",
    "placements.read",
    "announcements.read",
  ],
  faculty: [
    "students.read",
    "courses.read",
    "attendance.read",
    "attendance.mark",
    "marks.read",
    "marks.write",
    "exams.read",
    "announcements.read",
  ],
  staff: ["students.read", "attendance.read", "announcements.read"],
  parent: ["attendance.read", "marks.read", "exams.read", "fees.read", "announcements.read"],
  admin: [
    "students.read",
    "students.manage",
    "faculty.read",
    "faculty.manage",
    "courses.read",
    "courses.manage",
    "attendance.read",
    "marks.read",
    "exams.read",
    "exams.manage",
    "fees.read",
    "fees.manage",
    "library.read",
    "library.manage",
    "placements.read",
    "placements.manage",
    "announcements.read",
    "announcements.manage",
    "users.read",
    "users.manage",
    "audit.read",
    "settings.manage",
  ],
  "super-admin": [
    "students.read",
    "students.manage",
    "faculty.read",
    "faculty.manage",
    "courses.read",
    "courses.manage",
    "attendance.read",
    "attendance.mark",
    "marks.read",
    "marks.write",
    "exams.read",
    "exams.manage",
    "fees.read",
    "fees.manage",
    "library.read",
    "library.manage",
    "placements.read",
    "placements.manage",
    "announcements.read",
    "announcements.manage",
    "users.read",
    "users.manage",
    "roles.manage",
    "audit.read",
    "settings.manage",
    "platform.manage",
  ],
  auditor: ["users.read", "audit.read"],
};

export class PermissionError extends Error {
  constructor(permission: Permission) {
    super(`Missing permission: ${permission}`);
    this.name = "PermissionError";
  }
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return permissionsByRole[role].includes(permission);
}

export function requirePermission(role: UserRole, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new PermissionError(permission);
  }
}

export function permissionsFor(role: UserRole): readonly Permission[] {
  return permissionsByRole[role];
}
