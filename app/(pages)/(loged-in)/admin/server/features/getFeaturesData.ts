"use server";

import { customFetch } from "@server/lib";

export async function getFeatures() {
  const features = customFetch("/api/feature", {
    method: "get",
  });
  return features;
}
