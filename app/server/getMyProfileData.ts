import { ProfileData } from "@types";
import { getData } from "./getData";

export const getMyProfileData = async (): Promise<ProfileData> => {
  const careerName = (id: number) => {
    switch (id) {
      case 1:
        return "Frontend Developer";
      case 2:
        return "Backend Developer";
      case 3:
        return "Ui/Ux Designer";
      default:
        return "";
    }
  };
  const data = await getData({
    url: "api/User/my-profile",
    method: "GET",
  });
  return {
    firstName: String(data?.firstName || ""),
    lastName: String(data?.lastName || ""),
    email: String(data?.email || ""),
    userType: data?.userType,
    image: String(data?.image || "/images/profile-avartar.svg"),
    coverImage: String(data?.coverImage || "/images/sky.svg"),
    location: String(data?.location || ""),
    about: String(data?.about || ""),
    birthDate: String(data?.birthDate || ""),
    phoneNumber: String(data?.phoneNumber || ""),
    career: careerName(data?.careerTypeId),
    profileUrl: String(data?.profileUrl || ""),
    linkedInUrl: String(data?.linkedInUrl || ""),
    freeProjects: Number(data?.freeProjects || 0),
    premiumProjects: Number(data?.premiumProjects || 0),
    teamProjects: Number(data?.teamProjects || 0),
  };
};
