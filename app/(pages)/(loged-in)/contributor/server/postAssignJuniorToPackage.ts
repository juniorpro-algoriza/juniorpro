"use server";

import { customFetch } from "@server/lib";

export async function postAssignJuniorToPackage(juniorId: number) {
  const response = await customFetch(
    "/api/Enabler-package/assign-junior/{id}",
    {
      method: "post",
      path: {
        id: juniorId,
      },
    }
  );

  return response;
}
