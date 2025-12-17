import { MainCard, Progress } from "@components";
import { UserCard } from "@components/client";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import Image from "next/image";
import React from "react";
import TargetImage from "@public/images/target_with_arrow.png";

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
      <div className="space-y-2">
        {[...Array(4)].map((_, index) => (
          <MainCard key={index} classname="space-y-4">
            <div className="flex items-center justify-between">
              <UserCard
                firstName={"John"}
                lastName={"Doe"}
                level={5}
                xp={1250}
                userType={2}
                gender="male"
              />
              <div className="p-3 rounded-full bg-gray-50 w-fit text-gray-400">
                <ArrowRight className="size-4" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-13 font-medium">
                  Level Progress
                </p>
                <p className="text-13 font-bold text-purple-main">{65}%</p>
              </div>
              <Progress width={65} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-13 text-gray-800 font-bold px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 flex items-center gap-2 w-fit">
                <Image
                  src={TargetImage.src}
                  alt="target"
                  className="w-5"
                  width={20}
                  height={20}
                />
                38 Missions
              </div>
              <div className="text-13 text-gray-800 font-bold px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 flex items-center gap-2 w-fit">
                <Zap className="size-4 text-yellow-500" />
                350 XP (Week)
              </div>
            </div>
          </MainCard>
        ))}
      </div>
    </MainCard>
  );
};
