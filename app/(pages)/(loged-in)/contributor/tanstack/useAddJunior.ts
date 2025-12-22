"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAddJuniorToContributer } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const useAddJunior = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postAddJuniorToContributer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.contributor.juniors,
      });
    },
  });
};
