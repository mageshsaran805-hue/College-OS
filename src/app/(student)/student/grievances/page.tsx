import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Grievances" };

export default function GrievancesPage() {
  return (
    <ModulePlaceholder
      eyebrow="Support"
      title="Grievances"
      description="Raise, track, and resolve support requests with the committee desk."
      icon="support_agent"
      notes={["new request", "case tracking", "committee responses", "resolution history"]}
    />
  );
}
