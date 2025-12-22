"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@server";
import { QUERY_KEYS } from "../configs/queryKeys";

export const useUserProfile = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.global.userProfile,
    queryFn: getUserProfile,
    enabled,
    staleTime: 5 * 60 * 1000,
  });
};
