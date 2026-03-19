"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type AddChallengeRequest =
  components["schemas"]["Sawiha.Services.DTO.AdminChallengeModels.Add.AddChallengeRequest"];

export async function createAdminChallenge(data: AddChallengeRequest) {
  const response = await customFetch("/api/admin-challenge", {
    method: "post",
    data,
  });

  return response;
}
