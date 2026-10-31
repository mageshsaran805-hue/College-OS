import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 font-label-sm text-label-sm uppercase tracking-wider text-secondary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-3xl font-body-md text-body-md text-on-surface-variant">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
