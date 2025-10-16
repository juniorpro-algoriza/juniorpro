export const dynamic = "force-dynamic";

import { getCareerTypes, getJuniorData } from "@server";
import { ProfileCard } from "../../../junior/profile/components";

export default async function JuniorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profileData = await getJuniorData(Number(id));
  const careerTypesData = await getCareerTypes();

  return (
    <div className="min-h-screen py-3 px-6 space-y-5 bg-stone-50">
      <ProfileCard
        profileData={profileData}
        careerTypesData={careerTypesData}
      />
    </div>
  );
}
