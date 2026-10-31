import type { ButtonHTMLAttributes } from "react";
import { classNames } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonStyles({ variant = "primary", size = "md", className }: ButtonStyleOptions = {}) {
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-secondary text-on-secondary hover:bg-secondary-container",
    secondary:
      "border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low",
    ghost: "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
    danger: "bg-error text-on-error hover:bg-error/90",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 font-label-md text-label-md",
    md: "h-10 px-4 font-body-md text-body-md",
  };

  return classNames(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
