import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/server/db/client";
import { toCollegeStatus, toTermStatus, toUserRole } from "@/server/auth/roles";
import type { AcademicTerm, College, User, UserRole } from "@/types";

export interface TenantContext {
  membershipId: string;
  role: UserRole;
  user: User;
  college: College;
  term: AcademicTerm | null;
}

export const getTenantContext = cache(async (): Promise<TenantContext | null> => {
  const session = await auth();
  const sessionUser = session?.user;

  if (!sessionUser?.id || !sessionUser.membershipId) {
    return null;
  }

  const membership = await prisma.membership.findFirst({
    where: {
      id: sessionUser.membershipId,
      userId: sessionUser.id,
      status: "ACTIVE",
      college: { status: "ACTIVE" },
    },
    include: {
      user: true,
      college: {
        include: {
          terms: {
            where: { isCurrent: true, status: "ACTIVE" },
            orderBy: { startDate: "desc" },
            take: 1,
          },
        },
      },
    },
  });

  if (!membership || membership.user.sessionVersion !== sessionUser.sessionVersion) {
    return null;
  }

  const role = toUserRole(membership.role);
  const termRecord = membership.college.terms[0] ?? null;
  const term: AcademicTerm | null = termRecord
    ? {
        id: termRecord.id,
        name: termRecord.name,
        year: termRecord.code,
        startDate: termRecord.startDate.toISOString(),
        endDate: termRecord.endDate.toISOString(),
        status: toTermStatus(termRecord.status),
      }
    : null;

  const college: College = {
    id: membership.college.id,
    name: membership.college.name,
    code: membership.college.code,
    campusId: membership.college.slug,
    region: membership.college.region ?? "—",
    status: toCollegeStatus(membership.college.status),
  };

  const user: User = {
    id: membership.user.id,
    name: membership.user.name,
    email: membership.user.email,
    role,
    avatar: membership.user.image ?? undefined,
    department: membership.department ?? undefined,
    designation: membership.designation ?? undefined,
    collegeId: membership.collegeId,
    termId: term?.id,
  };

  return {
    membershipId: membership.id,
    role,
    user,
    college,
    term,
  };
});

export async function requireTenant(): Promise<TenantContext> {
  const tenant = await getTenantContext();

  if (!tenant) {
    redirect("/login");
  }

  return tenant;
}

export async function requireRole(allowedRoles: readonly UserRole[]): Promise<TenantContext> {
  const tenant = await requireTenant();

  if (!allowedRoles.includes(tenant.role)) {
    redirect("/unauthorized");
  }

  return tenant;
}
