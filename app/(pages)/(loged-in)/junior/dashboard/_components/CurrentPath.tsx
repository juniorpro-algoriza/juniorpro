"use client";

import { MainCard, Progress } from "@components";
import Image from "next/image";
import CloudImage from "@public/landing-pages/clouds.png";
import { Play, ChevronRight } from "lucide-react";

export const CurrentPath = () => {
  return (
    <MainCard classname="relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 border-indigo-100/50">
      {/* Cloud decoration */}
      <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
        <Image
          src={CloudImage}
          alt=""
          width={180}
          height={120}
          className="w-[180px]"
        />
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase bg-indigo-100 px-2.5 py-1 rounded-full">
            Current Path
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Game Development Level 2
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Master logic and physics to unlock challenges.
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 font-medium">
              4/9 MISSIONS COMPLETED
            </span>
            <span className="font-semibold text-indigo-600">45%</span>
          </div>
          <Progress width={45} />
        </div>

        {/* Current mission */}
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100 shadow-sm">
          <div className="size-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200">
            <Play className="size-4 text-white fill-white ml-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">
              Gravity Loop Logic
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">12 MIN</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                EASY
              </span>
              <span className="text-xs text-amber-500 font-medium">
                🏆 30 XP
              </span>
            </div>
          </div>
          <ChevronRight className="size-5 text-indigo-400" />
        </div>
      </div>
    </MainCard>
  );
};
