import type { DefaultSession } from "next-auth";
import type { UserRole } from "@/types";

declare module "next-auth" {
  interface User {
    role: UserRole;
    membershipId: string;
    collegeId: string;
    collegeName: string;
    collegeCode: string;
    sessionVersion: number;
    department?: string;
    designation?: string;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
      membershipId: string;
      collegeId: string;
      collegeName: string;
      collegeCode: string;
      sessionVersion: number;
      department?: string;
      designation?: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole;
    membershipId?: string;
    collegeId?: string;
    collegeName?: string;
    collegeCode?: string;
    sessionVersion?: number;
    department?: string;
    designation?: string;
  }
}
