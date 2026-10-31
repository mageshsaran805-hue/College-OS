"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button, Input } from "@/components/ui";
import { loginAction } from "@/features/auth/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

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
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Enter your password"
        required
      />

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="font-label-md text-label-md text-secondary hover:text-secondary-container"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
