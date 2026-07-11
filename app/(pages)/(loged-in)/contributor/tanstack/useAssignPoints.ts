import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAssignPoints } from "../server";
import { QUERY_KEYS } from "../../../../configs/queryKeys";
import { toast } from "sonner";

export const useAssignPoints = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      juniorId,
      points,
    }: {
      juniorId: number;
      points: number;
    }) => {
      const response = await postAssignPoints(juniorId, points);
      if (!response.success) {
        throw new Error(response.error || "Failed to assign points");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributor", "dashboard"] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.contributor.juniors,
      });
      toast.success("Points assigned successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to assign points");
    },
  });
};
