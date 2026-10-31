import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Course Materials" };

export default function MaterialsPage() {
  return (
    <ModulePage
      eyebrow="Faculty workspace"
      title="Course Materials"
      description="Lecture notes, references, and shared resources for assigned courses."
      icon="menu_book"
      notes={["course resources", "upload and publish", "student visibility", "version history"]}
    />
  );
}
