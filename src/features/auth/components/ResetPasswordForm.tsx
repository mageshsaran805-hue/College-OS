"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { resetPasswordAction } from "@/features/auth/actions";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, {});

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <input type="hidden" name="token" value={token} />

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-error/20 bg-error-container px-3 py-2 font-body-sm text-body-sm text-on-error-container"
        >
          {state.error}
        </p>
      ) : null}

      <Input
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 12 characters"
        required
        autoFocus
      />
      <Input
        label="Confirm password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Repeat the new password"
        required
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
