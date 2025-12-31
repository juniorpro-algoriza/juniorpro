"use client";

import { useQuery } from "@tanstack/react-query";
import { getPackages } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const usePackagesData = (
  params: { SearchText: string; DurationType: "month" | "year" },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.contributor.packages(params),
    queryFn: () => getPackages(params),
    enabled,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
