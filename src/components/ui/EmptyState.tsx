import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = "inbox", title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-12 text-center">
      <span className="material-symbols-outlined mb-3 text-4xl text-on-surface-variant" aria-hidden="true">
        {icon}
      </span>
      <h2 className="font-headline-sm text-headline-sm text-on-surface">{title}</h2>
      {description && (
        <p className="mt-1 max-w-md font-body-md text-body-md text-on-surface-variant">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
