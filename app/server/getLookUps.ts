"use server";
import { customFetch } from "@server/lib";
import { Lookup } from "@types";

export async function getLookup(
  url:
    | "/Enabler/look-ups"
    | "/Lookup/Tool"
    | "/Lookup/Category"
    | "/project-manager/look-ups"
    | "/Lookup/Level"
    | "/Lookup/Skill"
    | "/Lookup/Duration"
): Promise<Lookup[]> {
  const lookup = await customFetch(url, {
    method: "get",
  });

  return lookup.map(
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
