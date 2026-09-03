"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  containerClassName?: string;
  dir?: "rtl" | "ltr";
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, containerClassName, dir = "rtl", id, ...props },
    ref,
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          dir={dir}
          className={cn(
            "w-full rounded-lg px-4 py-2.5 text-sm transition-all duration-200",
            "bg-white border-2 border-gray-200 text-gray-900",
            "placeholder:text-gray-400",
            "hover:border-gray-400",
            "focus:border-gray-500 focus:ring-4 focus:ring-gray-200 focus:outline-none",
            "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100",
            "dark:placeholder:text-gray-500",
            "dark:hover:border-gray-500",
            "dark:focus:border-gray-400 dark:focus:ring-gray-600/30",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "disabled:bg-gray-100 dark:disabled:bg-gray-700",
            error &&
              "border-red-500 hover:border-red-600 focus:border-red-600 focus:ring-red-200 dark:border-red-400 dark:hover:border-red-300 dark:focus:border-red-300 dark:focus:ring-red-500/30",
            className,
          )}
          {...props}
        />
        {error && (
          <p
            className="mt-1.5 text-xs text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
