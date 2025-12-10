"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

export async function postLearningPath(
  data: components["schemas"]["Sawiha.Services.DTO.PathModels.AddLearningPathModel"],
) {
  const features = customFetch("/learning-path-management", {
    method: "post",
    data,
  });
  return features;
}
