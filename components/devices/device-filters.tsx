"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { useUrlFilters } from "@/hooks/use-url-filters";

const statusOptions = [
  { value: "All", label: "همه وضعیت‌ها" },
  { value: "Online", label: "آنلاین" },
  { value: "Offline", label: "آفلاین" },
  { value: "Warning", label: "هشدار" },
];

export function DeviceFilters() {
  const { filters, updateFilters } = useUrlFilters();
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        updateFilters({ search: localSearch });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, filters.search, updateFilters]);

  return (
    <div className="mt-6 flex flex-col gap-3 md:grid md:grid-cols-[1fr_220px]">
      <div className="relative">
        <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <Input
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pr-12"
          placeholder="جستجو بر اساس نام یا IP..."
          aria-label="جستجوی دستگاه"
          autoComplete="off"
        />
      </div>

      <Select
        value={filters.status}
        onChange={(e) =>
          updateFilters({ status: e.target.value as typeof filters.status })
        }
        options={statusOptions}
        aria-label="فیلتر وضعیت"
      />
    </div>
  );
}
