"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetJuniorChallengeListModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorChallengeModels.GetAll.GetJuniorChallengeListModel"];

interface GetJuniorChallengesParams {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}

export async function getJuniorChallenges(
  params: GetJuniorChallengesParams
): Promise<GetJuniorChallengeListModel[] | null> {
  const response = await customFetch("/api/junior-challenge", {
    method: "get",
    params: {
      SearchText: params.searchText,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
    },
  });

  return response?.data || null;
}
