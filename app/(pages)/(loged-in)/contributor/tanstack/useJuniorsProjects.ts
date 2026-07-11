"use client";

import { useQuery } from "@tanstack/react-query";
import { getJuniorsProjects } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const useJuniorsProjects = (
  params?: {
    PageNumber?: number;
    PageSize?: number;
    SearchText?: string;
  },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.contributor.dashboard.juniorsProjects({
      PageNumber: params?.PageNumber,
      PageSize: params?.PageSize,
      SearchText: params?.SearchText,
    }),
    queryFn: () => getJuniorsProjects(params),
    enabled,
  });
};
