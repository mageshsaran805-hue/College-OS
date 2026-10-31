import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, StatusBadge } from "@/components/ui";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { roleHome } from "@/lib/rbac";
import { getTenantContext } from "@/server/auth/tenant";

export const metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

interface LoginPageProps {
  searchParams: Promise<{ reset?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const tenant = await getTenantContext();

  if (tenant) {
    redirect(roleHome[tenant.role]);
  }

  const { reset } = await searchParams;

  return (
    <div className="w-full max-w-md rounded-xl bg-surface-container-lowest p-6 shadow-card sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
            Sign in
          </h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Use your institutional credentials to continue.
          </p>
        </div>
        <StatusBadge label="Secure sign-in" variant="success" />
      </div>

      {reset === "success" ? (
        <p
          role="status"
          className="mt-5 rounded-lg border border-success/20 bg-success-container px-3 py-2 font-body-sm text-body-sm text-on-success-container"
        >
          Password updated. Sign in with your new password.
        </p>
      ) : null}

      <LoginForm />

      <div className="mt-6 rounded-lg bg-surface-container-low p-3">
        <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
          Accounts are provisioned by your institution. Contact your administrator if you cannot
          access your workspace.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-surface-container-high" />
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
          or
        </span>
        <div className="h-px flex-1 bg-surface-container-high" />
      </div>

      <Button variant="secondary" className="mt-6 w-full" disabled>
        Institutional SSO (not configured)
      </Button>

      <Link
        href="/forgot-password"
        className="mt-4 block text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface"
      >
        Need help signing in?
      </Link>

      <p className="mt-6 text-center font-body-sm text-body-sm text-on-surface-variant">
        <Link href="/" className="hover:text-on-surface">
          Back to College OS
        </Link>
      </p>
    </div>
  );
}
