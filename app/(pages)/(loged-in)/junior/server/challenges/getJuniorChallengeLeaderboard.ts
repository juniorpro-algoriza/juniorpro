"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type LeaderboardResponse =
  components["schemas"]["Sawiha.CrossCutting.Common.OperationResponse.PagedResponse`1[[System.Collections.Generic.List`1[[Sawiha.Services.DTO.JuniorChallengeModels.GetChallengeLeaderboard.GetJuniorChallengeLeaderboardModel, Sawiha.Services, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]], System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]"];

export async function getJuniorChallengeLeaderboard(params: {
  id: number;
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
}): Promise<LeaderboardResponse | null> {
  return customFetch("/api/junior-challenge/leaderboard", {
    method: "get",
    params: {
      Id: params.id,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
      SearchText: params.searchText,
    },
  });
}
