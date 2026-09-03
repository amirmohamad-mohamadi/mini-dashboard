"use client";

import { SearchX } from "lucide-react";

export function EmptyState() {
  return (
    <div className="px-5 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/30">
        <SearchX className="h-6 w-6 text-slate-400" />
      </div>
      <h3 className="mt-5 text-lg font-bold">دستگاهی یافت نشد</h3>
      <p className="mt-2 text-sm text-slate-400">
        هیچ دستگاهی با فیلترهای انتخاب‌شده تطابق ندارد.
      </p>
    </div>
  );
}
