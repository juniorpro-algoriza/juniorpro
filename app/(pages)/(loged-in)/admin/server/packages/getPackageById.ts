"use server";

import { customFetch } from "@server/lib";

export async function getPackageById({ id }: { id: number }) {
  const packages = customFetch("/api/admin/package/{id}", {
    method: "get",
    path: {
      id,
    },
  });
  return packages;
}
