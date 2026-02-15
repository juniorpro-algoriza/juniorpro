"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type AddCollaborationRoleTaskModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleTaskModels.Add.AddCollaborationRoleTaskModel"];

export async function updateCollaborationRoleTask(
  data: AddCollaborationRoleTaskModel
) {
  const response = await customFetch(
    "/api/admin-collaboration/update-role-task",
    {
      method: "put",
      data,
    }
  );

  return response;
}
