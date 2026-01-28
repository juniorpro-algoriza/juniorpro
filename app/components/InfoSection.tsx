import { cx } from "@lib";
import { Check } from "lucide-react";
import React from "react";
import { MainCard } from "./MainCard";

type ListType = "numbered" | "checked" | "bullet";

interface InfoSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  items: string[];
  type?: ListType;
  className?: string;
  watermark?: React.ReactNode;
}

export const InfoSection = ({
  title,
  description,
  icon,
  items,
  type = "bullet",
  className,
  watermark,
}: InfoSectionProps) => {
  return (
    <MainCard
      classname={cx(
        "p-5 md:p-8 !rounded-3xl border-gray-100 shadow-sm relative overflow-hidden ",
        className
      )}
    >
      {/* Watermark Background */}
      {watermark && (
        <div className="absolute right-0 top-0 opacity-[0.03] scale-1.2 -translate-x-1/3 translate-y-1/3 pointer-events-none text-blue-main hidden lg:block">
          {watermark}
        </div>
      )}
      <div className="flex items-start gap-4 mb-6">
        {icon && (
          <div className="p-3 bg-blue-main/10 text-blue-main rounded-xl">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {description && (
            <p className="text-gray-500 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={cx(
              "flex items-center gap-5 p-5 md:p-6 rounded-[2rem] bg-gray-50/50 border border-gray-100/50",
              "transition-all duration-300 hover:bg-white hover:shadow-md hover:border-blue-main/10 group"
            )}
          >
            {/* Icon/Indicator */}
            <div className="flex-shrink-0">
              {type === "numbered" && (
                <div className="size-10 rounded-full bg-white border border-blue-main/10 text-blue-main flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
              )}
              {type === "checked" && (
                <div className="size-7 rounded-full bg-blue-main text-white flex items-center justify-center shadow-lg shadow-blue-main/20 group-hover:scale-110 transition-transform">
                  <Check className="size-4 stroke-[3]" />
                </div>
              )}
              {type === "bullet" && (
                <div className="bg-blue-main/10 p-3 rounded-full ml-2">

                  <div className="size-2.5 rounded-full bg-blue-main  group-hover:scale-125 transition-transform" />
                </div>
              )}
            </div>
            {/* Content */}
            <span className="text-gray-900 font-semibold text-sm md:text-base">
              {item}
            </span>
          </div>
        ))}
      </div>
    </MainCard>
  );
};
