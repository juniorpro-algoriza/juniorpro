import { Button, ModalLink } from "@components";
import { DocumentIcon } from "@icons";
// import profileAvatarImage from "@public/images/profile-avartar.svg";
// import skyBg from "@public/images/sky.svg";
import Image from "next/image";
import { ProfileTabs } from "./ProfileTabs";
import { ProfileData } from "@types";

interface ProfileCardProps {
  profileData: ProfileData;
}

export const ProfileCard = ({ profileData }: ProfileCardProps) => {
  return (
    <>
      <div className="w-full bg-white rounded-[20px] shadow-xl pb-8">
        <div className="relative h-56">
          <Image
            src={profileData.coverImage}
            alt="Profile background"
            fill
            className="object-cover rounded-t-[20px]"
          />
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
            <div className="relative w-28 h-28">
              <Image
                src={profileData.image}
                alt={`${profileData.firstName}'s profile`}
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-32 text-center left-1/2 transform -translate-x-1/2 flex flex-col gap-1 pb-4">
            <h2 className="text-2xl font-medium text-dark-blue mb-1">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-storm-400 text-xl">{profileData.career}</p>
          </div>
        </div>

        <div className="flex justify-between items-start px-4">
          <div className="flex p-6 space-x-8 mb-6">
            <div className="flex flex-col gap-3 items-center">
              <div className="bg-success-50 rounded-lg p-1.5">
                <DocumentIcon fill="#41C980" width="25" height="25" />
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {profileData.freeProjects}
              </div>
              <div className="text-sm text-content-secondary">
                Projects Free
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <div className="bg-light-carrot-orange rounded-lg p-1.5">
                <DocumentIcon fill="#DF972A" width="25" height="25" />
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {profileData.premiumProjects}
              </div>
              <div className="text-sm text-content-secondary">
                Projects Premium
              </div>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <div className="bg-carolina-blue-opacity rounded-lg p-1.5">
                <DocumentIcon fill="#5879DC" width="25" height="25" />
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {profileData.teamProjects}
              </div>
              <div className="text-sm text-content-secondary">
                Team Projects
              </div>
            </div>
          </div>
          <ModalLink name="EditProfile">
            <Button intent="primary" className="mt-6">
              Edit Profile
            </Button>
          </ModalLink>
        </div>
      </div>
      <div className="relative -top-16">
        <ProfileTabs profile={profileData} />
      </div>
    </>
  );
};
