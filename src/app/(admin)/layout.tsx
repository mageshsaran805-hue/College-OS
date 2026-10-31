import { AppShell } from "@/components/layout/AppShell";
import { adminNavigation } from "@/config/navigation";
import { demoCollege, demoTerm, demoUsers } from "@/data/demo";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell
      navGroups={adminNavigation}
      user={demoUsers.admin}
      college={demoCollege}
      termLabel={demoTerm.label}
    >
      {children}
    </AppShell>
  );
}
