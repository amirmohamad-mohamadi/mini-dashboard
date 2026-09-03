"use client";

import { Device } from "@/types/device";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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

export function DeviceCard({ device, onDelete, isDeleting }: DeviceCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <article className="device-row rounded-2xl border border-slate-500/15 bg-slate-950/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-100">{device.name}</h3>
          <code
            className="mt-2 inline-block rounded-md bg-slate-950/45 px-2 py-1 text-sm text-cyan-200"
            dir="ltr"
          >
            {device.ip}
          </code>
        </div>
        <span
          className={`status-badge inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-bold badge-${statusColors[device.status]}`}
        >
          <i className={`status-dot status-${statusColors[device.status]}`} />
          <span>{statusLabels[device.status]}</span>
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-600/15 pt-3">
        <span className="text-xs text-slate-400">{device.lastPing}</span>

        <div className="flex items-center gap-2">
          {showConfirm ? (
            <>
              <span className="text-xs text-amber-200">حذف شود؟</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(device.id)}
                disabled={isDeleting}
              >
                بله
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirm(false)}
              >
                خیر
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-rose-300 hover:bg-rose-400/10"
              onClick={() => setShowConfirm(true)}
            >
              حذف
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
