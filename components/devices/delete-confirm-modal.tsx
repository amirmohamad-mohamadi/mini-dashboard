"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { X, Loader2 } from "lucide-react";
import { type Device } from "@/types/device";

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

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  device: Device | null;
  isDeleting: boolean;
};

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  device,
  isDeleting,
}: DeleteConfirmModalProps) {
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
    if (e.target === e.currentTarget && !isDeleting) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isDeleting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose, isDeleting]);

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
            onClick={!isDeleting ? onClose : undefined}
            className={`rounded-lg p-1 transition-colors duration-200 ${
              isDeleting
                ? "text-gray-300 dark:text-slate-600 cursor-not-allowed opacity-50"
                : "text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300"
            }`}
            disabled={isDeleting}
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
            {isDeleting ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                در حال حذف...
              </>
            ) : (
              "حذف"
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={!isDeleting ? onClose : undefined}
            disabled={isDeleting}
            className={`min-w-[80px] !bg-transparent !text-gray-700 hover:!bg-gray-100 dark:!text-gray-300 dark:hover:!bg-slate-800 border border-gray-300 dark:border-slate-600 ${
              isDeleting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            انصراف
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
