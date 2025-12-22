"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUpgradePlan } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const useUpgradePlan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUpgradePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.contributor.subscription,
      });
    },
  });
};
