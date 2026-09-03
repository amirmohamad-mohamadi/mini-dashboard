"use client";

import { StatsCards } from "./status-cards";
import { DeviceFilters } from "./device-filters";

export function Devices() {
  return (
    <div className="mt-6 space-y-4">
      <div
        className="glass-panel fade-in rounded-3xl bg-white/90 dark:bg-slate-900/90 
                   backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl 
                   shadow-slate-200/60 dark:shadow-slate-950/50 hover:shadow-2xl 
                   hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/5 transition-all duration-300 px-5 py-6 sm:px-7"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              لیست دستگاه‌ها
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              مدیریت و مانیتورینگ دستگاه‌های شبکه
            </p>
          </div>
          <StatsCards />
        </div>
        <DeviceFilters />
        <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            تعداد کل دستگاه‌ها:{" "}
            <strong
              className="font-extrabold bg-gradient-to-r from-emerald-500
                             to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent"
            >
              4
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
