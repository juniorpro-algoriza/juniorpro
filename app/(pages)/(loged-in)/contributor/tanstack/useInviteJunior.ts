"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postInviteJunior } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";

export const useInviteJunior = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postInviteJunior,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.contributor.juniors,
      });
    },
  });
};
