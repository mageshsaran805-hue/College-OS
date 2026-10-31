import Link from "next/link";
import { Button, Input, StatusBadge, buttonStyles } from "@/components/ui";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
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
        <StatusBadge label="Demo scaffold" variant="info" />
      </div>

      <form className="mt-6 space-y-4">
        <Input
          label="Institutional email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@institution.edu"
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary"
            />
            Remember this device
          </label>
          <Link
            href="/forgot-password"
            className="font-label-md text-label-md text-secondary hover:text-secondary-container"
          >
            Forgot password?
          </Link>
        </div>

        <Link href="/student/dashboard" className={buttonStyles({ className: "w-full" })}>
          Continue to demo workspace
        </Link>
      </form>

      <div className="mt-6 rounded-lg bg-surface-container-low p-3">
        <p className="font-body-sm text-body-sm leading-relaxed text-on-surface-variant">
          Authentication, session cookies, and role checks are not wired in this scaffold. The demo
          workspace uses a fixed student identity until the auth layer is implemented.
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
    </div>
  );
}
