"use client";

import { useState } from "react";
import { isAdminRole } from "@/lib/rbac";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import type { NavGroup, User } from "@/types";

interface AppShellProps {
  children: React.ReactNode;
  navGroups: NavGroup[];
  user: User;
  college: { name: string; code: string };
  termLabel: string;
}

export function AppShell({ children, navGroups, user, college, termLabel }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const admin = isAdminRole(user.role);
  const homeHref = admin ? "/admin" : "/dashboard";
  const profileHref = admin ? "/admin/settings" : "/profile";
  const notificationsHref = admin ? "/admin/notifications" : "/notifications";

  return (
    <div className="min-h-screen bg-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface-container-lowest focus:px-4 focus:py-2 focus:font-label-md focus:text-label-md focus:text-on-surface focus:shadow-panel"
      >
        Skip to content
      </a>
      <Sidebar
        groups={navGroups}
        college={college}
        homeHref={homeHref}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="lg:pl-72">
        <Header
          user={user}
          navGroups={navGroups}
          termLabel={termLabel}
          homeHref={homeHref}
          profileHref={profileHref}
          notificationsHref={notificationsHref}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main id="main-content" className="px-4 pb-10 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
