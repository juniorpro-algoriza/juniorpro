"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type EnablerLookupModel =
  components["schemas"]["Sawiha.Services.DTO.Enablers.EnablerLookupModel"];

export async function getRoleAssignedJuniors(params: {
  collaborationId: number;
  roleId?: number;
}): Promise<EnablerLookupModel[] | null> {
  const response = await customFetch(
    "/api/admin-collaboration/role-assigned-juniors/look-up",
    {
      method: "get",
      params: {
        CollaborationId: params.collaborationId,
        RoleId: params.roleId,
      },
    }
  );

  return response;
}
