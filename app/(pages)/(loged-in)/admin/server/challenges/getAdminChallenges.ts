"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type PagedChallengeResponse =
  components["schemas"]["Sawiha.CrossCutting.Common.OperationResponse.PagedResponse`1[[System.Collections.Generic.List`1[[Sawiha.Services.DTO.AdminChallengeModels.GetAll.GetChallengeListModel, Sawiha.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"];

export async function getAdminChallenges(params: {
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}): Promise<PagedChallengeResponse | null> {
  const response = await customFetch("/api/admin-challenge", {
    method: "get",
    params: {
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    },
  });

  return response;
}
