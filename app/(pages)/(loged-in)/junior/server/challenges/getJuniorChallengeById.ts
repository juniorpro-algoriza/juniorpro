"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetJuniorChallengeDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorChallengeModels.GetById.GetJuniorChallengeDetailsModel"];

export async function getJuniorChallengeById(
  id: number
): Promise<GetJuniorChallengeDetailsModel | null> {
  const response = await customFetch("/api/junior-challenge/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
