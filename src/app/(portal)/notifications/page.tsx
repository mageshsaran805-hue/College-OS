import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <ModulePage
      eyebrow="Account"
      title="Notifications"
      description="Institutional announcements, account activity, and targeted alerts."
      icon="notifications"
      notes={["announcements", "targeted alerts", "read state", "notification preferences"]}
    />
  );
}
