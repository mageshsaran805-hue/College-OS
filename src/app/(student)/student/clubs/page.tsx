import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Clubs & Events" };

export default function ClubsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Campus life"
      title="Clubs & Events"
      description="Student organizations, campus events, and engagement opportunities."
      icon="groups"
      notes={["club directory", "event calendar", "memberships", "registrations"]}
    />
  );
}
