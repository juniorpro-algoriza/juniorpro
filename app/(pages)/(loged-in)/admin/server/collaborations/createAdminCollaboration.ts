"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type AddCollaborationModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.Add.AddCollaborationModel"];

export async function createAdminCollaboration(data: AddCollaborationModel) {
  const response = await customFetch("/api/admin-collaboration", {
    method: "post",
    data,
  });

  return response;
}
