import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your institutional email.")
  .email("Enter a valid email address.")
  .transform((value) => value.toLowerCase());

export const newPasswordSchema = z
  .string()
  .min(12, "Use at least 12 characters.")
  .max(128, "Password must be 128 characters or fewer.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password."),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "The reset link is invalid."),
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
