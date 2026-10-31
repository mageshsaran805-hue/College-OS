import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Attendance" };

export default function AttendancePage() {
  return (
    <ModulePage
      eyebrow="Workspace"
      title="Attendance"
      description="Statutory attendance tracking, session records, and shortage monitoring."
      icon="fact_check"
      notes={["daily attendance", "subject-wise summary", "shortage alerts", "correction requests"]}
    />
  );
}
