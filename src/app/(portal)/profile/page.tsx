import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <ModulePage
      eyebrow="Account"
      title="Profile"
      description="Identity, contact details, linked records, and account security."
      icon="person"
      notes={["personal details", "contact information", "linked records", "security settings"]}
    />
  );
}
