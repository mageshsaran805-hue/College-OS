import type { ReactNode } from "react";
import { classNames } from "@/lib/utils";

type KpiStatus = "safe" | "warning" | "critical" | "info";
type IconTone = "secondary" | "success" | "warning" | "error" | "info" | "on-surface";
type Trend = "up" | "down" | "neutral";

interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: Trend;
  trendValue?: string;
  icon?: string;
  iconTone?: IconTone;
  status?: KpiStatus;
  progress?: number;
  progressLabel?: string;
  subtext?: string;
  subtextRight?: string;
  children?: ReactNode;
  className?: string;
}

const statusStyles: Record<
  KpiStatus,
  { chip: string; dot: string; bar: string; label: string }
> = {
  safe: {
    chip: "bg-success-container text-on-success-container",
    dot: "bg-success",
    bar: "bg-success",
    label: "On track",
  },
  warning: {
    chip: "bg-warning-container text-on-warning-container",
    dot: "bg-warning",
    bar: "bg-warning",
    label: "Attention",
  },
  critical: {
    chip: "bg-error-container text-on-error-container",
    dot: "bg-error",
    bar: "bg-error",
    label: "Critical",
  },
  info: {
    chip: "bg-info-container text-on-info-container",
    dot: "bg-info",
    bar: "bg-info",
    label: "Info",
  },
};

const iconTones: Record<IconTone, string> = {
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
  "on-surface": "text-on-surface-variant",
};

export function KPICard({
  label,
  value,
  unit,
  trend,
  trendValue,
  icon,
  iconTone = "secondary",
  status,
  progress,
  progressLabel,
  subtext,
  subtextRight,
  children,
  className,
}: KPICardProps) {
  const style = status ? statusStyles[status] : undefined;

  return (
    <div
      className={classNames(
        "group flex flex-col justify-between rounded-xl bg-surface-container-lowest p-4 shadow-card transition-shadow hover:shadow-panel",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 font-label-sm text-label-sm text-on-surface-variant">
        <span className="uppercase tracking-wider">{label}</span>
        {icon && (
          <span className={classNames("material-symbols-outlined text-base", iconTones[iconTone])} aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      <div className="mt-2">
        <div className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface">
          {value}
          {unit && <span className="ml-1 font-body-md text-body-md font-normal text-on-surface-variant">{unit}</span>}
        </div>

        {(subtext || trendValue) && (
          <div className="mt-1 flex items-center justify-between gap-2 font-body-sm text-body-sm text-on-surface-variant">
            {subtext && <span className="truncate">{subtext}</span>}
            {trendValue && (
              <span
                className={classNames(
                  "shrink-0 font-code-metric text-label-sm font-medium",
                  trend === "up" && "text-success",
                  trend === "down" && "text-error",
                  (!trend || trend === "neutral") && "text-on-surface-variant"
                )}
              >
                {trend === "up" ? "↑ " : trend === "down" ? "↓ " : ""}
                {trendValue}
              </span>
            )}
          </div>
        )}
      </div>

      {(progress !== undefined || status) && (
        <div className="mt-3 space-y-1.5">
          {progress !== undefined && (
            <>
              {progressLabel && (
                <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>{progressLabel}</span>
                  <span className="font-code-metric">{Math.round(progress)}%</span>
                </div>
              )}
              <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${label} progress`}
              >
                <div
                  className={classNames("h-full rounded-full", style?.bar ?? "bg-secondary")}
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </>
          )}
          {status && style && (
            <span
              className={classNames(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-label-sm text-label-sm",
                style.chip
              )}
            >
              <span className={classNames("h-1.5 w-1.5 rounded-full", style.dot)} />
              {style.label}
            </span>
          )}
        </div>
      )}

      {subtextRight && (
        <div className="mt-3 border-t border-surface-container pt-2 font-label-sm text-label-sm text-outline">
          {subtextRight}
        </div>
      )}

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
