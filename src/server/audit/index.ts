import "server-only";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/db/client";
import { getRequestMeta } from "./request-meta";

export interface AuditLogInput {
  action: string;
  resource: string;
  resourceId?: string;
  actorId?: string;
  collegeId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function writeAuditLog(input: AuditLogInput): Promise<void> {
  const requestMeta = await getRequestMeta();
  const metadata = input.metadata ? (input.metadata as Prisma.InputJsonValue) : undefined;

  await prisma.auditLog.create({
    data: {
      action: input.action,
      resource: input.resource,
      resourceId: input.resourceId,
      actorId: input.actorId,
      collegeId: input.collegeId,
      metadata,
      ipAddress: input.ipAddress ?? requestMeta.ipAddress,
      userAgent: input.userAgent ?? requestMeta.userAgent,
    },
  });
}

/**
 * Audit failures must not break the user's primary action. Callers use this
 * for best-effort events such as sign-in; regulated mutations should call
 * `writeAuditLog` inside the same transaction instead.
 */
export async function safeWriteAuditLog(input: AuditLogInput): Promise<void> {
  try {
    await writeAuditLog(input);
  } catch (error) {
    console.error(`Audit write failed for ${input.action}`, error);
  }
}
