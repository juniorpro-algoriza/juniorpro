"use server";

import { customFetch, formatImageUrl } from "@server/lib";
import { components } from "../../../../../../api-schema";

type Level =
  components["schemas"]["Sawiha.Services.DTO.LevelFeatureModel.GetAll.GetAdminLevelModel"];

export async function getLevels({
  SearchText,
  PageNumber = 1,
  PageSize = 100,
}: {
  SearchText?: string;
  PageNumber?: number;
  PageSize?: number;
}) {
  const response = (await customFetch("/api/admin-level", {
    method: "get",
    params: {
      PageNumber,
      PageSize,
      SearchText,
    },
  })) as { data?: Level[] };

  if (response && response.data) {
    const formattedData = await Promise.all(
      response.data.map(async (level: Level) => ({
        ...level,
        imageUrl: await formatImageUrl(level.imageUrl),
      }))
    );
    return { ...response, data: formattedData };
  }

  return response;
}
