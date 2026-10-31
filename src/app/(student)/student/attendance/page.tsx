import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Attendance" };

export default function AttendancePage() {
  return (
    <ModulePlaceholder
      eyebrow="Workspace"
      title="Attendance"
      description="Statutory attendance tracking, session records, and shortage monitoring."
      icon="fact_check"
      notes={["daily attendance", "subject-wise summary", "shortage alerts", "correction requests"]}
    />
  );
}
