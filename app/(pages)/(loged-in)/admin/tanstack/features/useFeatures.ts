"use client";

import { useQuery } from "@tanstack/react-query";
import { getFeatures } from "../../server";
import { QUERY_KEYS } from "../../../../../configs/queryKeys";

export const useFeatures = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.features,
    queryFn: getFeatures,
    enabled,
  });
};
