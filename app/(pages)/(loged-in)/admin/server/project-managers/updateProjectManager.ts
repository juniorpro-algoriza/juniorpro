"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type UpdateEnablerRequest =
  components["schemas"]["Sawiha.Services.DTO.Enablers.UpdateEnablerRequest"];

export async function updateProjectManager(data: UpdateEnablerRequest) {
  const response = await customFetch("/api/project-manager/update", {
    method: "put",
    data,
  });

  return response;
}
