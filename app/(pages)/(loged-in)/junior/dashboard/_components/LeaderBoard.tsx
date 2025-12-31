import { MainCard } from "@components";
import React from "react";
import { UserCard } from "@components/client";
import { USER_TYPE } from "../../../../../configs/constants";
export const LeaderBoard = () => {
  return (
    <MainCard classname="space-y-4">
      <div className="flex items-center gap-3">
        <p className="lg:text-lg text-base font-bold">Leaderboard</p>
      </div>
      {[...Array(3)].map((_, index) => (
        <MainCard key={index} classname="p-3">
          <UserCard
            firstName="John"
            lastName="Doe"
            level={1}
            xp={100}
            userType={USER_TYPE.Junior}
            gender="male"
          />
        </MainCard>
      ))}
    </MainCard>
  );
};
