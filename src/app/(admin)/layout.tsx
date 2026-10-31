import { AppShell } from "@/components/layout/AppShell";
import { adminNavigation } from "@/config/navigation";
import { requireRole } from "@/server/auth/tenant";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const tenant = await requireRole(["admin", "super-admin", "auditor"]);

  return (
    <AppShell
      navGroups={adminNavigation}
      user={tenant.user}
      college={tenant.college}
      termLabel={tenant.term?.name ?? "No active term"}
    >
      {children}
    </AppShell>
  );
}
