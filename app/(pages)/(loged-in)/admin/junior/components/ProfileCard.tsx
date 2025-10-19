"use client";
import { Button, ModalLink } from "@components";
import { DocumentIcon } from "@icons";
// import profileAvatarImage from "@public/images/profile-avartar.svg";
// import skyBg from "@public/images/sky.svg";
import Image from "next/image";
import { ProfileData } from "@types";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ProfileTabs } from "../../../junior/profile/components/ProfileTabs";

interface ProfileCardProps {
  profileData: ProfileData;
  careerTypesData: { value: string; label: string }[];
}

export const ProfileCard = ({ profileData }: ProfileCardProps) => {
  const [profile] = useState(profileData);
  const params = useParams();
  const juniorId = params.id as string;

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
  return (
    <>
      <div className="w-full bg-white rounded-[20px] shadow-xl pb-8">
        <div className="relative h-56">
          <Image
            src={profile?.coverImage}
            alt="Profile background"
            fill
            className="object-cover rounded-t-[20px]"
          />
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
            <div className="relative w-28 h-28">
              <Image
                src={profile?.image}
                alt={`${profile?.firstName}'s profile`}
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-32 text-center left-1/2 transform -translate-x-1/2 flex flex-col gap-1 pb-4">
            <h2 className="text-2xl font-medium text-dark-blue mb-1 whitespace-nowrap">
              {profile?.name}
            </h2>
            <p className="text-storm-400 text-xl whitespace-nowrap">
              {careerName(profile?.career)}
            </p>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col justify-between items-center lg:items-start px-4 mt-30 lg:mt-0 mb-6 lg:mb-0">
          <div className="flex p-2 lg:p-6 gap-6 mb-2 lg:mb-6">
            <div className="flex flex-col gap-3 items-center text-center lg:text-start">
              <div className="bg-success-50 rounded-lg p-1.5">
                <DocumentIcon fill="#41C980" width="25" height="25" />
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {profile?.freeProjects}
              </div>
              <div className="text-sm text-content-secondary">
                Projects Free
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center text-center md:text-start">
              <div className="bg-light-carrot-orange rounded-lg p-1.5">
                <DocumentIcon fill="#DF972A" width="25" height="25" />
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {profile?.premiumProjects}
              </div>
              <div className="text-sm text-content-secondary">
                Projects Premium
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center text-center md:text-start">
              <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
                <DocumentIcon fill="#5879DC" width="25" height="25" />
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {profile?.teamProjects}
              </div>
              <div className="text-sm text-content-secondary">
                Team Projects
              </div>
            </div>
          </div>{" "}
          <ModalLink name="EditJuniorsProfile" query={{ id: juniorId }}>
            <Button intent="primary" type="button" className="lg:mt-6">
              Edit Profile
            </Button>
          </ModalLink>
        </div>
      </div>

      <div className="relative -top-16">
        <ProfileTabs profile={profile} />
      </div>
    </>
  );
};
