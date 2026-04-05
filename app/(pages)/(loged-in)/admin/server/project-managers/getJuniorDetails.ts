"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type JuniorDetailModel =
  components["schemas"]["Sawiha.Services.DTO.JuniorModels.JuniorDetailModel"];

export async function getJuniorDetails(
  id: number
): Promise<JuniorDetailModel | null> {
  const response = await customFetch("/api/junior/details/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
