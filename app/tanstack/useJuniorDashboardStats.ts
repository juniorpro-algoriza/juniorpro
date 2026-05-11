"use client";

import { useQuery } from "@tanstack/react-query";
import { getJuniorDashboardStats } from "@server";
import { QUERY_KEYS } from "../configs/queryKeys";

export const useJuniorDashboardStats = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.dashboard.stats,
    queryFn: getJuniorDashboardStats,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
