import Link from "next/link";
import { buttonStyles } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-xl bg-surface-container-lowest p-8 text-center shadow-card">
        <span className="material-symbols-outlined text-5xl text-secondary" aria-hidden="true">
          explore_off
        </span>
        <p className="mt-4 font-label-sm text-label-sm uppercase tracking-wider text-outline">
          404
        </p>
        <h1 className="mt-1 font-headline-lg text-headline-lg text-on-surface">Page not found</h1>
        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
          The route you requested does not exist in this workspace.
        </p>
        <Link href="/student/dashboard" className={buttonStyles({ className: "mt-6" })}>
          Return to dashboard
        </Link>
      </div>
    </main>
  );
}
