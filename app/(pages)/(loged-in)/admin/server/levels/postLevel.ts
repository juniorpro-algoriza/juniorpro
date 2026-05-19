"use server";

import { customFetch } from "@server/lib";

export async function postLevel(data: FormData) {
  const response = await customFetch("/api/admin-level", {
    method: "post",
    data: data as unknown as {
      Id?: number;
      XPToNextLevel: number;
      Image: string;
      IsActive?: boolean;
    },
  });
  return response;
}
