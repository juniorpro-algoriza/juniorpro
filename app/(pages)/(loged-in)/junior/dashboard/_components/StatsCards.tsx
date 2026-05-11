"use client";

import { MainCard, Skeleton } from "@components";
import { cx } from "@lib";
import { Swords, Users, TrendingUp, Lock, Target, Star } from "lucide-react";
import { useJuniorDashboardStats } from "../../tanstack";
import { components } from "../../../../../../api-schema";

interface StatCard {
  label: string;
  value: string;
  subtext: string;
  trend?: string;
  icon: React.ReactNode;
  iconBg: string;
  isLocked?: boolean;
}

const getStatsData = (
  data: components["schemas"]["Sawiha.Services.DTO.JuniorDashboard.JuniorDashboardStatsModel"]
): StatCard[] => {
  return [
    {
      label: "MISSIONS COMPLETED",
      value: data?.missions?.toString() || "0",
      subtext: "total this week",
      icon: <Target className="size-6 text-white" strokeWidth={2.5} />,
      iconBg: "bg-emerald-500",
    },
    {
      label: "TOTAL XP",
      value: data?.totalXp?.toString() || "0",
      subtext: "XP",
      icon: <Star className="size-6 text-white" />,
      iconBg: "bg-amber-500",
    },
    {
      label: "WEEKLY CHALLENGES",
      value: data?.challenges?.toString() || "0",
      subtext: (data?.challenges ?? 0) > 0 ? "active" : "not joined yet",
      icon: <Swords className="size-6 text-white" />,
      iconBg: "bg-rose-500",
    },
    {
      label: "TEAM PROJECTS",
      value: data?.collaborations?.toString() || "0",
      subtext:
        (data?.collaborations ?? 0) > 0
          ? `${data.collaborations} active`
          : "no active projects",
      icon: <Users className="size-6 text-white" />,
      iconBg: "bg-blue-500",
    },
  ];
};

export const StatsCards = () => {
  const { data: statsData, isLoading, error } = useJuniorDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <MainCard key={index} classname="relative overflow-hidden">
            <Skeleton className="size-11 rounded-full mb-4" />
            <Skeleton className="h-3 w-28 rounded mb-4" />
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-9 w-14 rounded" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20 rounded" />
          </MainCard>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Failed to load dashboard stats</p>
      </div>
    );
  }

  const statsCards = getStatsData(statsData || {});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((card, index) => (
        <MainCard key={index} classname="relative overflow-hidden group">
          {/* Icon */}
          <div
            className={cx(
              "size-10 rounded-full flex items-center justify-center shadow-[0px_4px_0px_0px_#00000033] mb-4",
              card.iconBg
            )}
          >
            {card.icon}
          </div>

          {/* Label */}
          <p className="text-[13px] sm:text-[11px] font-bold tracking-wider text-gray-500 uppercase">
            {card.label}
          </p>

          {/* Value + Trend */}
          {card.isLocked ? (
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="size-5" />
              <span className="font-semibold text-lg sm:text-base">Locked</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-4xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                {card.value}
              </p>
              {card.trend && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="size-3" />
                  {card.trend}
                </span>
              )}
            </div>
          )}

          {/* Subtext */}
          <p className="text-sm sm:text-xs text-gray-400 font-semibold mt-1">
            {card.subtext}
          </p>
        </MainCard>
      ))}
    </div>
  );
};
