import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Library" };

export default function LibraryPage() {
  return (
    <ModulePlaceholder
      eyebrow="Campus services"
      title="Library & Services"
      description="Catalogue search, active loans, reservations, and digital resources."
      icon="local_library"
      notes={["catalogue search", "active loans", "reservations", "digital resources", "fines"]}
    />
  );
}
