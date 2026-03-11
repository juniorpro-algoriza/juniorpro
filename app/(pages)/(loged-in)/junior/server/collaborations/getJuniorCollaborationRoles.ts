"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetJuniorCollaborationRoleModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorCollaborationModels.RolesModels.GetAll.GetJuniorCollaborationRoleModel"];

interface GetJuniorCollaborationRolesParams {
  collaborationId: number;
  pageNumber?: number;
  pageSize?: number;
}

export async function getJuniorCollaborationRoles(
  params: GetJuniorCollaborationRolesParams
): Promise<GetJuniorCollaborationRoleModel[] | null> {
  const response = await customFetch("/api/junior-collaboration/roles", {
    method: "get",
    params: {
      Id: params.collaborationId,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
    },
  });

  return response?.data || null;
}
