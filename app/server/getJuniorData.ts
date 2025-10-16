"use server";

import { getData } from "@server";
import { ProfileData } from "@types";

export const getJuniorData = async (id: number): Promise<ProfileData> => {
  const data = await getData<ProfileData>({
    url: `junior/details/${id}`,
    method: "GET",
  });

  return {
    firstName: String(data?.firstName || data?.firstName?.split(" ")[0] || ""),
    lastName: String(data?.lastName || data?.lastName?.split(" ")[1] || ""),
    email: String(data?.email || ""),
    userType: data?.userType,
    image: String(data?.image || "/images/profile-avartar.svg"),
    coverImage: String(data?.coverImage || "/images/sky.svg"),
    location: String(data?.location || ""),
    about: String(data?.about || ""),
    birthDate: String(data?.birthDate || ""),
    phoneNumber: String(data?.phoneNumber || ""),
    career: Number(data?.careerTypeId || 0),
    profileUrl: String(data?.profileUrl || ""),
    linkedInUrl: String(data?.linkedInUrl || ""),
    freeProjects: Number(data?.freeProjects || 0),
    premiumProjects: Number(data?.premiumProjects || 0),
    teamProjects: Number(data?.teamProjects || 0),
  };
};
