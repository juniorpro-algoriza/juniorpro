"use client";

import { useState } from "react";
import { MainCard, Skeleton } from "@components";
import { Award } from "lucide-react";
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
import { useXpStatsTracker } from "../../tanstack";

type Period = "week" | "month" | "3months";

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
  const { data: apiData, isLoading, error } = useXpStatsTracker();

  // Extract and transform data based on period from API response
  const getDataForPeriod = () => {
    if (!apiData) return [];

    // Debug: Log API response structure
    console.log("XP API Response:", apiData);

    let rawData = [];
    switch (period) {
      case "week":
        rawData = apiData.week || [];
        console.log("XP Week data:", rawData);
        return rawData.map((item) => ({
          name: item.dayName || "Unknown",
          xp: item.xp || 0,
        }));
      case "month":
        rawData = apiData.month || [];
        console.log("XP Month data:", rawData);
        return rawData.map((item) => ({
          name: item.weekLabel || `Week ${item.weekNumber || 1}`,
          xp: item.xp || 0,
        }));
      case "3months":
        rawData = apiData.threeMonths || [];
        console.log("XP 3Months data:", rawData);
        return rawData.map((item) => ({
          name: item.monthName || `Month ${item.month || 1}`,
          xp: item.xp || 0,
        }));
      default:
        return [];
    }
  };

  const data = getDataForPeriod();

  if (isLoading) {
    return (
      <MainCard classname="h-full">
        <div>
          <Skeleton className="h-6 rounded w-48 mb-4" />
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-8 rounded-full w-16" />
            <Skeleton className="h-8 rounded-full w-16" />
            <Skeleton className="h-8 rounded-full w-20" />
          </div>
          <Skeleton className="h-[200px] rounded" />
        </div>
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard classname="h-full">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Failed to load XP data</p>
        </div>
      </MainCard>
    );
  }

  if (data.length === 0) {
    return (
      <MainCard classname="h-full">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-lg text-gray-900">Weekly XP Trend</h3>
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

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <div className="size-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-4">
            <Award className="size-7 text-violet-400" />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            No XP Data Yet
          </h3>
          <p className="text-sm text-gray-500 max-w-xs mb-6">
            Complete missions and challenges to start earning XP and see your
            progress here.
          </p>
          <button className="flex items-center gap-2 text-sm font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-xl transition-colors duration-200 group">
            START EARNING XP
            <Award className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </MainCard>
    );
  }

  return (
    <MainCard classname="h-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-lg sm:text-base md:text-sm text-gray-900">
          Weekly XP Trend
        </h3>
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
              "text-[10px] sm:text-[8px] font-bold tracking-wider px-3 py-1.5 rounded-full transition-all duration-200",
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
