"use server";

import { customFetch } from "@server/lib";

export async function getFeatures() {
  const features = customFetch("/feature", {
    method: "get",
  });
  return features;
}
