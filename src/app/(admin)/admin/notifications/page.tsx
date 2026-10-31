import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Notifications" };

export default function AdminNotificationsPage() {
  return (
    <ModulePage
      eyebrow="Governance"
      title="Notifications"
      description="Institution-wide announcements, delivery status, and notification governance."
      icon="notifications"
      notes={["announcement composer", "audience targeting", "delivery status", "notification policy"]}
    />
  );
}
