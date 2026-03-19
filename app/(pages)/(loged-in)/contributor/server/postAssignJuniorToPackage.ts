"use server";

import { customFetch } from "@server/lib";

export async function postAssignJuniorToPackage(id: number) {
  const result = await customFetch("/api/Enabler-package/assign-junior/{id}", {
    method: "post",
    path: {
      id,
    },
  });
  return result;
}
