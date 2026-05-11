"use client";

import { MainCard } from "@components";
import { Swords, ArrowRight } from "lucide-react";

export const WeeklyChallenges = () => {
  return (
    <MainCard classname="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-14 rounded-2xl rotate-3 bg-[#FF2056] flex items-center justify-center shadow-md shadow-rose-200  border-b-4 border-[#C70036]">
          <Swords className="size-7 text-white -rotate-3" />
        </div>
        <h3 className="font-bold text-lg text-gray-900">Weekly Challenges</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
        <div className="size-14 rounded-2xl bg-rose-50 flex items-center justify-center mb-4">
          <Swords className="size-7 text-rose-500" />
        </div>
        <h3 className="font-bold text-lg sm:text-base md:text-sm text-gray-900 mb-2">
          Ready to Compete?
        </h3>
        <p className="text-sm sm:text-xs text-gray-500 max-w-xs mb-6">
          Join weekly challenges to compete with others and earn bonus XP
          rewards.
        </p>
        <button className="flex items-center gap-2 text-sm sm:text-xs font-bold text-rose-600 border border-rose-100 shadow-md hover:bg-rose-50 px-4 py-3 rounded-2xl transition-colors duration-200 group">
          BROWSE CHALLENGE
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </MainCard>
  );
};
