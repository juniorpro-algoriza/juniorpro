"use server";

import { customFetch } from "@server/lib";
import { components } from "../../../../../api-schema";

export async function postAddJuniorToContributer(
  data: components["schemas"]["Sawiha.Services.DTO.Enablers.AddJuniorRequest"],
) {
  const junior = await customFetch("/Enabler/add-junior", {
    method: "post",
    data,
  });
  return junior;
}
