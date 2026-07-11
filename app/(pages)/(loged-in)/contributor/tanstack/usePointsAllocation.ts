"use client";

import { useQuery } from "@tanstack/react-query";
import { getPointsAllocation } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const usePointsAllocation = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.contributor.dashboard.pointsAllocation,
    queryFn: getPointsAllocation,
    enabled,
  });
};
