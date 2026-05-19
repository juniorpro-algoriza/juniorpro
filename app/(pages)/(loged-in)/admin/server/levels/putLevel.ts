"use server";

import { customFetch } from "@server/lib";

export async function putLevel(data: FormData) {
  const response = await customFetch("/api/admin-level", {
    method: "put",
    data: data as unknown as {
      Id: number;
      Image?: string;
      XPToNextLevel: number;
      IsActive?: boolean;
    },
  });
  return response;
}
