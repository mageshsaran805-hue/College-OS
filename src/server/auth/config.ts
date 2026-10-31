import "server-only";

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/features/auth/schemas";
import { safeWriteAuditLog } from "@/server/audit";
import { DUMMY_PASSWORD_HASH, verifyPassword } from "@/server/auth/password";
import { toUserRole } from "@/server/auth/roles";
import { prisma } from "@/server/db/client";

const isProduction = process.env.NODE_ENV === "production";
const requestedSameSite = (process.env.SESSION_SAME_SITE ?? "lax") as "lax" | "strict" | "none";
const sameSite = requestedSameSite === "none" && !isProduction ? "lax" : requestedSameSite;

export const authConfig = {
  trustHost: true,
  secret:
    process.env.AUTH_SECRET ?? (isProduction ? undefined : "college-os-development-only-secret"),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
    updateAge: 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: `${isProduction ? "__Secure-" : ""}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite,
        path: "/",
        secure: isProduction,
      },
    },
  },
  providers: [
    Credentials({
      name: "Institutional account",
      credentials: {
        email: { label: "Institutional email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          include: {
            memberships: {
              where: {
                status: "ACTIVE",
                college: { status: "ACTIVE" },
              },
              orderBy: { createdAt: "asc" },
              take: 1,
              include: { college: true },
            },
          },
        });

        if (!user?.passwordHash) {
          await verifyPassword(parsed.data.password, DUMMY_PASSWORD_HASH);
          return null;
        }

        const passwordValid = await verifyPassword(parsed.data.password, user.passwordHash);

        if (!passwordValid) {
          return null;
        }

        const membership = user.memberships[0];

        if (!membership) {
          return null;
        }

        const now = new Date();
        await prisma.$transaction([
          prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: now },
          }),
          prisma.membership.update({
            where: { id: membership.id },
            data: { lastAccessedAt: now },
          }),
        ]);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: toUserRole(membership.role),
          membershipId: membership.id,
          collegeId: membership.collegeId,
          collegeName: membership.college.name,
          collegeCode: membership.college.code,
          sessionVersion: user.sessionVersion,
          department: membership.department ?? undefined,
          designation: membership.designation ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.membershipId = user.membershipId;
        token.collegeId = user.collegeId;
        token.collegeName = user.collegeName;
        token.collegeCode = user.collegeCode;
        token.sessionVersion = user.sessionVersion;
        token.department = user.department;
        token.designation = user.designation;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id;
      if (token.role) session.user.role = token.role;
      if (token.membershipId) session.user.membershipId = token.membershipId;
      if (token.collegeId) session.user.collegeId = token.collegeId;
      if (token.collegeName) session.user.collegeName = token.collegeName;
      if (token.collegeCode) session.user.collegeCode = token.collegeCode;
      if (typeof token.sessionVersion === "number") {
        session.user.sessionVersion = token.sessionVersion;
      }
      session.user.department = token.department;
      session.user.designation = token.designation;

      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (!user.id) {
        return;
      }

      await safeWriteAuditLog({
        action: "auth.sign_in",
        resource: "session",
        resourceId: user.id,
        actorId: user.id,
        collegeId: user.collegeId,
        metadata: {
          email: user.email,
          collegeCode: user.collegeCode,
        },
      });
    },
  },
} satisfies NextAuthConfig;
