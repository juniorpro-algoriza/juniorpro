"use server";

import { customFetch } from "@server/lib";

export async function deletePackage({ id }: { id: number }) {
  const packages = customFetch("/api/admin/package/{id}", {
    method: "delete",
    path: {
      id,
    },
  });
  return packages;
}
