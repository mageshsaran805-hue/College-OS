import { AppShell } from "@/components/layout/AppShell";
import { studentNavigation } from "@/config/navigation";
import { demoCollege, demoTerm, demoUsers } from "@/data/demo";

export default function StudentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell
      navGroups={studentNavigation}
      user={demoUsers.student}
      college={demoCollege}
      termLabel={demoTerm.label}
    >
      {children}
    </AppShell>
  );
}
