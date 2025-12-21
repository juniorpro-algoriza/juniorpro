import Image from "next/image";
import React from "react";
import MaleAvatar from "@public/images/male-avatar.png";
import FemaleAvatar from "@public/images/female-avatar.png";
import SuperAdminAvatar from "@public/images/super-admin-avatar.png";
import Fire from "@public/images/fire-icon.png";
import Diamond2 from "@public/images/diamond-icon-2.png";
import badge from "@public/images/badge-icon.png";
import { Progress } from "@components";
import { TrendingUp } from "lucide-react";
export const UserCard = ({
  image,
  firstName,
  lastName,
  level,
  xp,
  gender = "female",
  userType,
  userDetails,
}: {
  image?: string | null;
  firstName: string;
  lastName: string;
  level: number;
  xp: number;
  gender?: "male" | "female";
  userType?: number;
  userDetails?: {
    levelProgress: number;
    points: number;
    badges: number;
    dayStreak: number;
  };
}) => {
  return (
    <div className=" space-y-4">
      <div className="flex items-center space-x-3 rounded-2xl transition-all duration-200">
        <div className="p-2 rounded-full bg-gray-50">
          <Image
            unoptimized
            className=" w-16 h-16 flex-shrink-0 transition-transform duration-200 hover:scale-105"
            src={
              image
                ? image
                : userType === 1 || userType === 3
                  ? SuperAdminAvatar
                  : gender === "male"
                    ? MaleAvatar.src
                    : FemaleAvatar.src
            }
            alt="Contributor Avatar"
            width={100}
            height={100}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="font-medium text-maastricht-blue truncate">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-storm-400 truncate">
            Level {level} - {xp}XP
          </p>
        </div>
      </div>
      {userDetails && (
        <>
          <div className="p-3 space-y-2.5 rounded-2xl [background:linear-gradient(135deg,#EEF2FF_0%,#FAF5FF_100%)]">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-13 font-medium">
                Level Progress
              </p>
              <p className="text-13 font-bold text-purple-main">{userDetails.levelProgress}%</p>
            </div>
            <Progress width={userDetails.levelProgress} />
            <div className="flex items-center space-x-2">
              <TrendingUp className="size-3 text-blue-main" />
              <p className="text-13 font-medium text-gray-600">
                250 XP to Level 6
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 ">
            <div className="p-3 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-1">
              <Image src={Fire} alt="fire" width={30} height={30} />
              <p className="font-bold">{userDetails.dayStreak}</p>
              <p className="text-10 text-gray-600 font-medium text-center">
                Day Streak
              </p>
            </div>
            <div className="p-3 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-1">
              <Image src={Diamond2} alt="diamond" width={30} height={30} />
              <p className="font-bold">{userDetails.points}</p>
              <p className="text-10 text-gray-600 font-medium text-center">
                Points
              </p>
            </div>
            <div className="p-3 rounded-3xl border border-gray-100 flex flex-col justify-center items-center gap-1">
              <Image src={badge} alt="badge" width={30} height={30} />
              <p className="font-bold">{userDetails.badges}</p>
              <p className="text-10 text-gray-600 font-medium text-center">
                Badges
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
