"use client";

import { DashboardHeader } from "@components/client";
import { useJuniorDashboardStats } from "../../tanstack";

const getMissionsDescription = (missions: number) => {
  const missionLabel = missions === 1 ? "mission" : "missions";

  return `You completed ${missions} ${missionLabel} this week. Keep it up!`;
};

export const JuniorDashboardHeader = () => {
  const { data: statsData, isLoading } = useJuniorDashboardStats();
  const missions = statsData?.missions ?? 0;

  return (
    <DashboardHeader
      description={
        isLoading
          ? "Loading your weekly mission progress..."
          : getMissionsDescription(missions)
      }
    />
  );
};
