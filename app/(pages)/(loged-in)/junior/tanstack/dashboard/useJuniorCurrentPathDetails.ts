"use client";

import { useQuery } from "@tanstack/react-query";
import { getJuniorCurrentPathDetails } from "@server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const useJuniorCurrentPathDetails = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.dashboard.currentPath,
    queryFn: getJuniorCurrentPathDetails,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
