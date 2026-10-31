import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Timetable" };

export default function TimetablePage() {
  return (
    <ModulePage
      eyebrow="Workspace"
      title="Timetable"
      description="Weekly class schedule, room allocations, and session changes."
      icon="calendar_month"
      notes={["weekly grid", "room allocation", "faculty assignments", "schedule changes"]}
    />
  );
}
