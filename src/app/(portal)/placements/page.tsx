import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Placements" };

export default function PlacementsPage() {
  return (
    <ModulePage
      eyebrow="Career services"
      title="Placements"
      description="Recruitment drives, eligibility, applications, interviews, and offers."
      icon="work"
      notes={["drive calendar", "eligibility", "applications", "interview schedule", "offers"]}
    />
  );
}
