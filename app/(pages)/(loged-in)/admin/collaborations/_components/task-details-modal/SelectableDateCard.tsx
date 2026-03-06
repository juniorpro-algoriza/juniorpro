import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@lib";
import { Calendar as CalendarPicker } from "@components";

interface SelectableDateCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  iconBg?: string;
}

export const SelectableDateCard = ({
  icon,
  label,
  value,
  onChange,
  iconBg,
}: SelectableDateCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const dateValue = value ? new Date(value) : undefined;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 border border-gray-100 rounded-2xl bg-white flex items-center gap-3 group hover:border-blue-main/10 transition-colors cursor-pointer shadow-sm shadow-gray-100/50"
      >
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
          <div className="flex items-center justify-between gap-1 mt-0.5">
            <p
              className={cx(
                "text-[13px] font-bold truncate",
                value ? "text-gray-900" : "text-gray-400"
              )}
            >
              {value
                ? new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "No deadline"}
            </p>
            <ChevronDown
              className={cx(
                "size-4 text-gray-300 transition-transform duration-300 shrink-0 mr-1",
                isOpen && "rotate-180 text-blue-main"
              )}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 right-0 bg-white rounded-xl shadow-xl border border-gray-100 p-2">
          <CalendarPicker
            mode="single"
            selected={dateValue}
            onSelect={(date) => {
              if (date) {
                onChange(date.toISOString());
              } else {
                onChange(null);
              }
              setIsOpen(false);
            }}
            className="rounded-xl border-none"
          />
        </div>
      )}
    </div>
  );
};
