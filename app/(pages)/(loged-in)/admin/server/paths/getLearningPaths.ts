"use server";

import { customFetch } from "@server/lib";

export async function getLearningPaths({SearchText}:{SearchText?:string}) {
  const features = customFetch("/learning-path-management", {
    method: "get",
    params: {
      PageNumber: 1,
      PageSize: 1000,
      SearchText,
    },
  });
  return features;
}
