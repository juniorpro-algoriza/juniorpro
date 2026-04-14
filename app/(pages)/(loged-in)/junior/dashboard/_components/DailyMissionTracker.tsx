"use client";

import { useState } from "react";
import { MainCard } from "@components";
import { TrendingUp } from "lucide-react";
import { cx } from "@lib";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const weekData = [
  { name: "Mon", missions: 5 },
  { name: "Tue", missions: 3 },
  { name: "Wed", missions: 7 },
  { name: "Thu", missions: 4 },
  { name: "Fri", missions: 6 },
  { name: "Sat", missions: 8 },
  { name: "Sun", missions: 2 },
];

const monthData = [
  { name: "Week 1", missions: 18 },
  { name: "Week 2", missions: 24 },
  { name: "Week 3", missions: 15 },
  { name: "Week 4", missions: 22 },
];

const threeMonthData = [
  { name: "Jan", missions: 45 },
  { name: "Feb", missions: 62 },
  { name: "Mar", missions: 58 },
];

type Period = "week" | "month" | "3months";

const periodDataMap: Record<Period, typeof weekData> = {
  week: weekData,
  month: monthData,
  "3months": threeMonthData,
};

const barColors = [
  "#818cf8",
  "#a78bfa",
  "#818cf8",
  "#c4b5fd",
  "#818cf8",
  "#6366f1",
  "#c4b5fd",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-xs">
        <p className="font-medium">{label}</p>
        <p className="text-indigo-300 mt-0.5">{payload[0].value} missions</p>
      </div>
    );
  }
  return null;
};

export const DailyMissionTracker = () => {
  const [period, setPeriod] = useState<Period>("week");
  const data = periodDataMap[period];

  return (
    <MainCard classname="h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-lg text-gray-900">
          Daily Mission Tracker
        </h3>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <TrendingUp className="size-3" />
          +12%
        </span>
      </div>

      {/* Period tabs */}
      <div className="flex items-center gap-1 mb-6">
        {(
          [
            { key: "week", label: "WEEK" },
            { key: "month", label: "MONTH" },
            { key: "3months", label: "3 MONTHS" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPeriod(tab.key)}
            className={cx(
              "text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full transition-all duration-200",
              period === tab.key
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
            />
            <Bar dataKey="missions" radius={[6, 6, 2, 2]} barSize={32}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]}
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </MainCard>
  );
};
