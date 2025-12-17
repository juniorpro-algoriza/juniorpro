"use server";

import { customFetch } from "@server/lib";

export async function getJuniorsData() {
  const juniors = customFetch("/Enabler/juniors", {
    method: "get",
    params: {
      PageNumber: 1,
      PageSize: 1000,
    },
  });
  return juniors;
}
