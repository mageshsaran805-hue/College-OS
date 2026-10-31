"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { roleLabels } from "@/lib/rbac";
import type { NavGroup, User } from "@/types";

interface HeaderProps {
  user: User;
  navGroups: NavGroup[];
  termLabel: string;
  homeHref: string;
  profileHref: string;
  notificationsHref: string;
  onMenuClick: () => void;
}

export function Header({
  user,
  navGroups,
  termLabel,
  homeHref,
  profileHref,
  notificationsHref,
  onMenuClick,
}: HeaderProps) {
  const pathname = usePathname();

  const items = navGroups.flatMap((group) =>
    group.items.map((item) => ({ ...item, group: group.title })),
  );

  const activeItem = items
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((a, b) => b.href.length - a.href.length)[0];

  const breadcrumbs = [
    { label: "College OS", href: homeHref },
    ...(activeItem?.group ? [{ label: activeItem.group }] : []),
    ...(activeItem ? [{ label: activeItem.label }] : []),
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-surface-container bg-surface-container-lowest/90 px-4 backdrop-blur-xl sm:px-6 lg:left-72 lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface lg:hidden"
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>

        <nav className="hidden min-w-0 items-center gap-1.5 md:flex" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="flex min-w-0 items-center gap-1.5">
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="truncate font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="truncate font-label-sm text-label-sm font-semibold text-on-surface">
                  {crumb.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span
                  className="material-symbols-outlined text-sm text-outline-variant"
                  aria-hidden="true"
                >
                  chevron_right
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="relative hidden max-w-xs flex-1 items-center xl:flex">
          <span
            className="material-symbols-outlined pointer-events-none absolute left-3 text-lg text-on-surface-variant"
            aria-hidden="true"
          >
            search
          </span>
          <input
            type="search"
            placeholder="Search students, courses, records..."
            className="h-9 w-full rounded-lg bg-surface-container-low pl-9 pr-14 font-body-md text-body-md text-on-surface transition-all placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-1 focus:ring-secondary"
            aria-label="Global search"
          />
          <kbd className="pointer-events-none absolute right-2.5 rounded bg-surface-container px-1.5 py-0.5 font-code-metric text-[10px] text-on-surface-variant">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full bg-surface-container-low px-3 py-1 2xl:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          <span className="font-label-md text-label-md font-medium text-on-surface">
            {termLabel}
          </span>
          <span className="rounded-full bg-surface-container px-1.5 py-0.5 font-label-sm text-[10px] uppercase text-on-surface-variant">
            Active term
          </span>
        </div>

        <Link
          href={notificationsHref}
          className="relative rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
        </Link>

        <div className="mx-1 hidden h-6 w-px bg-surface-container-highest md:block" />

        <Link
          href={profileHref}
          className={cn(
            "flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-surface-container-low",
          )}
          aria-label="Open profile"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container font-label-sm text-label-sm font-semibold text-on-primary">
            {getInitials(user.name)}
          </span>
          <span className="hidden flex-col text-left md:flex">
            <span className="font-label-md text-label-md font-medium leading-none text-on-surface">
              {user.name}
            </span>
            <span className="mt-0.5 font-label-sm text-label-sm leading-none text-on-surface-variant">
              {roleLabels[user.role]}
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}
