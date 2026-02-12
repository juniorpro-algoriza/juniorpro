"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminCollaborations } from "@server";
import { QUERY_KEYS } from "../configs/queryKeys";

export const useAdminCollaborations = (
  params: {
    PageNumber?: number;
    PageSize?: number;
    SearchText?: string;
  },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.collaborations.all(params),
    queryFn: () => getAdminCollaborations(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
