export type UserRole =
  "student" | "faculty" | "staff" | "parent" | "admin" | "super-admin" | "auditor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  designation?: string;
  collegeId?: string;
  termId?: string;
}

export interface College {
  id: string;
  name: string;
  code: string;
  campusId: string;
  region: string;
  status: "active" | "inactive" | "pending";
  studentCount?: number;
  facultyCount?: number;
}

export interface AcademicTerm {
  id: string;
  name: string;
  year: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "completed";
}
