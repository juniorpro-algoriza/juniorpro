"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetChallengeDetailsResponse =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.GetById.GetChallengeDetailsResponse"];

export async function getAdminChallengeById(
  id: number
): Promise<GetChallengeDetailsResponse | null> {
  const response = await customFetch("/api/admin-challenge/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
