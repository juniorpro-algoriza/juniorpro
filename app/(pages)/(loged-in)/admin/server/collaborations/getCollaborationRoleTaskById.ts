"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetAllCollaborationRoleTaskDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleTaskModels.GetById.GetAllCollaborationRoleTaskDetailsModel"];

export async function getCollaborationRoleTaskById(
  id: number
): Promise<GetAllCollaborationRoleTaskDetailsModel | null> {
  const response = await customFetch(
    "/api/admin-collaboration/role-task-details/{id}",
    {
      method: "get",
      path: { id },
    }
  );

  return response;
}
