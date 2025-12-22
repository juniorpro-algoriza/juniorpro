"use client";

import { useQuery } from "@tanstack/react-query";
import { getLookup } from "@server";
import { QUERY_KEYS } from "../configs/queryKeys";

export const useLookup = (
  url:
    | "/Enabler/look-ups"
    | "/Lookup/Tool"
    | "/Lookup/Category"
    | "/project-manager/look-ups"
    | "/Lookup/Level"
    | "/Lookup/Skill"
    | "/Lookup/Duration",
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: QUERY_KEYS.global.lookup(url),
    queryFn: () => getLookup(url),
    enabled,
    staleTime: 24 * 60 * 60 * 1000, // Lookups rarely change
  });
};
