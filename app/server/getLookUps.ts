"use server";

import { Lookup } from "@types";
import { getData } from "./getData";

export const getCategoryLookUp = async () => {
  const data = await getData({
    url: "Lookup/Category",
    method: "GET",
  });
  return data?.map(
    (item: { id: number; nameAr: string }): Lookup => ({
      value: item.id,
      label: item.nameAr,
    })
  );
};

export const getLevelLookUp = async () => {
  const data = await getData({
    url: "Lookup/Level",
    method: "GET",
  });
  return data?.map(
    (item: { id: number; nameAr: string }): Lookup => ({
      value: item.id,
      label: item.nameAr,
    })
  );
};

export const getDurationLookUp = async () => {
  const data = await getData({
    url: "Lookup/Duration",
    method: "GET",
  });
  return data?.map(
    (item: { id: number; nameAr: string }): Lookup => ({
      value: item.id,
      label: item.nameAr,
    })
  );
};

export const getToolsLookUp = async () => {
  const data = await getData({
    url: "Lookup/Tool",
    method: "GET",
  });
  return data?.map(
    (item: { id: number; nameAr: string }): Lookup => ({
      value: item.id,
      label: item.nameAr,
    })
  );
};

export const getSkillsLookUp = async () => {
  const data = await getData({
    url: "Lookup/Skill",
    method: "GET",
  });
  return data?.map(
    (item: { id: number; nameAr: string }): Lookup => ({
      value: item.id,
      label: item.nameAr,
    })
  );
};
