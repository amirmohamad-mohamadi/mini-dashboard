"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { type Device } from "@/types/device";
import { DeleteConfirmModal } from "./delete-confirm-modal";
import { DeviceCard } from "./device-card";
import { toast } from "sonner";

type DeviceTableProps = {
  devices: Device[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
  viewMode?: "table" | "card";
};

const statusLabels = {
  Online: "آنلاین",
  Offline: "آفلاین",
  Warning: "هشدار",
};

const statusColors = {
  Online: "online",
  Offline: "offline",
  Warning: "warning",
};

const tableStyles = {
  header: "px-7 py-4 font-semibold text-gray-700 dark:text-gray-300",
  headerLeft:
    "px-7 py-4 text-left font-semibold text-gray-700 dark:text-gray-300",
  deviceName: "font-bold text-gray-900 dark:text-slate-100",
  ip: "rounded-md bg-gray-100 dark:bg-slate-950/45 px-2 py-1 text-sm text-gray-700 dark:text-cyan-200",
  lastPing: "text-sm text-gray-500 dark:text-slate-400",
  deleteButton:
    "text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-400/10 transition-colors duration-200 p-2",
  row: "device-row border-b border-gray-200 dark:border-slate-600/15 last:border-b-0 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors duration-150",
  iconButton: "h-8 w-8 p-0",
};

const getStatusBadgeClasses = (status: keyof typeof statusColors) => {
  return `status-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold badge-${statusColors[status]}`;
};

export function DeviceTable({
  devices,
  onDelete,
  isDeleting,
  viewMode = "table",
}: DeviceTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deviceToDelete =
    devices.find((device) => device.id === deleteId) ?? null;

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await onDelete(deleteId);
      setIsDialogOpen(false);
      setDeleteId(null);
      toast.success(`${deviceToDelete?.name || "دستگاه"} از لیست حذف شد`);
    } catch (error) {
      toast.error("خطا در حذف دستگاه!", {
        description: "لطفاً مجدداً تلاش کنید",
      });
      console.error("خطا در حذف:", error);
    }
  };

  const handleCancelDelete = () => {
    if (!isDeleting) {
      setIsDialogOpen(false);
      setDeleteId(null);
    }
  };

  if (viewMode === "card") {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>

        <DeleteConfirmModal
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          device={deviceToDelete}
          isDeleting={isDeleting}
        />
      </>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-right">
          <thead className="border-b border-gray-200 dark:border-slate-600/20 text-xs">
            <tr>
              <th className={tableStyles.header}>نام دستگاه</th>
              <th className={tableStyles.header}>آدرس IP</th>
              <th className={tableStyles.header}>وضعیت</th>
              <th className={tableStyles.header}>آخرین بررسی</th>
              <th className={tableStyles.header}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className={tableStyles.row}>
                <td className="px-7 py-4">
                  <p className={tableStyles.deviceName}>{device.name}</p>
                </td>
                <td className="px-5 py-4">
                  <code className={tableStyles.ip} dir="ltr">
                    {device.ip}
                  </code>
                </td>
                <td className="px-5 py-4">
                  <span className={getStatusBadgeClasses(device.status)}>
                    <i
                      className={`status-dot status-${statusColors[device.status]}`}
                    />
                    <span>{statusLabels[device.status]}</span>
                  </span>
                </td>
                <td className={`px-5 py-4 ${tableStyles.lastPing}`}>
                  {device.lastPing}
                </td>
                <td className="px-7 py-4 text-center">
                  <div className="flex justify-start">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${tableStyles.deleteButton} ${tableStyles.iconButton}`}
                      onClick={() => handleDeleteClick(device.id)}
                      disabled={isDeleting && deleteId === device.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmModal
        isOpen={isDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        device={deviceToDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
