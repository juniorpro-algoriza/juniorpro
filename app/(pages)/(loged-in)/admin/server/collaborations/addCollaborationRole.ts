"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type AddCollaborationRoleRequest =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleModels.Add.AddCollaborationRoleRequest"];

export async function addCollaborationRole(data: AddCollaborationRoleRequest) {
  const response = await customFetch("/api/admin-collaboration/add-role", {
    method: "post",
    data,
  });

  return response;
}
