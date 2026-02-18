"use server";

import { customFetch } from "@server/lib";

export async function getRoleAssignedJuniors(roleId: number) {
  const response = await customFetch(
    "/api/admin-collaboration/role-assigned-juniors/look-up/{roleId}",
    {
      method: "get",
      path: { roleId },
    }
  );

  return response;
}
