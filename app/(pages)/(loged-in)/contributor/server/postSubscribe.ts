"use server";

import { customFetch } from "@server/lib";

export async function postSubscribe(id: number) {
  const subscription = await customFetch("/Enabler-package/subscripe/{id}", {
    method: "post",
    path: {
      id,
    },
  });
  return subscription;
}
