import { ModulePage } from "@/components/shared/ModulePage";

export const metadata = { title: "User Management" };

export default function AdminUsersPage() {
  return (
    <ModulePage
      eyebrow="People & access"
      title="User Management"
      description="Accounts, invitations, status, and role assignment across the institution."
      icon="group"
      notes={["user directory", "invitations", "account status", "role assignment", "bulk actions"]}
    />
  );
}
