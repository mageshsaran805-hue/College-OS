import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "Roles & Permissions" };

export default function AdminRolesPage() {
  return (
    <ModulePlaceholder
      eyebrow="People & access"
      title="Roles & Permissions"
      description="Role definitions, permission matrix, and periodic access reviews."
      icon="shield_person"
      notes={["role catalogue", "permission matrix", "scoped access", "access reviews"]}
    />
  );
}
