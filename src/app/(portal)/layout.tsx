import { AppShell } from "@/components/layout/AppShell";
import { getPortalNavigation } from "@/config/navigation";
import { demoCollege, demoTerm, demoUsers } from "@/config/site";

export default function PortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell
      navGroups={getPortalNavigation("student")}
      user={demoUsers.student}
      college={demoCollege}
      termLabel={demoTerm.label}
    >
      {children}
    </AppShell>
  );
}
