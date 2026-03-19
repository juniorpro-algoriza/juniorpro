import React from "react";
import { cx } from "@lib";

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  iconBg?: string;
}

export const InfoCard = ({ icon, label, value, iconBg }: InfoCardProps) => (
  <div className="p-3 border border-gray-100 rounded-2xl bg-white flex items-center gap-3 group hover:border-blue-main/10 transition-colors shadow-sm shadow-gray-100/50">
    <div
      className={cx(
        "size-10 flex items-center justify-center rounded-2xl shrink-0",
        iconBg || "bg-gray-50"
      )}
    >
      {icon}
    </div>
    <div className="flex-1 min-w-0 ml-1">
      <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
        {label}
      </p>
      <p className="text-[13px] font-bold text-gray-900 truncate mt-0.5">
        {value}
      </p>
    </div>
  </div>
);
