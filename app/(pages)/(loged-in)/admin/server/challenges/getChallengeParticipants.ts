"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type PagedParticipantsResponse =
  components["schemas"]["Sawiha.CrossCutting.Common.OperationResponse.PagedResponse`1[[System.Collections.Generic.List`1[[Sawiha.Services.DTO.AdminChallengeModels.GetAllParticpants.GetAllChallengeParticipantModel, Sawiha.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"];

export async function getChallengeParticipants(params: {
  id: number;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}): Promise<PagedParticipantsResponse | null> {
  const response = await customFetch("/api/admin-challenge/participants", {
    method: "get",
    params: {
      Id: params.id,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    },
  });

  return response;
}
