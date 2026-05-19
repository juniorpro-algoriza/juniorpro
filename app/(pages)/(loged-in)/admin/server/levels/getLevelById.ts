"use server";

import { customFetch, formatImageUrl } from "@server/lib";
import { components } from "../../../../../../api-schema";

type Level =
  components["schemas"]["Sawiha.Services.DTO.LevelFeatureModel.GetAll.GetAdminLevelModel"];

export async function getLevelById({ id }: { id: number }) {
  const response = (await customFetch("/api/admin-level/{id}", {
    method: "get",
    path: { id },
  })) as Level;

  if (response) {
    return {
      ...response,
      imageUrl: await formatImageUrl(response.imageUrl),
    };
  }

  return response;
}
