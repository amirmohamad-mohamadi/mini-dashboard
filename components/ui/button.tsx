"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, Ref } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  variant = "primary",
  size = "md",
  isLoading,
  children,
  disabled,
  ref,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-0.5 focus:ring-emerald-400/25",
    secondary:
      "bg-white/10 text-slate-100 hover:bg-white/20 hover:-translate-y-0.5 focus:ring-white/25",
    ghost: "hover:bg-white/10 focus:ring-white/10",
    destructive:
      "bg-rose-500 text-white hover:bg-rose-600 hover:-translate-y-0.5 focus:ring-rose-400/25",
  };

  const sizes = {
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
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
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
