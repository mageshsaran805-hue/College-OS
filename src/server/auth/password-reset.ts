import "server-only";

import { safeWriteAuditLog } from "@/server/audit";
import { createOpaqueToken, hashOpaqueToken, hashPassword } from "@/server/auth/password";
import { prisma } from "@/server/db/client";
import { sendEmail } from "@/server/email";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;
const RESET_COOLDOWN_MS = 60 * 1000;

function appUrl(): string {
  return (process.env.APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

export async function requestPasswordReset(email: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      memberships: {
        where: { status: "ACTIVE", college: { status: "ACTIVE" } },
        orderBy: { createdAt: "asc" },
        take: 1,
        select: { collegeId: true },
      },
    },
  });

  if (!user) {
    return;
  }

  const recentToken = await prisma.passwordResetToken.findFirst({
    where: {
      userId: user.id,
      createdAt: { gt: new Date(Date.now() - RESET_COOLDOWN_MS) },
    },
    select: { id: true },
  });

  if (recentToken) {
    return;
  }

  const token = createOpaqueToken();
  const tokenHash = hashOpaqueToken(token);
  const resetUrl = `${appUrl()}/reset-password?token=${encodeURIComponent(token)}`;
  const safeName = escapeHtml(user.name);

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
    prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      },
    }),
  ]);

  await sendEmail({
    to: user.email,
    subject: "Reset your College OS password",
    text: [
      `Hello ${user.name},`,
      "",
      "Use the link below to set a new password. It expires in one hour.",
      "",
      resetUrl,
      "",
      "If you did not request this, you can ignore this email.",
    ].join("\n"),
    html: `<p>Hello ${safeName},</p><p>Use the link below to set a new password. It expires in one hour.</p><p><a href="${resetUrl}">Reset password</a></p><p>If you did not request this, you can ignore this email.</p>`,
  });

  await safeWriteAuditLog({
    action: "auth.password_reset_requested",
    resource: "user",
    resourceId: user.id,
    actorId: user.id,
    collegeId: user.memberships[0]?.collegeId,
    metadata: { email: user.email },
  });
}

export async function isPasswordResetTokenValid(token: string): Promise<boolean> {
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashOpaqueToken(token) },
    select: { usedAt: true, expiresAt: true },
  });

  return Boolean(record && !record.usedAt && record.expiresAt > new Date());
}

export interface PasswordResetResult {
  userId: string;
  collegeId?: string;
}

export async function resetPasswordWithToken(
  token: string,
  password: string,
): Promise<PasswordResetResult | null> {
  const tokenHash = hashOpaqueToken(token);
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    select: {
      id: true,
      userId: true,
      usedAt: true,
      expiresAt: true,
      user: {
        select: {
          email: true,
          memberships: {
            where: { status: "ACTIVE" },
            orderBy: { createdAt: "asc" },
            take: 1,
            select: { collegeId: true },
          },
        },
      },
    },
  });

  if (!record || record.usedAt || record.expiresAt <= new Date()) {
    return null;
  }

  const passwordHash = await hashPassword(password);
  const now = new Date();

  const result = await prisma.$transaction(async (tx) => {
    const consumed = await tx.passwordResetToken.updateMany({
      where: {
        id: record.id,
        usedAt: null,
        expiresAt: { gt: now },
      },
      data: { usedAt: now },
    });

    if (consumed.count !== 1) {
      return null;
    }

    await tx.user.update({
      where: { id: record.userId },
      data: {
        passwordHash,
        sessionVersion: { increment: 1 },
      },
    });

    await tx.passwordResetToken.deleteMany({
      where: {
        userId: record.userId,
        id: { not: record.id },
      },
    });

    return {
      userId: record.userId,
      collegeId: record.user.memberships[0]?.collegeId,
    };
  });

  if (result) {
    await safeWriteAuditLog({
      action: "auth.password_reset_completed",
      resource: "user",
      resourceId: result.userId,
      actorId: result.userId,
      collegeId: result.collegeId,
      metadata: { email: record.user.email },
    });
  }

  return result;
}
