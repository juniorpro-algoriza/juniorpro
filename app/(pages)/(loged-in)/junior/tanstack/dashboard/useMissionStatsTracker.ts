"use client";

import { useQuery } from "@tanstack/react-query";
import { getMissionStatsTracker } from "@server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const useMissionStatsTracker = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.dashboard.missionStatsTracker,
    queryFn: getMissionStatsTracker,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
