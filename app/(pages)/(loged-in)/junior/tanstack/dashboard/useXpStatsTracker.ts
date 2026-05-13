"use client";

import { useQuery } from "@tanstack/react-query";
import { getXpStatsTracker } from "@server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const useXpStatsTracker = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.dashboard.xpStatsTracker,
    queryFn: getXpStatsTracker,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
