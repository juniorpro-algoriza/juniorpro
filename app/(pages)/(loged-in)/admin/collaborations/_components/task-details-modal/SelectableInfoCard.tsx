import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "@lib";

interface SelectableInfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | null;
  options: { label: string; value: string | number }[];
  onChange: (value: string | number) => void;
  placeholder?: string;
  iconBg?: string;
}

export const SelectableInfoCard = ({
  icon,
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
  iconBg,
}: SelectableInfoCardProps) => {
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

  const selectedOption = options.find((opt) => opt.value === value);

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
                selectedOption ? "text-gray-900" : "text-gray-400"
              )}
            >
              {selectedOption?.label || placeholder}
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
        <div className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 py-1 max-h-48 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-center text-xs font-bold text-gray-300">
              NO OPTIONS
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cx(
                  "w-full text-left px-4 py-2 text-xs font-bold transition-colors",
                  option.value === value
                    ? "bg-blue-50 text-blue-main"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
