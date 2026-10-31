import { AppShell } from "@/components/layout/AppShell";
import { facultyNavigation } from "@/config/navigation";
import { requireRole } from "@/server/auth/tenant";

export const dynamic = "force-dynamic";

export default async function FacultyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const tenant = await requireRole(["faculty", "staff"]);

  return (
    <AppShell
      navGroups={facultyNavigation}
      user={tenant.user}
      college={tenant.college}
      termLabel={tenant.term?.name ?? "No active term"}
    >
      {children}
    </AppShell>
  );
}
