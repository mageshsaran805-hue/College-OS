import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Faculty Overview" };

export default function FacultyDashboardPage() {
  return (
    <ModulePlaceholder
      eyebrow="Faculty workspace"
      title="Faculty Overview"
      description="Assigned classes, upcoming sessions, pending marks, and student advisory activity."
      icon="dashboard"
      notes={["assigned classes", "today's sessions", "pending marks", "advisee activity"]}
    />
  );
}
