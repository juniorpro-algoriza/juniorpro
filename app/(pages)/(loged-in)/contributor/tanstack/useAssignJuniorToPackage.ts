"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAssignJuniorToPackage } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const useAssignJuniorToPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAssignJuniorToPackage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.contributor.juniors,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.contributor.subscription,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.contributor.packages({
          SearchText: "",
          DurationType: "month",
        }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.contributor.packages({
          SearchText: "",
          DurationType: "year",
        }),
      });
    },
  });
};
