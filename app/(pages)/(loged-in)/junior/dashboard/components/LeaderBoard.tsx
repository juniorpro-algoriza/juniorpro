import { MainCard } from "@components";
import React from "react";
import TrophyImage from "@public/images/trophy-icon.png";
import Image from "next/image";
import { UserCard } from "@components/client";
export const LeaderBoard = () => {
  return (
    <MainCard classname="space-y-4">
      <div className="flex items-center gap-3">
        <Image src={TrophyImage.src} alt="Trophy Icon" width={40} height={40} />
        <p className="lg:text-2xl text-xl font-bold">Leader Board</p>
      </div>
      {[...Array(3)].map((item, index) => (
        <MainCard classname="g space-y-1.5" key={index}>
          <UserCard firstName="John" lastName="Doe" level={1} xp={100} />
        </MainCard>
      ))}
    </MainCard>
  );
};
