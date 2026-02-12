"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type AddCollaborationRoleRequest =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleModels.Add.AddCollaborationRoleRequest"];

export async function updateCollaborationRole(
  data: AddCollaborationRoleRequest
) {
  const response = await customFetch("/api/admin-collaboration/update-role", {
    method: "put",
    data,
  });

  return response;
}
