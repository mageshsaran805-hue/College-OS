import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "My Academics" };

export default function AcademicsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Workspace"
      title="My Academics"
      description="Course registration, curriculum progress, and continuous assessment records."
      icon="school"
      notes={["course registration", "curriculum progress", "credit summary", "assessment history"]}
    />
  );
}
