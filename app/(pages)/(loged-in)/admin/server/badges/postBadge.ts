"use server";

import { customFetch } from "@server/lib";

export async function postBadge(data: FormData) {
  const response = await customFetch("/api/admin-badge", {
    method: "post",
    data: data as unknown as {
      Id?: number;
      TitleAr: string;
      TitleEn: string;
      Description?: string;
      Type: 1 | 2 | 3 | 4;
      Count: number;
      Image: string;
    },
  });

  return response;
}
