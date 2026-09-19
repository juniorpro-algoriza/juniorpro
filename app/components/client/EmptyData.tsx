import { PanelsTopLeft } from "lucide-react";
import { MainCard } from "../MainCard";
import { cx } from "@lib";
import React from "react";

export interface EmptyDataProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const EmptyData = ({
  title,
  description,
  icon = <PanelsTopLeft className="size-6" />,
  className,
  action,
  children,
}: EmptyDataProps) => {
  return (
    <MainCard
      classname={cx(
        "bg-[#F9FAFB80] flex flex-col items-center justify-center text-center py-10 px-4 space-y-2",
        className
      )}
    >
      {icon && (
        <div className="flex items-center justify-center border border-gray-200 text-gray-600 p-3 rounded-full w-fit mb-1">
          {icon}
        </div>
      )}
      {title && <p className="font-bold text-lg text-gray-600">{title}</p>}
      {description && (
        <p className="text-sm text-gray-600 max-w-md">{description}</p>
      )}
      {action && <div className="pt-2">{action}</div>}
      {children}
    </MainCard>
  );
};
