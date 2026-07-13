"use client";

import { MainCard, Skeleton } from "@components";
import { cx } from "@lib";
import { Coins, Wallet } from "lucide-react";
import { usePointsAllocation } from "../../tanstack";
import { components } from "../../../../../../api-schema";

interface StatCard {
  id: string;
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  iconBg: string;
}

const getStatsData = (
  data: components["schemas"]["Sawiha.Services.DTO.EnablerDashboard.PointsAllocationResponse"]
): StatCard[] => {
  return [
    {
      id: "points-allocation",
      label: "TOTAL POINTS ALLOCATED",
      value: data?.pointsAllocation?.toString() || "0",
      subtext: "overall allocated to you",
      icon: <Coins className="size-6 text-white" strokeWidth={2.5} />,
      iconBg: "bg-emerald-500",
    },
    {
      id: "points-balance",
      label: "POINTS BALANCE",
      value: data?.pointsBalance?.toString() || "0",
      subtext: "points available to distribute",
      icon: <Wallet className="size-6 text-white" />,
      iconBg: "bg-blue-500",
    },
  ];
};

const loadingCardIds = ["points-allocation", "points-balance"];

export const ContributorStatsCards = () => {
  const { data: statsData, isLoading, error } = usePointsAllocation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {loadingCardIds.map((id) => (
          <div key={id} id={id}>
            <MainCard classname="relative overflow-hidden h-full">
              <Skeleton className="size-11 rounded-full mb-4" />
              <Skeleton className="h-3 w-28 rounded mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-9 w-14 rounded" />
              </div>
              <Skeleton className="h-4 w-20 rounded" />
            </MainCard>
          </div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {statsCards.map((card, index) => (
        <div key={index} id={card.id}>
          <MainCard classname="relative overflow-hidden group h-full">
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

            {/* Value */}
            <div className="flex items-center gap-3">
              <p className="text-4xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                {card.value}
              </p>
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-xs text-gray-400 font-semibold mt-1">
              {card.subtext}
            </p>
          </MainCard>
        </div>
      ))}
    </div>
  );
};
