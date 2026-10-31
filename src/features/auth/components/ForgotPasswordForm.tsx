"use client";

import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { requestPasswordResetAction } from "@/features/auth/actions";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordResetAction, {});

  if (state.message) {
    return (
      <div className="mt-6 space-y-5">
        <p
          role="status"
          className="rounded-lg border border-success/20 bg-success-container px-3 py-2 font-body-sm text-body-sm text-on-success-container"
        >
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-error/20 bg-error-container px-3 py-2 font-body-sm text-body-sm text-on-error-container"
        >
          {state.error}
        </p>
      ) : null}

      <Input
        label="Institutional email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@institution.edu"
        required
        autoFocus
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Send reset link"}
      </Button>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        For security, the same response is shown whether or not an account exists.
      </p>
    </form>
  );
}
