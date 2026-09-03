"use client";

import { Wifi, WifiOff, TriangleAlert, LucideIcon } from "lucide-react";

type StatusCardProps = {
  icon: LucideIcon;
  label: string;
  count: number;
  color: "emerald" | "amber" | "gray";
};

const colorClasses = {
  emerald: {
    icon: "text-emerald-600 dark:text-emerald-400",
    label: "text-emerald-700 dark:text-emerald-400",
    count: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    icon: "text-amber-600 dark:text-amber-400",
    label: "text-amber-700 dark:text-amber-400",
    count: "text-amber-600 dark:text-amber-400",
  },
  gray: {
    icon: "text-gray-600 dark:text-gray-400",
    label: "text-gray-700 dark:text-gray-400",
    count: "text-gray-600 dark:text-gray-400",
  },
};

function StatusCard({ icon: Icon, label, count, color }: StatusCardProps) {
  const toPersianNumber = (num: number) => {
    return String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };

  const colors = colorClasses[color];

  return (
    <div className="min-w-[72px] rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-center dark:border-gray-600 dark:bg-gray-800">
      <Icon className={`mx-auto mb-1.5 h-5 w-5 ${colors.icon}`} />
      <span className={`block text-xs font-medium ${colors.label}`}>
        {label}
      </span>
      <strong className={`mt-1 block text-2xl font-bold ${colors.count}`}>
        {toPersianNumber(count)}
      </strong>
    </div>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      <StatusCard icon={Wifi} label="آنلاین" count={7} color="emerald" />
      <StatusCard icon={TriangleAlert} label="هشدار" count={1} color="amber" />
      <StatusCard icon={WifiOff} label="آفلاین" count={3} color="gray" />
    </div>
  );
}
