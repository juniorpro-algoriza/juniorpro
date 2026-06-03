"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetJuniorChallengeDetailsResponse =
  components["schemas"]["Sawiha.Services.DTO.JuniorChallengeModels.GetById.GetJuniorChallengeDetailsResponse"];

export interface JuniorChallengeErrorResponse {
  __error: true;
  errorMessage: string;
}

const getErrorResponse = (error: unknown): JuniorChallengeErrorResponse => {
  return {
    __error: true,
    errorMessage:
      error instanceof Error
        ? error.message
        : "Unable to load this challenge. Please try again.",
  };
};

export async function getJuniorChallengeById(
  id: number
): Promise<
  GetJuniorChallengeDetailsResponse | JuniorChallengeErrorResponse | null
> {
  try {
    const response = await customFetch("/api/junior-challenge/{id}", {
      method: "get",
      path: { id },
    });

    return response;
  } catch (error) {
    return getErrorResponse(error);
  }
}
