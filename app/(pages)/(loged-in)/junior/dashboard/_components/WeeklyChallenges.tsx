"use client";

import { MainCard } from "@components";
import { Swords, Lock, ArrowRight } from "lucide-react";

export const WeeklyChallenges = () => {
  return (
    <MainCard classname="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-md shadow-rose-200">
          <Swords className="size-5 text-white" />
        </div>
        <h3 className="font-bold text-lg text-gray-900">Weekly Challenges</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center py-6 space-y-3">
        <div className="size-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-2">
          <Lock className="size-6 text-gray-400" />
        </div>
        <div>
          <p className="font-semibold text-gray-700 mb-1">Ready to Compete?</p>
          <p className="text-sm text-gray-500 max-w-[240px]">
            Join weekly challenges to compete with others and earn bonus XP
            rewards.
          </p>
        </div>
      </div>

      <button className="w-fit mx-auto flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-5 py-2.5 rounded-full transition-colors duration-200 group">
        BROWSE CHALLENGE
        <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </MainCard>
  );
};
