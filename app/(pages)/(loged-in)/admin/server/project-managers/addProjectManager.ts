"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type AddEnablerRequest =
  components["schemas"]["Sawiha.Services.DTO.Enablers.AddEnablerRequest"];

export async function addProjectManager(data: AddEnablerRequest) {
  const response = await customFetch("/api/project-manager/add", {
    method: "post",
    data,
  });

  return response;
}
