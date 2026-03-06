"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type PagedResponse =
  components["schemas"]["Sawiha.CrossCutting.Common.OperationResponse.PagedResponse`1[[System.Collections.Generic.List`1[[Sawiha.Services.DTO.AdminCollaborationModels.GetRoleJuniorRequests.GetAdminCollaborationRoleJuniorsModel, Sawiha.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"];

export async function getJuniorRoleRequests(params: {
  collaborationId: number;
  roleId?: number;
  status?: components["schemas"]["Sawiha.CrossCutting.Model.Entities.CollaborationsFeatures.CollaborationRoleJuniorStatus"];
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}): Promise<PagedResponse | null> {
  const response = await customFetch(
    "/api/admin-collaboration/junior-roles-requests",
    {
      method: "get",
      params: {
        CollaborationId: params.collaborationId,
        RoleId: params.roleId,
        Status: params.status,
        PageNumber: params.pageNumber,
        PageSize: params.pageSize,
        SearchText: params.searchText,
      },
    }
  );

  return response;
}
