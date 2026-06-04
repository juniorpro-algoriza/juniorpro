"use server";

import { customFetch } from "@server/lib";

interface JoinChallengeSuccessResponse {
  success: true;
  data: Awaited<ReturnType<typeof customFetch>>;
}

export interface JoinChallengeErrorResponse {
  success: false;
  errorMessage: string;
}

const getErrorResponse = (error: unknown): JoinChallengeErrorResponse => {
  return {
    success: false,
    errorMessage:
      error instanceof Error
        ? error.message
        : "Unable to join this challenge. Please try again.",
  };
};

export async function joinChallenge(id: number) {
  try {
    const response = await customFetch("/api/junior-challenge/join/{id}", {
      method: "post",
      path: { id },
    });

    return {
      success: true,
      data: response,
    } satisfies JoinChallengeSuccessResponse;
  } catch (error) {
    return getErrorResponse(error);
  }
}
