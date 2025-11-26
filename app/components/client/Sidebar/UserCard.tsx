import Image from 'next/image'
import React from 'react'
import ContributorAvatar from "@public/images/contributor-avatar.png";

export const UserCard = ({
    image,
    firstName,
    lastName,
    level,
    xp,
}: {
    image?: string;
    firstName: string;
    lastName: string;
    level: number;
    xp: number;
}) => {
  return (
    <div className="flex items-center space-x-3 rounded-2xl transition-all duration-200">
        <Image
          unoptimized
          className=" w-12 h-12 flex-shrink-0 transition-transform duration-200 hover:scale-105"
          src={image ? image : ContributorAvatar}
          alt="Contributor Avatar"
          width={100}
          height={100}
        />
        <div className="min-w-0 flex-1 space-y-1">
          <p className="font-medium text-maastricht-blue truncate">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-storm-400 truncate">Level {level} - {xp}XP</p>
        </div>
      </div>
  )
}
