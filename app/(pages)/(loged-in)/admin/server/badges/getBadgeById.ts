"use server";

import { customFetch, formatImageUrl } from "@server/lib";

export async function getBadgeById({ id }: { id: number }) {
  const response = await customFetch("/api/admin-badge/{id}", {
    method: "get",
    path: {
      id,
    },
  });

  if (response?.imageUrl) {
    return {
      ...response,
      imageUrl: await formatImageUrl(response.imageUrl),
    };
  }

  return response;
}
