"use client";

import { useQuery } from "@tanstack/react-query";
import { getJuniorCurrentChallengeDetails } from "@server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const useJuniorCurrentChallengeDetails = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.dashboard.currentChallengeDetails,
    queryFn: getJuniorCurrentChallengeDetails,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
