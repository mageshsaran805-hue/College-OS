"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { forgotPasswordSchema, loginSchema, resetPasswordSchema } from "@/features/auth/schemas";
import { requestPasswordReset, resetPasswordWithToken } from "@/server/auth/password-reset";

export interface LoginState {
  error?: string;
}

export interface ForgotPasswordState {
  error?: string;
  message?: string;
}

export interface ResetPasswordState {
  error?: string;
}

function firstIssue(result: {
  success: false;
  error: { issues: Array<{ message: string }> };
}): string {
  return result.error.issues[0]?.message ?? "Check the form and try again.";
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: firstIssue(parsed) };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }

    throw error;
  }

  return {};
}

export async function requestPasswordResetAction(
  _previousState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: firstIssue(parsed) };
  }

  try {
    await requestPasswordReset(parsed.data.email);
  } catch (error) {
    console.error("Password reset request failed", error);
  }

  return {
    message: "If an account exists for that address, a password reset link has been sent.",
  };
}

export async function resetPasswordAction(
  _previousState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: firstIssue(parsed) };
  }

  try {
    const result = await resetPasswordWithToken(parsed.data.token, parsed.data.password);

    if (!result) {
      return { error: "This reset link is invalid or has expired." };
    }
  } catch (error) {
    console.error("Password reset failed", error);
    return { error: "We could not reset the password. Try again." };
  }

  redirect("/login?reset=success");
}
