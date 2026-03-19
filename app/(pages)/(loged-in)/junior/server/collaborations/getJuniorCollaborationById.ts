"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetJuniorCollaborationDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorCollaborationModels.GetById.GetJuniorCollaborationDetailsModel"];

export async function getJuniorCollaborationById(
  id: number
): Promise<GetJuniorCollaborationDetailsModel | null> {
  const response = await customFetch("/api/junior-collaboration/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
