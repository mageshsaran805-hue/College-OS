import type { User } from "@/types";

export const siteConfig = {
  name: "College OS",
  shortName: "CO",
  description:
    "A unified college operating system for academics, attendance, examinations, finance, campus operations, and institutional analytics.",
  url: process.env.APP_URL ?? "http://localhost:3000",
  version: "4.3.0",
} as const;

export const demoCollege = {
  name: "Apex Institute of Technology",
  code: "#US-CAMPUS-01",
  campusId: "us-campus-01",
  region: "US-EAST",
  status: "active" as const,
};

export const demoTerm = {
  id: "ay-2024-25-s1",
  label: "AY 2024–25 • Semester 1",
  shortLabel: "AY 2024–25",
  status: "active" as const,
};

/**
 * Temporary demo identities for the UI scaffold. These are replaced by the
 * session provider when authentication is wired in. Do not use this module for
 * authorisation decisions.
 */
export const demoUsers = {
  student: {
    id: "stu-001",
    name: "Elena Rostova",
    email: "e.rostova@apex.edu",
    role: "student",
    department: "Computer Science",
    designation: "B.Tech · Semester 5",
    collegeId: demoCollege.campusId,
    termId: demoTerm.id,
  },
  faculty: {
    id: "fac-001",
    name: "Dr. Marcus Vance",
    email: "m.vance@apex.edu",
    role: "faculty",
    department: "Computer Science",
    designation: "Associate Professor",
    collegeId: demoCollege.campusId,
    termId: demoTerm.id,
  },
  parent: {
    id: "par-001",
    name: "Nikolai Rostov",
    email: "n.rostov@example.com",
    role: "parent",
    designation: "Guardian of Elena Rostova",
    collegeId: demoCollege.campusId,
    termId: demoTerm.id,
  },
  admin: {
    id: "adm-001",
    name: "Dr. Elena Finch",
    email: "e.finch@apex.edu",
    role: "admin",
    department: "Administration",
    designation: "Registrar",
    collegeId: demoCollege.campusId,
    termId: demoTerm.id,
  },
} as const satisfies Record<"student" | "faculty" | "parent" | "admin", User>;
