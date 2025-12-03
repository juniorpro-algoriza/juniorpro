import Image from "next/image";
import React from "react";
import MaleAvatar from "@public/images/male-avatar.png";
import FemaleAvatar from "@public/images/female-avatar.png";
import SuperAdminAvatar from "@public/images/super-admin-avatar.png";

export const UserCard = ({
  image,
  firstName,
  lastName,
  level,
  xp,
  gender = "female",
  userType,
}: {
  image?: string | null;
  firstName: string;
  lastName: string;
  level: number;
  xp: number;
  gender?: "male" | "female";
  userType?: number;
}) => {
  return (
    <div className="flex items-center space-x-3 rounded-2xl transition-all duration-200">
      <div className="p-2 rounded-full bg-gray-50">
        <Image
          unoptimized
          className=" w-16 h-16 flex-shrink-0 transition-transform duration-200 hover:scale-105"
          src={
            image
              ? image
              : userType === 1
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
  );
};
