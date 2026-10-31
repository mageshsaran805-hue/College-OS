import Link from "next/link";
import { Button, Input, StatusBadge } from "@/components/ui";

export const metadata = { title: "Set a new password" };

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md rounded-xl bg-surface-container-lowest p-6 shadow-card sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
            Set a new password
          </h1>
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
            Choose a strong password for your institutional account.
          </p>
        </div>
        <StatusBadge label="Demo scaffold" variant="info" />
      </div>

      <form className="mt-6 space-y-4">
        <Input
          label="New password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 12 characters"
          required
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Repeat the new password"
          required
        />
        <Button type="submit" className="w-full" disabled>
          Update password
        </Button>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Password reset handling is not wired in this scaffold.
        </p>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary hover:text-secondary-container"
      >
        <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
        Back to sign in
      </Link>
    </div>
  );
}
