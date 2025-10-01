"use server";
import { Career } from "@types";
import { getData } from "./getData";

export const getCareerTypes = async () => {
  const careers = await getData<Career[]>({
    url: "Lookup/Career",
    method: "GET",
  });
  return careers?.map((career: Career) => {
    return {
      value: String(career.id),
      label: String(career.nameAr),
    };
  });
};
