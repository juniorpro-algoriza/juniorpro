"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentSubscription } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const useCurrentSubscription = (enabled: boolean = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.contributor.subscription,
    queryFn: getCurrentSubscription,
    enabled,
    retry: false,
  });
};
