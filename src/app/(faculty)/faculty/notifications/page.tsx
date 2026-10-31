import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Notifications" };

export default function FacultyNotificationsPage() {
  return (
    <ModulePlaceholder
      eyebrow="Account"
      title="Notifications"
      description="Class updates, marks deadlines, and institutional announcements for faculty."
      icon="notifications"
      notes={["class updates", "marks deadlines", "announcements", "notification preferences"]}
    />
  );
}
