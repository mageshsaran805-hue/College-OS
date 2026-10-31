import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Notifications" };

export default function AdminNotificationsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Governance"
      title="Notifications"
      description="Institution-wide announcements, delivery status, and notification governance."
      icon="notifications"
      notes={[
        "announcement composer",
        "audience targeting",
        "delivery status",
        "notification policy",
      ]}
    />
  );
}
