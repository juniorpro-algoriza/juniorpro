"use client";

import { useQuery } from "@tanstack/react-query";
import { getJuniorLevel } from "@server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const useJuniorLevel = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.dashboard.level,
    queryFn: getJuniorLevel,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
