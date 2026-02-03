import { cx } from "@lib";
import { Code } from "lucide-react";
import React from "react";
import { MainCard } from "./MainCard";

interface RoleCardProps {
  title: string;
  description: string;
  statusLabel?: string;
  statusState?: "full" | "filled" | "open";
  tools: string[];
  mentor: {
    name: string;
    role: string;
    initials: string;
  };
  responsibilities: string[];
  isSelected?: boolean;
  onSelect?: () => void;
  variant?: "view" | "select";
  className?: string;
}

export const RoleCard = ({
  title,
  description,
  statusLabel = "2/2 Full",
  statusState = "full",
  tools,
  mentor,
  responsibilities,
  isSelected,
  onSelect,
  variant = "view",
  className,
}: RoleCardProps) => {
  const isSelectVariant = variant === "select";

  return (
    <MainCard
      classname={cx(
        "!rounded-3xl p-4 sm:p-6 m-1 border transition-all duration-200 relative overflow-hidden",
        isSelectVariant ? "cursor-pointer hover:border-blue-main/30" : "",
        isSelected
          ? "border-blue-main shadow-md ring-1 ring-blue-main"
          : "border-gray-200 shadow-sm",
        className
      )}
    >
      <div onClick={isSelectVariant ? onSelect : undefined}>
        {/* Selection Radio Circle */}
        {isSelectVariant && (
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
            <div
              className={cx(
                "h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                isSelected ? "border-blue-main" : "border-gray-300"
              )}
            >
              {isSelected && (
                <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 bg-blue-main rounded-full" />
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <div
          className={cx(
            "flex justify-between items-start mb-3 sm:mb-4 flex-wrap gap-2 sm:gap-3",
            isSelectVariant && "pl-8 sm:pl-10"
          )}
        >
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {description}
            </p>
          </div>
          <div
            className={cx(
              "px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold",
              statusState === "full"
                ? "bg-gray-100 text-gray-600"
                : statusState === "filled"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-main/10 text-blue-main"
            )}
          >
            {statusLabel}
          </div>
        </div>

        {/* Tools */}
        <div className={cx("mb-4 sm:mb-6", isSelectVariant && "pl-0")}>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            <Code className="h-3 w-3 text-blue-main/30" /> Tools & Tech
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] sm:text-xs font-medium text-gray-600"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Mentor */}
        <div className="mb-4 sm:mb-6">
          <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-2">
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Assigned Mentor
          </div>
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-gray-50/50 border border-gray-100">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-500 shrink-0">
              {mentor.initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                {mentor.name}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                {mentor.role}
              </p>
            </div>
          </div>
        </div>

        {/* Responsibilities */}
        <div>
          <div className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-2">
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            Key Responsibilities
          </div>
          <ul className="space-y-1.5 sm:space-y-2">
            {responsibilities.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs sm:text-sm text-gray-600"
              >
                <div className="mt-1.5 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-blue-main flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainCard>
  );
};
