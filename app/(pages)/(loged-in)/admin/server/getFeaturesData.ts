import { customFetch } from "@server/lib";

export function getFeatures() {
  const features = customFetch("/feature", {
    method: "get",
  });
  return features;
}
