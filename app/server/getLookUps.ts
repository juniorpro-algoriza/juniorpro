"use server";

import { Lookup } from "@types";
import { getData } from "./getData";

export const getLookup = async (url: string): Promise<Lookup[]> => {
  const data: { id: number; nameEn: string }[] = await getData({
    url,
    method: "GET",
  });
  return (
    data?.map(
      (item: { id: number; nameEn: string }): Lookup => ({
        value: item.id,
        label: item.nameEn,
      })
    ) ?? []
  );
};
