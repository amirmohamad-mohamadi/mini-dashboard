"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

const Button = ({
  ref,
  className,
  variant = "primary",
  size = "md",
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-0.5 focus:ring-emerald-400/25",
    secondary:
      "bg-white/10 text-slate-100 hover:bg-white/20 hover:-translate-y-0.5 focus:ring-white/25",
    ghost: "hover:bg-white/10 focus:ring-white/10",
    destructive:
      "bg-rose-500 text-white hover:bg-rose-600 hover:-translate-y-0.5 focus:ring-rose-400/25",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          در حال اجرا...
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.displayName = "Button";

export { Button };
