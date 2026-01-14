"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSubscribe } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const useSubscribe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSubscribe,
    onSuccess: () => {
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
