import Link from "next/link";
import { KPICard, PageHeader, StatusBadge } from "@/components/ui";
import { adminKpis } from "@/data/demo";

export const metadata = { title: "Admin overview" };

const quickLinks = [
  {
    href: "/admin/users",
    icon: "group",
    title: "Users",
    description: "Accounts, invitations, status, and role assignment.",
  },
  {
    href: "/admin/roles",
    icon: "shield_person",
    title: "Roles & permissions",
    description: "Role definitions, permission matrix, and access reviews.",
  },
  {
    href: "/admin/audit",
    icon: "history",
    title: "Audit logs",
    description: "Tamper-evident activity trail and compliance exports.",
  },
  {
    href: "/admin/settings",
    icon: "settings",
    title: "Settings",
    description: "Institution profile, academic terms, and platform preferences.",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administration"
        title="Platform overview"
        description="Institution-wide operations, access governance, and platform health."
        actions={<StatusBadge label="All systems operational" variant="success" />}
      />

      <section aria-label="Administrative metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </section>

      <section aria-labelledby="admin-shortcuts" className="space-y-3">
        <h2 id="admin-shortcuts" className="font-headline-sm text-headline-sm text-on-surface">
          Administration shortcuts
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-start gap-4 rounded-xl bg-surface-container-lowest p-5 shadow-card transition-shadow hover:shadow-panel"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-secondary">
                <span className="material-symbols-outlined text-xl" aria-hidden="true">{link.icon}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-label-md text-label-md font-medium text-on-surface">{link.title}</span>
                  <span className="material-symbols-outlined text-base text-outline transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                    arrow_forward
                  </span>
                </span>
                <span className="mt-1 block font-body-sm text-body-sm text-on-surface-variant">
                  {link.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
