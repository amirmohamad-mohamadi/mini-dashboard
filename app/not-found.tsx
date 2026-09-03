"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <div className="relative max-w-2xl w-full">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl p-8 sm:p-12 text-center">
          <div className="mb-8">
            <div className="text-[120px] sm:text-[160px] font-extrabold leading-none tracking-tighter bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 bg-clip-text text-transparent select-none">
              404
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-3">
            صفحه‌ای که دنبالش هستی پیدا نشد!
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            متأسفیم، صفحه مورد نظر شما حذف شده، نام آن تغییر کرده یا موقتاً در
            دسترس نیست.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
          >
            <Home className="h-5 w-5" />
            <span>بازگشت به صفحه اصلی</span>
          </Link>
        </div>

        <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-6">
          خطای ۴۰۴ • صفحه‌ای که دنبالش بودید وجود ندارد
        </p>
      </div>
    </div>
  );
}
