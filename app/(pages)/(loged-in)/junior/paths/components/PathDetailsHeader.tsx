import { MainCard } from "@components";
import { Clock, Lightbulb, Trophy } from "lucide-react";
import Image from "next/image";
import React from "react";
import TargetImage from "@public/images/target_with_arrow.png";
import { XpAndPoints } from "@components/client";
export const PathDetailsHeader = () => {
  return (
    <MainCard classname="relative  xl:max-w-4/5">
      <div className="relative z-[2] lg:space-y-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 border border-green-200 bg-green-50 rounded-xl text-13 font-bold capitalize text-green-800">
            beginner
          </div>
          <div className="w-px h-5 bg-gray-200"></div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="size-3" />
            30 min
          </div>
        </div>
        <h2 className="lg:text-2xl text-xl font-bold">HTML Basics</h2>
        <p className="text-gray-600 max-lg:text-sm">
          Learn the fundamentals of HTML tags and structure{" "}
        </p>
        <p className="text-gray-600 max-lg:text-sm">
          In this mission, you will apply your knowledge to build a real-world
          project. Focus on clean code structure and user experience.
        </p>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Lightbulb className="size-4 text-yellow-500" />
            <span className="text-gray-600">Skills:</span>
            <div className="px-3 py-1 border border-gray-200 bg-gray-50 rounded-xl flex items-center gap-1 text-sm">
              HTML
            </div>
            <div className="px-3 py-1 border border-gray-200 bg-gray-50 rounded-xl flex items-center gap-1 text-sm">
              Tags
            </div>
            <div className="px-3 py-1 border border-gray-200 bg-gray-50 rounded-xl flex items-center gap-1 text-sm">
              Structure
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm flex-wrap">
            <Trophy className="size-4 text-green-700" />
            <span className="text-gray-600">Rewards:</span>
            <XpAndPoints xp={25} points={12} />
          </div>
        </div>
      </div>
      <Image
        src={TargetImage.src}
        alt="Target Image"
        width={250}
        height={250}
        className="absolute top-0 right-0 opacity-10 "
      />
    </MainCard>
  );
};
