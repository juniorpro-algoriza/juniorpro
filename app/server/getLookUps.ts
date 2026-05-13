"use server";
import { customFetch } from "@server/lib";
import { Lookup } from "@types";

export async function getLookup(
  url:
    | "/api/Enabler/look-ups"
    | "/api/Lookup/Tool"
    | "/api/Lookup/Category"
    | "/api/project-manager/look-ups"
    | "/api/Lookup/Level"
    | "/api/Lookup/Skill"
    | "/api/Lookup/Duration"
) {
  const lookup = await customFetch(url, {
    method: "get",
  });

  return lookup?.map(
    (item: {
      id?: number;
      nameAr?: string | null;
      nameEn?: string | null;
    }): Lookup => ({
      value: item.id || 0,
      label: item.nameEn || "",
    })
  );
}
