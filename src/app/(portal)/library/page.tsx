import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Library" };

export default function LibraryPage() {
  return (
    <ModulePage
      eyebrow="Campus services"
      title="Library & Services"
      description="Catalogue search, active loans, reservations, and digital resources."
      icon="local_library"
      notes={["catalogue search", "active loans", "reservations", "digital resources", "fines"]}
    />
  );
}
