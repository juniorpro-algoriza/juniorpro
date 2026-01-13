"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmGuidance } from "@server";
import { QUERY_KEYS } from "../configs/queryKeys";

export const useConfirmGuidance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmGuidance,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.global.userProfile,
      });
    },
  });
};
