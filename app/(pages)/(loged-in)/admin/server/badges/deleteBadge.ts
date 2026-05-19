"use server";

import { customFetch } from "@server/lib";

export async function deleteBadge({ id }: { id: number }) {
  const response = await customFetch("/api/admin-badge/{id}", {
    method: "delete",
    path: {
      id,
    },
  });

  return response;
}
