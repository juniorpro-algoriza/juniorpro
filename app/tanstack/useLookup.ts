"use client";

import { useQuery } from "@tanstack/react-query";
import { getLookup } from "@server";
import { QUERY_KEYS } from "../configs/queryKeys";

export const useLookup = (
  url:
    | "/api/Enabler/look-ups"
    | "/api/Lookup/Tool"
    | "/api/Lookup/Category"
    | "/api/project-manager/look-ups"
    | "/api/Lookup/Level"
    | "/api/Lookup/Skill"
    | "/api/Lookup/Duration",
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.global.lookup(url),
    queryFn: () => getLookup(url),
    enabled,
    staleTime: 24 * 60 * 60 * 1000, // Lookups rarely change
  });
};
