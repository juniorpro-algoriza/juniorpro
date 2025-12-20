"use server";

import { customFetch } from "@server/lib";

export async function postUpgradePlan(id: number) {
  const upgrade = await customFetch("/Enabler-package/upgrade-plan/{id}", {
    method: "post",
    path: {
      id,
    },
  });
  return upgrade;
}
