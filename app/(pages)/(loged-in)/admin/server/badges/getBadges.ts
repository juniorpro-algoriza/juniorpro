"use server";

import { customFetch, formatImageUrl } from "@server/lib";
import { components } from "../../../../../../api-schema";

type Badge =
  components["schemas"]["Sawiha.Services.DTO.AdminBadgeModels.GetAll.AdminBadgeListModel"];
type BadgeType =
  components["schemas"]["Sawiha.CrossCutting.Model.Entities.BadgeFeature.BadgeType"];

export async function getBadges({
  Type,
  SearchText,
  PageNumber = 1,
  PageSize = 12,
}: {
  Type?: BadgeType;
  SearchText?: string;
  PageNumber?: number;
  PageSize?: number;
}) {
  const response = await customFetch("/api/admin-badge", {
    method: "get",
    params: {
      Type,
      PageNumber,
      PageSize,
      SearchText,
    },
  });

  if (response && response.data) {
    const formattedData = await Promise.all(
      (response.data as Badge[]).map(async (badge) => ({
        ...badge,
        imageUrl: await formatImageUrl(badge.imageUrl),
      }))
    );

    return { ...response, data: formattedData };
  }

  return response;
}
