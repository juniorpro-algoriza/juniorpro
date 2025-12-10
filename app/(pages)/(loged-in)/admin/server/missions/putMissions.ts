"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

export async function putMission(
  data: components["schemas"]["Sawiha.Services.DTO.MissionsModels.AddMissionModel"],
) {
  const features = customFetch("/learning-path-management/mission", {
    method: "put",
    data,
  });
  return features;
}
