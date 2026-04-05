"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../../api-schema";

type EnablerDetailModel =
  components["schemas"]["Sawiha.Services.DTO.Enablers.EnablerDetailModel"];

export async function getEnablerDetails(
  id: number
): Promise<EnablerDetailModel | null> {
  const response = await customFetch("/api/Enabler/details/{id}", {
    method: "get",
    path: { id },
  });

  return response;
}
