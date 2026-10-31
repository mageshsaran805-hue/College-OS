import Link from "next/link";
import { buttonStyles } from "@/components/ui";

export const metadata = { title: "Unauthorized" };

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md rounded-xl bg-surface-container-lowest p-8 text-center shadow-card">
        <span className="material-symbols-outlined text-5xl text-warning" aria-hidden="true">
          lock
        </span>
        <p className="mt-4 font-label-sm text-label-sm uppercase tracking-wider text-outline">
          403
        </p>
        <h1 className="mt-1 font-headline-lg text-headline-lg text-on-surface">
          Access restricted
        </h1>
        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
          Your role does not permit access to this area. Contact an administrator if you believe
          this is a mistake.
        </p>
        <Link href="/" className={buttonStyles({ className: "mt-6" })}>
          Return to my workspace
        </Link>
      </div>
    </main>
  );
}
