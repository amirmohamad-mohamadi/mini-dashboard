"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import { type Device } from "@/types/device";

type DeviceTableProps = {
  devices: Device[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
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

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  device,
  isDeleting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  device: Device | null;
  isDeleting: boolean;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !device) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-200"
      onClick={handleBackdropClick}
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all duration-200 animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
            تایید حذف
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-4 text-right text-sm text-gray-600 dark:text-slate-400">
            آیا از حذف دستگاه زیر اطمینان دارید؟
          </p>

          <div className="rounded-lg bg-gray-50 dark:bg-slate-800/50 p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-slate-400">
                نام دستگاه:
              </span>
              <span className="font-medium text-gray-900 dark:text-slate-100">
                {device.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-slate-400">
                آدرس IP:
              </span>
              <code
                className="text-sm font-mono text-gray-700 dark:text-cyan-300"
                dir="ltr"
              >
                {device.ip}
              </code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-slate-400">
                وضعیت:
              </span>
              <span className={getStatusBadgeClasses(device.status)}>
                <i
                  className={`status-dot status-${statusColors[device.status]}`}
                />
                <span>{statusLabels[device.status]}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-3 border-t border-gray-200 dark:border-slate-700 p-6">
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            className="min-w-[80px]"
          >
            {isDeleting ? "در حال حذف..." : "حذف"}
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            className="min-w-[80px] !bg-transparent !text-gray-700 hover:!bg-gray-100 dark:!text-gray-300 dark:hover:!bg-slate-800 border border-gray-300 dark:border-slate-600"
          >
            انصراف
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export function DeviceTable({
  devices,
  onDelete,
  isDeleting,
}: DeviceTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    onDelete(deleteId);
    setIsDialogOpen(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    setDeleteId(null);
  };

  const deviceToDelete =
    devices.find((device) => device.id === deleteId) ?? null;

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-right">
          <thead className="border-b border-gray-200 dark:border-slate-600/20 text-xs">
            <tr>
              <th className={tableStyles.header}>نام دستگاه</th>
              <th className={tableStyles.header}>آدرس IP</th>
              <th className={tableStyles.header}>وضعیت</th>
              <th className={tableStyles.header}>آخرین بررسی</th>
              <th className={tableStyles.headerLeft}>عملیات</th>
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
                <td className="px-7 py-4 text-left">
                  <div className="flex justify-start">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${tableStyles.deleteButton} ${tableStyles.iconButton}`}
                      onClick={() => handleDeleteClick(device.id)}
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
