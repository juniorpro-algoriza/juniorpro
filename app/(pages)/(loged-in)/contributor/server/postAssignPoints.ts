"use server";

import { customFetch } from "@server/lib";
import { revalidateTag } from "next/cache";
import { type ActionState } from "@server/types";

export const postAssignPoints = async (
  juniorId: number,
  points: number
): Promise<ActionState> => {
  try {
    await customFetch(`/api/Enabler/assign-points-to-junior`, {
      method: "post",
      params: {
        juniorId,
        points,
      },
    });

    revalidateTag("contributor.dashboard");
    revalidateTag("contributor.juniors");

    return { success: true, error: null };
  } catch (error) {
    let errorMessage = "An error occurred while assigning points.";
    try {
      const err = error as { message?: string };
      if (err.message) {
        const parsedError = JSON.parse(err.message);
        const code = parsedError.code || parsedError.details?.code;

        if (
          code === "NotEnoughPoints" ||
          code === "NOT_ENOUGH_POINTS" ||
          err.message.includes("NotEnoughPoints")
        ) {
          errorMessage = "You don't have enough points to assign.";
        } else {
          errorMessage =
            parsedError.errorMessage ||
            parsedError.statusText ||
            code ||
            errorMessage;
        }
      }
    } catch {
      const err = error as { message?: string };
      if (err.message && err.message.includes("NotEnoughPoints")) {
        errorMessage = "You don't have enough points to assign.";
      } else if (err.message) {
        errorMessage = err.message;
      }
    }
    return { success: false, error: errorMessage };
  }
};
