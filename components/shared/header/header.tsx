"use client";

import { Plus, Router } from "lucide-react";
import { ThemeToggle } from "@/components/shared/header/theme-toggle";

export default function Header() {
  return (
    <header className="w-full px-4 pt-5 sm:px-8 sm:pt-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Router className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold tracking-[.18em] text-emerald-400">
                NETWORK OPERATIONS
              </p>
              <h1 className="text-2xl font-extrabold sm:text-3xl text-slate-900 dark:text-white">
                مدیریت دستگاه‌ها
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="hidden sm:flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 whitespace-nowrap">
              <Plus className="h-5 w-5" />
              افزودن دستگاه
            </button>
          </div>
        </div>
        <div className="mt-4 sm:hidden">
          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 shadow-lg shadow-emerald-500/30">
            <Plus className="h-5 w-5" />
            افزودن دستگاه
          </button>
        </div>
      </div>
    </header>
  );
}
