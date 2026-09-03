"use client";

import { forwardRef, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: SelectOption[];
  containerClassName?: string;
  placeholder?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      options,
      containerClassName,
      placeholder,
      id,
      ...props
    },
    ref,
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full rounded-lg px-4 py-2.5 text-sm transition-all duration-200",
              "appearance-none cursor-pointer",
              "bg-white border-2 border-gray-200 text-gray-900",
              "hover:border-gray-400",
              "focus:border-gray-500 focus:ring-4 focus:ring-gray-200 focus:outline-none",
              "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100",
              "dark:hover:border-gray-500",
              "dark:focus:border-gray-400 dark:focus:ring-gray-600/30",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "disabled:bg-gray-100 dark:disabled:bg-gray-700",
              error &&
                "border-red-500 hover:border-red-600 focus:border-red-600 focus:ring-red-200 dark:border-red-400 dark:hover:border-red-300 dark:focus:border-red-300 dark:focus:ring-red-500/30",
              'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%208%2010%2012%2014%208%22%3E%3C/polyline%3E%3C/svg%3E")] dark:bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20stroke%3D%22%239ca3af%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%208%2010%2012%2014%208%22%3E%3C/polyline%3E%3C/svg%3E")] bg-[length:20px] bg-[right_0.75rem_center] bg-no-repeat pr-10',
              "[&_option:disabled]:text-gray-400 dark:[&_option:disabled]:text-gray-500",
              "[&_option]:text-gray-900 dark:[&_option]:text-gray-100",
              "[&_option]:bg-white dark:[&_option]:bg-gray-800",
              "[&_option]:hover:bg-gray-50 dark:[&_option]:hover:bg-gray-700",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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

Select.displayName = "Select";

export { Select };
