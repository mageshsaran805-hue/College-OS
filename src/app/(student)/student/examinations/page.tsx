import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Examinations & Results" };

export default function ExaminationsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Workspace"
      title="Examinations & Results"
      description="Exam schedules, hall tickets, results, and revaluation requests."
      icon="assignment"
      notes={["exam timetable", "hall tickets", "results", "revaluation", "supplementary exams"]}
    />
  );
}
