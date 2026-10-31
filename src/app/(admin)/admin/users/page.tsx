import { ModulePlaceholder } from "@/components/scaffold/ModulePlaceholder";

export const metadata = { title: "User Management" };

export default function AdminUsersPage() {
  return (
    <ModulePlaceholder
      eyebrow="People & access"
      title="User Management"
      description="Accounts, invitations, status, and role assignment across the institution."
      icon="group"
      notes={["user directory", "invitations", "account status", "role assignment", "bulk actions"]}
    />
  );
}
