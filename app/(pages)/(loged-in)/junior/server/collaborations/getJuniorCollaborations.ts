"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetJuniorCollaborationListModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorCollaborationModels.GetAll.GetJuniorCollaborationListModel"];

interface GetJuniorCollaborationsParams {
  searchText?: string;
  pageNumber?: number;
  pageSize?: number;
}

export async function getJuniorCollaborations(
  params: GetJuniorCollaborationsParams
): Promise<GetJuniorCollaborationListModel[] | null> {
  const response = await customFetch("/api/junior-collaboration", {
    method: "get",
    params: {
      SearchText: params.searchText,
      PageNumber: params.pageNumber,
      PageSize: params.pageSize,
    },
  });

  return response?.data || null;
}
