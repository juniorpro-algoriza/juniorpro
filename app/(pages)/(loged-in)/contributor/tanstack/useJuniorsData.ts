"use client";

import { useQuery } from "@tanstack/react-query";
import { getJuniorsData } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const useJuniorsData = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.contributor.juniors,
    queryFn: getJuniorsData,
    enabled,
  });
};
