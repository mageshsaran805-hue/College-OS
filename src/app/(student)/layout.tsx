import { AppShell } from "@/components/layout/AppShell";
import { studentNavigation } from "@/config/navigation";
import { requireRole } from "@/server/auth/tenant";

export const dynamic = "force-dynamic";

export default async function StudentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const tenant = await requireRole(["student"]);

  return (
    <AppShell
      navGroups={studentNavigation}
      user={tenant.user}
      college={tenant.college}
      termLabel={tenant.term?.name ?? "No active term"}
    >
      {children}
    </AppShell>
  );
}
