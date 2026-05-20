"use server";

import { customFetch } from "@server/lib";

export async function putBadge(data: FormData) {
  const response = await customFetch("/api/admin-badge", {
    method: "put",
    data: data as unknown as {
      Id: number;
      Image?: string;
      TitleAr: string;
      TitleEn: string;
      Description?: string;
      Type: 1 | 2 | 3 | 4;
      Count: number;
    },
  });

  return response;
}
