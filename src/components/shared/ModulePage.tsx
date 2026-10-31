import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface ModulePageProps {
  eyebrow?: string;
  title: string;
  description: string;
  icon?: string;
  notes?: string[];
}

export function ModulePage({ eyebrow, title, description, icon, notes }: ModulePageProps) {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <StatusBadge label="Scaffolded" variant="info" />
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Route and layout are in place. Data, permissions, and workflows are next.
        </span>
      </div>
      <EmptyState
        icon={icon}
        title="Module pending implementation"
        description={
          notes && notes.length > 0
            ? `Planned scope: ${notes.join(" · ")}.`
            : "The screen structure is ready for the module implementation."
        }
      />
    </div>
  );
}
