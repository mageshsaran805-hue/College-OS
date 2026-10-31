import { classNames } from "@/lib/utils";

export type StatusVariant = "success" | "warning" | "error" | "info" | "neutral" | "live";

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
  dot?: boolean;
  className?: string;
  large?: boolean;
}

const variants: Record<StatusVariant, { classes: string; dot: string }> = {
  success: {
    classes: "bg-success-container text-on-success-container",
    dot: "bg-success",
  },
  warning: {
    classes: "bg-warning-container text-on-warning-container",
    dot: "bg-warning",
  },
  error: {
    classes: "bg-error-container text-on-error-container",
    dot: "bg-error",
  },
  info: {
    classes: "bg-info-container text-on-info-container",
    dot: "bg-info",
  },
  neutral: {
    classes: "bg-surface-container text-on-surface-variant",
    dot: "bg-outline",
  },
  live: {
    classes: "bg-secondary-fixed text-on-secondary-fixed",
    dot: "bg-secondary",
  },
};

export function StatusBadge({
  label,
  variant = "neutral",
  dot = true,
  className,
  large = false,
}: StatusBadgeProps) {
  const style = variants[variant];

  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-label-sm text-label-sm font-medium",
        style.classes,
        large && "px-2.5 py-1 text-label-md",
        className
      )}
    >
      {dot && <span className={classNames("h-1.5 w-1.5 rounded-full", style.dot)} aria-hidden="true" />}
      {label}
    </span>
  );
}
