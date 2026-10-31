import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Marks Entry" };

export default function MarksEntryPage() {
  return (
    <ModulePlaceholder
      eyebrow="Faculty workspace"
      title="Marks Entry"
      description="Continuous assessment and examination marks entry for assigned classes."
      icon="edit_note"
      notes={["assessment components", "student rosters", "moderation", "submission locks"]}
    />
  );
}
