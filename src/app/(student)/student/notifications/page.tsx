import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Account"
      title="Notifications"
      description="Institutional announcements, account activity, and targeted alerts."
      icon="notifications"
      notes={["announcements", "targeted alerts", "read state", "notification preferences"]}
    />
  );
}
