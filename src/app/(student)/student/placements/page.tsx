import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Placements" };

export default function PlacementsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Career services"
      title="Placements"
      description="Recruitment drives, eligibility, applications, interviews, and offers."
      icon="work"
      notes={["drive calendar", "eligibility", "applications", "interview schedule", "offers"]}
    />
  );
}
