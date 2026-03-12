"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetChallengeParticipantDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.GetParticpantById.GetChallengeParticipantDetailsModel"];

export async function getChallengeParticipantById(
  id: number
): Promise<GetChallengeParticipantDetailsModel | null> {
  const response = await customFetch("/api/admin-challenge/participants/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
