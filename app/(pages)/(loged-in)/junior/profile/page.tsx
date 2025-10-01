export const dynamic = "force-dynamic";
import { getCareerTypes, getMyProfileData } from "@server";
import { ProfileCard, ProfileHeader } from "./components";

const JuniorProfilePage = async () => {
  const profileData = await getMyProfileData();
  const careerTypesData = await getCareerTypes();

  return (
    <div className="min-h-screen py-3 px-6 space-y-5 bg-stone-50">
      <ProfileHeader />
      <ProfileCard
        profileData={profileData}
        careerTypesData={careerTypesData}
      />
    </div>
  );
};

export default JuniorProfilePage;
