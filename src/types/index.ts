export type UserRole = "student" | "faculty" | "staff" | "parent" | "admin" | "super-admin" | "auditor";

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

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number | string;
  children?: NavItem[];
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface KPIMetric {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: string;
  status?: "safe" | "warning" | "critical" | "info";
  progress?: number;
  subtext?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  metadata?: Record<string, unknown>;
}
