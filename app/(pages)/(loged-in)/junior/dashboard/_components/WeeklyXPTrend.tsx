"use client";

import { useState } from "react";
import { MainCard } from "@components";
import { TrendingDown } from "lucide-react";
import { cx } from "@lib";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weekData = [
  { name: "Tue", xp: 120 },
  { name: "Wed", xp: 180 },
  { name: "Thu", xp: 150 },
  { name: "Fri", xp: 280 },
  { name: "Sat", xp: 320 },
  { name: "Sun", xp: 450 },
];

const monthData = [
  { name: "Week 1", xp: 800 },
  { name: "Week 2", xp: 1200 },
  { name: "Week 3", xp: 950 },
  { name: "Week 4", xp: 1400 },
];

const threeMonthData = [
  { name: "Jan", xp: 3200 },
  { name: "Feb", xp: 4100 },
  { name: "Mar", xp: 3800 },
];

type Period = "week" | "month" | "3months";

const periodDataMap: Record<Period, typeof weekData> = {
  week: weekData,
  month: monthData,
  "3months": threeMonthData,
};

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
        <p className="text-violet-300 mt-0.5">
          {payload[0].value.toLocaleString()} XP
        </p>
      </div>
    );
  }
  return null;
};

export const WeeklyXPTrend = () => {
  const [period, setPeriod] = useState<Period>("week");
  const data = periodDataMap[period];

  return (
    <MainCard classname="h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-lg text-gray-900">Weekly XP Trend</h3>
        <span className="flex items-center gap-1 text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
          <TrendingDown className="size-3" />
          -4%
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
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              cursor={{
                stroke: "#818cf8",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="xp"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#xpGradient)"
              dot={{ fill: "#6366f1", strokeWidth: 2, r: 4, stroke: "#fff" }}
              activeDot={{
                fill: "#6366f1",
                strokeWidth: 3,
                r: 6,
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </MainCard>
  );
};
