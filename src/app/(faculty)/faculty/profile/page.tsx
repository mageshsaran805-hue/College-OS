import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Profile" };

export default function FacultyProfilePage() {
  return (
    <ModulePlaceholder
      eyebrow="Account"
      title="Profile"
      description="Faculty identity, department details, assigned courses, and account security."
      icon="person"
      notes={["personal details", "department", "assigned courses", "security settings"]}
    />
  );
}
