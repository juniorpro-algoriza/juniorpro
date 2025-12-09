"use server";

import { customFetch } from "@server/lib";
import { PlanFormValues } from "../../subscription/schema";

export async function putPackages({ data }: { data: PlanFormValues }) {
  const packages = customFetch("/admin/package", {
    method: "put",
    data: {
      id: data.id,
      nameEn: data.planName,
      description: data.description,
      isActivated: data.isActive,
      durationType: data.durationType as 1 | 2 | 3 | 4,
      price: data.price,
      juniorCapacity: data.juniorCapacity,
      features: data.features.map((feature) => ({
        featureId: feature.featureId,
        isEnabled: true,
        ...(feature.limitCount === null
          ? { limitCount: undefined }
          : { limitCount: feature.limitCount }),
      })),
    },
  });
  return packages;
}
