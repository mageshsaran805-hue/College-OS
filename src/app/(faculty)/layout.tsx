import { AppShell } from "@/components/layout/AppShell";
import { facultyNavigation } from "@/config/navigation";
import { demoCollege, demoTerm, demoUsers } from "@/data/demo";

export default function FacultyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppShell
      navGroups={facultyNavigation}
      user={demoUsers.faculty}
      college={demoCollege}
      termLabel={demoTerm.label}
    >
      {children}
    </AppShell>
  );
}
