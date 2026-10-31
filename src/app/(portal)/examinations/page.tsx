import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Examinations & Results" };

export default function ExaminationsPage() {
  return (
    <ModulePage
      eyebrow="Workspace"
      title="Examinations & Results"
      description="Exam schedules, hall tickets, results, and revaluation requests."
      icon="assignment"
      notes={["exam timetable", "hall tickets", "results", "revaluation", "supplementary exams"]}
    />
  );
}
