import { Button, MainCard } from "@components";
import { UserCard } from "@components/client";
import { ChevronRight } from "lucide-react";
import React from "react";

export const YourJuniors = () => {
  return (
    <MainCard classname="xl:col-span-2 space-y-5 h-fit">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-semibold">
          Your juniors{" "}
          <span className="text-gray-600 rounded-xl bg-gray-50 px-2 py-1 text-sm ml-2">
            2
          </span>
        </h2>
        <p className="flex items-center gap-2 text-sm text-gray-400 font-semibold">
          View All <ChevronRight className="size-4" />
        </p>
      </div>
      <div className="grid xl:grid-cols-2 xl:gap-5 gap-2">
        {[...Array(4)].map((_, index) => (
          <MainCard key={index} classname="space-y-5">
            <UserCard
              firstName={"John"}
              lastName={"Doe"}
              level={5}
              xp={1250}
              userType={2}
              gender="male"
              userDetails={{
                levelProgress: 50,
                points: 1250,
                badges: 2,
                dayStreak: 7,
              }}
            />
            <Button intent="main2" size="mainDefault" className="w-full">
              View Progress
            </Button>
          </MainCard>
        ))}
      </div>
    </MainCard>
  );
};
