"use client";

import { Suspense, useEffect, useState } from "react";
import { useDevices } from "@/hooks/use-devices";
import { useUrlFilters } from "@/hooks/use-url-filters";
import { DeviceTable } from "./device-table";
import { EmptyState } from "./empty-state";
import { StatsCards } from "./status-cards";
import { DeviceFilters } from "./device-filters";
import { DeviceModal } from "./device-modal";
import { Plus } from "lucide-react";
import { DeviceFormSchema } from "@/lib/validations";
import { toPersianNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DeviceSkeleton } from "./device-skeleton";
import { toast } from "sonner";

function DevicesContent() {
  const { devices, isLoading, addDevice, isAdding, deleteDevice, isDeleting } =
    useDevices();
  const { filters } = useUrlFilters();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!isLoading && devices.length > 0) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, devices]);

  if (isLoading || showSkeleton) {
    return <DeviceSkeleton />;
  }

  const filteredDevices = devices.filter((device) => {
    if (!device) return false;
    const search = filters?.search?.trim()?.toLowerCase() || "";
    const status = filters?.status || "All";
    const matchesSearch =
      !search ||
      device.name?.toLowerCase().includes(search) ||
      false ||
      device.ip?.includes(search) ||
      false;
    const matchesStatus = status === "All" || device.status === status;
    return matchesSearch && matchesStatus;
  });

  const handleAddDevice = async (data: DeviceFormSchema) => {
    try {
      await addDevice(data);
      setIsModalOpen(false);
      toast.success(`${data.name || "دستگاه"} به لیست اضافه شد`);
    } catch (error) {
      toast.error("خطا در اضافه کردن دستگاه!", {
        description: "لطفاً مجدداً تلاش کنید",
      });
      console.error("خطا در اضافه کردن:", error);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="glass-panel fade-in rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/60 dark:shadow-slate-950/50 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-400/5 transition-all duration-300 px-5 py-6 sm:px-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              لیست دستگاه‌ها
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              مدیریت و مانیتورینگ دستگاه‌های شبکه
            </p>
          </div>
          <StatsCards devices={devices} />
        </div>
        <DeviceFilters />
        <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            تعداد کل دستگاه‌ها:{" "}
            <strong className="font-extrabold bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              {toPersianNumber(filteredDevices.length)}
            </strong>
          </p>
        </div>
      </div>

      <div className="glass-panel mt-5 overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-600/15 p-4">
          <span className="text-sm font-semibold">دستگاه‌ها</span>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>افزودن دستگاه</span>
          </Button>
        </div>

        {filteredDevices.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="hidden md:block">
              <DeviceTable
                devices={filteredDevices}
                onDelete={deleteDevice}
                isDeleting={isDeleting}
                viewMode="table"
              />
            </div>

            <div className="md:hidden">
              <DeviceTable
                devices={filteredDevices}
                onDelete={deleteDevice}
                isDeleting={isDeleting}
                viewMode="card"
              />
            </div>
          </>
        )}
      </div>

      <DeviceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddDevice}
        isSubmitting={isAdding}
      />
    </div>
  );
}

export function Devices() {
  return (
    <Suspense fallback={<DeviceSkeleton />}>
      <DevicesContent />
    </Suspense>
  );
}
