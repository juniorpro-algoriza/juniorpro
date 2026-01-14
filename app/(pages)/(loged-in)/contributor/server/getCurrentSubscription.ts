"use server";

import { customFetch } from "@server/lib";

export async function getCurrentSubscription() {
  const subscription = customFetch(
    "/api/Enabler-package/current-subscription",
    {
      method: "get",
    }
  );
  return subscription;
}
