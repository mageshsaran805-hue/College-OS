import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <ModulePlaceholder
      eyebrow="Account"
      title="Profile"
      description="Identity, contact details, linked records, and account security."
      icon="person"
      notes={["personal details", "contact information", "linked records", "security settings"]}
    />
  );
}
