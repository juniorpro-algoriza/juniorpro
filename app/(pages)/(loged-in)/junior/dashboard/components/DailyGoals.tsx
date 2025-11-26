"use client";
import React, { useState } from "react";
import { MainCard, Progress } from "@components";
import { GoalIcon } from "@icons";
import { ChevronDown } from "lucide-react";
import { cx } from "@lib";

export const DailyGoals = () => {
  const [open, setOpen] = useState(false);

  return (
    <MainCard classname="space-y-5 cursor-pointer" isAnimated>
      <div className="flex justify-between items-center gap-3" onClick={() => setOpen(!open)}>
        <div className="flex items-center gap-2">
          <GoalIcon className="text-blue-main" />
          <p>Daily Goal</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="font-normal text-blue-main text-sm">
            2 / 3 completed
          </p>
          <ChevronDown className={cx("size-5 text-gray-600 transition-all duration-200", open && "rotate-180")} />
        </div>
      </div>

      <Progress width={75} />

      <p className="text-gray-600 text-[13px]">
        Complete 1 more to hit your daily target!
      </p>

      {open && (
        <p className="text-gray-600 text-[13px]">
          Complete 1 more to hit your daily target!
        </p>
      )}
    </MainCard>
  );
};

export default DailyGoals;
