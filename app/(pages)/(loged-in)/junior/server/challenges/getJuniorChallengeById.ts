"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetJuniorChallengeDetailsResponse =
  components["schemas"]["Sawiha.Services.DTO.JuniorChallengeModels.GetById.GetJuniorChallengeDetailsResponse"];

export async function getJuniorChallengeById(
  id: number
): Promise<GetJuniorChallengeDetailsResponse | null> {
  const response = await customFetch("/api/junior-challenge/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
