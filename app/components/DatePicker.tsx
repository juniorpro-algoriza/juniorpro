"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Calendar } from "./Calender";
import { ChevronDown } from "lucide-react";
import { cx } from "@lib";

export const DatePicker = ({
  placeholder = "Select date",
  value,
  onChange,
  label,
  error,
}: {
  placeholder?: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
  error?: string;
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [openUp, setOpenUp] = useState(false);
  const [openCalender, setOpenCalender] = useState(false);

  useLayoutEffect(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    setOpenUp(spaceBelow < 385); // calendar height
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenCalender(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative space-y-2" ref={containerRef}>
      {label && <p className="text-sm text-midnight font-medium">{label}</p>}
      <div
        ref={triggerRef}
        onClick={() => setOpenCalender(!openCalender)}
        className={cx(
          "px-3 py-3.5 flex items-center justify-between gap-2 border border-gray-200 rounded-2xl text-sm cursor-pointer text-gray-400",
          {
            "text-black": value,
            "border-red-500": error,
          }
        )}
      >
        {value ? value.toLocaleDateString() : placeholder}
        <ChevronDown className="size-5 text-gray-400" />
      </div>
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
      {openCalender && (
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={(date) => {
            onChange(date);
            setOpenCalender(false);
          }}
          className={`absolute z-40 rounded-2xl bg-white border ${
            openUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        />
      )}
    </div>
  );
};
