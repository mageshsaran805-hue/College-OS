import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Marks Entry" };

export default function MarksEntryPage() {
  return (
    <ModulePage
      eyebrow="Faculty workspace"
      title="Marks Entry"
      description="Continuous assessment and examination marks entry for assigned classes."
      icon="edit_note"
      notes={["assessment components", "student rosters", "moderation", "submission locks"]}
    />
  );
}
