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
    },
  });
};
