import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Course Materials" };

export default function MaterialsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Faculty workspace"
      title="Course Materials"
      description="Lecture notes, references, and shared resources for assigned courses."
      icon="menu_book"
      notes={["course resources", "upload and publish", "student visibility", "version history"]}
    />
  );
}
