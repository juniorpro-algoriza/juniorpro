"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type ProjectManagerDetailModel =
  components["schemas"]["Sawiha.Services.DTO.ProjectMangerModels.ProjectMangerDetailModel"];

export async function getProjectManagerById(
  id: number
): Promise<ProjectManagerDetailModel | null> {
  const response = await customFetch("/api/project-manager/details/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
