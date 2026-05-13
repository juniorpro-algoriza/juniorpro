"use client";

import { useQuery } from "@tanstack/react-query";
import { getJuniorCurrentCollaborationDetails } from "@server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const useJuniorCurrentCollaborationDetails = (
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.dashboard.currentCollaborationDetails,
    queryFn: getJuniorCurrentCollaborationDetails,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
