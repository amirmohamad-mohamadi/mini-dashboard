"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deviceSchema, DeviceFormSchema } from "@/lib/validations";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { DeviceStatus } from "@/types/device";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { createPortal } from "react-dom";

type StatusOption = {
  value: DeviceStatus;
  label: string;
};

type DeviceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DeviceFormSchema) => void;
  isSubmitting: boolean;
};

const statusOptions: StatusOption[] = [
  { value: "Online", label: "آنلاین" },
  { value: "Offline", label: "آفلاین" },
  { value: "Warning", label: "هشدار" },
];

export function DeviceModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: DeviceModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DeviceFormSchema>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      name: "",
      ip: "",
      status: "Online",
    },
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      reset();
      const timer = setTimeout(() => nameInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, reset]);

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

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg rounded-3xl border border-slate-200/30 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/80 p-5 sm:p-7 transition-all duration-200">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[.16em] text-emerald-600 dark:text-emerald-400">
              دستگاه جدید
            </p>
            <h2
              id="modal-title"
              className="mt-2 text-2xl font-extrabold text-gray-900 dark:text-slate-100"
            >
              افزودن دستگاه
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-500 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800"
            onClick={handleClose}
            aria-label="بستن پنجره"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
          <Input
            label="نام دستگاه"
            placeholder="مثال: Core-Switch-01"
            error={errors.name?.message}
            {...register("name")}
            ref={(e) => {
              register("name").ref(e);
              nameInputRef.current = e;
            }}
          />

          <Input
            label="آدرس IP"
            placeholder="192.168.1.100"
            dir="ltr"
            error={errors.ip?.message}
            {...register("ip")}
          />

          <Select
            label="وضعیت اولیه"
            options={statusOptions}
            error={errors.status?.message}
            {...register("status")}
          />

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              size="md"
              type="button"
              onClick={handleClose}
              className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
            >
              انصراف
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              isLoading={isSubmitting}
            >
              ثبت دستگاه
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
  return createPortal(modalContent, document.body);
}
