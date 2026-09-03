"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DeviceStatus } from "@/types/device";

interface Filters {
  search: string;
  status: "All" | DeviceStatus;
}

export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const status = (searchParams.get("status") as Filters["status"]) || "All";

  const filters = useMemo((): Filters => {
    return { search, status };
  }, [search, status]);

  const updateFilters = useCallback(
    (newFilters: Partial<Filters>) => {
      const currentSearch = searchParams.get("search") || "";
      const currentStatus =
        (searchParams.get("status") as Filters["status"]) || "All";

      const updated = {
        search: newFilters.search ?? currentSearch,
        status: newFilters.status ?? currentStatus,
      };

      const params = new URLSearchParams();
      if (updated.search) params.set("search", updated.search);
      if (updated.status && updated.status !== "All")
        params.set("status", updated.status);

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(url, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { filters, updateFilters };
}
