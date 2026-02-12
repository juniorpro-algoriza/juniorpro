"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type GetCollaborationDetailsModel =
  components["schemas"]["Sawiha.Services.DTO.AdminCollaborationModels.GetById.GetCollaborationDetailsModel"];

export async function getCollaborationById(
  id: number
): Promise<GetCollaborationDetailsModel | null> {
  const response = await customFetch("/api/admin-collaboration/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
