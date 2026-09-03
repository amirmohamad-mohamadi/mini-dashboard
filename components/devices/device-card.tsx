"use client";

import { Device } from "@/types/device";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DeleteConfirmModal } from "./delete-confirm-modal";

type DeviceCardProps = {
  device: Device;
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

const getStatusBadgeClasses = (status: keyof typeof statusColors) => {
  return `status-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold badge-${statusColors[status]}`;
};

export function DeviceCard({ device, onDelete, isDeleting }: DeviceCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(device.id);
      setShowConfirm(false);
    } catch (error) {
      console.error("خطا در حذف:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <article className="rounded-2xl border border-gray-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 p-4 shadow-sm transition-colors duration-150">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-slate-100">
              {device.name}
            </h3>
            <code
              className="mt-2 inline-block rounded-md bg-gray-100 dark:bg-slate-950/45 px-2 py-1 text-sm text-gray-700 dark:text-cyan-200"
              dir="ltr"
            >
              {device.ip}
            </code>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={getStatusBadgeClasses(device.status)}>
              <i
                className={`status-dot status-${statusColors[device.status]}`}
              />
              <span>{statusLabels[device.status]}</span>
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 dark:border-slate-600/15 pt-3">
          <span className="text-sm text-gray-500 dark:text-slate-400">
            {device.lastPing}
          </span>

          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-400/10 transition-colors duration-200 p-2 h-8 w-8"
            onClick={handleDeleteClick}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </article>

      <DeleteConfirmModal
        isOpen={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        device={device}
        isDeleting={isDeleting}
      />
    </>
  );
}
