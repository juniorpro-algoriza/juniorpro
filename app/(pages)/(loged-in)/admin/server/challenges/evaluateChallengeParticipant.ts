"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type EvaluateChallengeRequest =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Evaluate.EvaluateChallengeRequest"];

export async function evaluateChallengeParticipant(
  data: EvaluateChallengeRequest
) {
  const response = await customFetch("/api/admin-challenge/evaluate", {
    method: "put",
    data,
  });

  return response;
}
