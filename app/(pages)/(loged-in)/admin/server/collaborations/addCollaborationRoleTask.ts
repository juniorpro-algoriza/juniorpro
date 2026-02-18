"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type AddCollaborationRoleTaskModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleTaskModels.Add.AddCollaborationRoleTaskModel"];

export async function addCollaborationRoleTask(
  data: AddCollaborationRoleTaskModel
) {
  const response = await customFetch("/api/admin-collaboration/add-role-task", {
    method: "post",
    data,
  });

  return response;
}
