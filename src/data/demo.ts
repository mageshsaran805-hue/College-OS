export const studentKpis = [
  {
    label: "Attendance",
    value: "88.4",
    unit: "%",
    icon: "fact_check",
    status: "safe" as const,
    progress: 88.4,
    subtext: "75% statutory requirement",
    trend: "up" as const,
    trendValue: "1.2%",
  },
  {
    label: "Current CGPA",
    value: "8.72",
    unit: "/ 10",
    icon: "school",
    status: "info" as const,
    progress: 87.2,
    subtext: "Semester 5 · 22 credits",
  },
  {
    label: "Pending Assignments",
    value: "3",
    icon: "assignment_late",
    status: "warning" as const,
    subtext: "Next due 18 Nov",
  },
  {
    label: "Fee Balance",
    value: "₹24,500",
    icon: "payments",
    status: "warning" as const,
    subtext: "Due 30 Nov 2024",
  },
  {
    label: "Library Loans",
    value: "2",
    icon: "local_library",
    status: "info" as const,
    subtext: "1 due this week",
  },
  {
    label: "Placement Drives",
    value: "4",
    icon: "work",
    status: "safe" as const,
    subtext: "2 applications in progress",
  },
];

export const timetableToday = [
  {
    time: "09:00 – 10:00",
    course: "Data Structures & Algorithms",
    code: "CS301",
    faculty: "Dr. Marcus Vance",
    room: "Lab 204",
    status: "live" as const,
  },
  {
    time: "10:15 – 11:15",
    course: "Operating Systems",
    code: "CS302",
    faculty: "Prof. Aisha Rahman",
    room: "Room 118",
    status: "upcoming" as const,
  },
  {
    time: "11:30 – 12:30",
    course: "Database Management Systems",
    code: "CS303",
    faculty: "Dr. Leo Martins",
    room: "Lab 106",
    status: "upcoming" as const,
  },
  {
    time: "14:00 – 15:00",
    course: "Technical Communication",
    code: "HS201",
    faculty: "Prof. Clara Nunes",
    room: "Seminar Hall B",
    status: "upcoming" as const,
  },
];

export const announcements = [
  {
    title: "Semester 5 examination timetable published",
    date: "Today · 09:20",
    tag: "Examinations",
  },
  {
    title: "AICTE attendance compliance review opens next week",
    date: "Yesterday · 16:45",
    tag: "Academics",
  },
  {
    title: "Campus placement drive: Northwind Systems",
    date: "28 Oct · 11:00",
    tag: "Placements",
  },
  {
    title: "Library extended hours during end-semester exams",
    date: "26 Oct · 14:30",
    tag: "Library",
  },
];

export const adminKpis = [
  {
    label: "Active Users",
    value: "2,847",
    icon: "group",
    status: "safe" as const,
    progress: 91,
    subtext: "Across 6 departments",
  },
  {
    label: "Pending Approvals",
    value: "18",
    icon: "approval",
    status: "warning" as const,
    subtext: "Oldest waiting 2 days",
  },
  {
    label: "Audit Events (24h)",
    value: "1,204",
    icon: "history",
    status: "info" as const,
    subtext: "0 critical alerts",
  },
  {
    label: "Integrations",
    value: "12",
    icon: "hub",
    status: "safe" as const,
    subtext: "All connectors healthy",
  },
];
