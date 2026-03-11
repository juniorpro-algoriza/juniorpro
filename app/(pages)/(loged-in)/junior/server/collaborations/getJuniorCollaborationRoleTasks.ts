"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetAllCollaborationRoleTaskModel =
  components["schemas"]["Sawiha.Services.DTO.CollaborationRoleTaskModels.GetAll.GetAllCollaborationRoleTaskModel"];

interface GetJuniorCollaborationRoleTasksParams {
  collaborationId: number;
  roleId?: number;
  juniorId?: number;
  status?: components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.CollaborationRoleTaskStatus"];
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}

export async function getJuniorCollaborationRoleTasks(
  params: GetJuniorCollaborationRoleTasksParams
): Promise<GetAllCollaborationRoleTaskModel[] | null> {
  const response = await customFetch("/api/junior-collaboration/role-tasks", {
    method: "get",
    params: {
      CollaborationId: params.collaborationId,
      RoleId: params.roleId,
      JuniorId: params.juniorId,
      Status: params.status,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    },
  });

  return response?.data || null;
}
