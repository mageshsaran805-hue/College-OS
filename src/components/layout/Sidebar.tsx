"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/types";

interface SidebarProps {
  groups: NavGroup[];
  college: { name: string; code: string };
  homeHref: string;
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ groups, college, homeHref, mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const hrefs = groups.flatMap((group) =>
    group.items.flatMap((item) => [
      item.href,
      ...(item.children?.map((child) => child.href) ?? []),
    ]),
  );

  const activeHref = hrefs
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0];

  const isActive = (href: string) => href === activeHref;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-inverse-surface/40 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-surface-container-lowest shadow-soft transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Primary navigation"
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-4">
          <Link href={homeHref} className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container font-headline-sm text-headline-sm font-semibold text-on-primary">
              CO
            </span>
            <span className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
                College OS
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                Institutional platform
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface lg:hidden"
            aria-label="Close navigation"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="mx-4 mt-2 flex items-center justify-between rounded-xl bg-surface-container-low p-3">
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-label-md text-label-md font-medium text-on-surface">
              {college.name}
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 font-code-metric text-label-sm text-on-surface-variant">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {college.code}
            </span>
          </div>
          <span
            className="material-symbols-outlined text-base text-on-surface-variant"
            aria-hidden="true"
          >
            unfold_more
          </span>
        </div>

        <nav className="mt-4 flex-1 overflow-y-auto px-3 pb-4" aria-label="Sections">
          {groups.map((group, index) => (
            <div key={group.title ?? index} className="mb-4">
              {group.title && (
                <div className="px-2 py-1.5 font-label-sm text-label-sm uppercase tracking-wider text-outline">
                  {group.title}
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors",
                          active
                            ? "bg-secondary text-on-secondary shadow-sm"
                            : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
                        )}
                      >
                        {item.icon && (
                          <span
                            className="material-symbols-outlined text-[20px]"
                            aria-hidden="true"
                          >
                            {item.icon}
                          </span>
                        )}
                        <span className="flex-1 font-label-md text-label-md">{item.label}</span>
                        {item.badge !== undefined && (
                          <span
                            className={cn(
                              "rounded-full px-1.5 py-0.5 font-code-metric text-[10px]",
                              active
                                ? "bg-on-secondary/20 text-on-secondary"
                                : "bg-surface-container text-on-surface-variant",
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>

                      {item.children && item.children.length > 0 && (
                        <div className="ml-6 mt-1 flex flex-col gap-0.5 border-l border-surface-container-high pl-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                "rounded-lg px-2.5 py-1.5 font-body-sm text-body-sm transition-colors",
                                isActive(child.href)
                                  ? "bg-surface-container text-on-surface"
                                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mx-3 mb-3 rounded-xl bg-surface-container-low p-3">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm font-medium text-on-surface">
              Frontend scaffold
            </span>
            <span className="rounded-full bg-secondary-fixed px-1.5 py-0.5 font-label-sm text-[10px] uppercase text-on-secondary-fixed">
              Demo
            </span>
          </div>
          <p className="mt-1 font-body-sm text-body-sm leading-snug text-on-surface-variant">
            Auth, data, and permissions are not wired yet.
          </p>
        </div>
      </aside>
    </>
  );
}
