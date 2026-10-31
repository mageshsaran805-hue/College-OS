import "server-only";

import type { CollegeStatus, MembershipRole, TermStatus } from "@prisma/client";
import type { College, UserRole } from "@/types";

const roleMap: Record<MembershipRole, UserRole> = {
  STUDENT: "student",
  FACULTY: "faculty",
  STAFF: "staff",
  PARENT: "parent",
  ADMIN: "admin",
  SUPER_ADMIN: "super-admin",
  AUDITOR: "auditor",
};

const collegeStatusMap: Record<CollegeStatus, College["status"]> = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
};

const termStatusMap: Record<TermStatus, "active" | "upcoming" | "completed"> = {
  ACTIVE: "active",
  UPCOMING: "upcoming",
  COMPLETED: "completed",
};

export function toUserRole(role: MembershipRole): UserRole {
  return roleMap[role];
}

export function toCollegeStatus(status: CollegeStatus): College["status"] {
  return collegeStatusMap[status];
}

export function toTermStatus(status: TermStatus): "active" | "upcoming" | "completed" {
  return termStatusMap[status];
}
