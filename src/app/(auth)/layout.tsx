import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container font-headline-sm text-headline-sm font-semibold text-on-primary">
            CO
          </span>
          <span className="flex flex-col">
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
              {siteConfig.name}
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
              Institutional gateway
            </span>
          </span>
        </Link>
        <Link
          href="/login"
          className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
        >
          Sign in
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16">{children}</main>

      <footer className="px-6 pb-6 text-center font-body-sm text-body-sm text-on-surface-variant">
        Access is restricted to authorised institutional accounts.
      </footer>
    </div>
  );
}
