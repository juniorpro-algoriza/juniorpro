"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

export async function postMission(
  data: components["schemas"]["Sawiha.Services.DTO.MissionsModels.AddMissionModel"]
) {
  const mission = customFetch("/api/learning-path-management/mission", {
    method: "post",
    data,
  });
  return mission;
}
