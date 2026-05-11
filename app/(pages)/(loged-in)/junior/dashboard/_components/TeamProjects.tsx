"use client";

import { MainCard } from "@components";
import { Users, ArrowRight } from "lucide-react";

export const TeamProjects = () => {
  return (
    <MainCard classname="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="size-14 rounded-2xl rotate-3 border-b-4 border-dark-blue-main shadow-[0px_8px_0px_0px_#4338CA] bg-[#615FFF] flex items-center justify-center shadow-md shadow-indigo-200">
          <Users className="size-7 text-white -rotate-3" />
        </div>
        <h3 className="font-bold text-lg text-gray-900">Team Projects</h3>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
        <div className="size-14 rounded-2xl bg-dark-blue-main/10 flex items-center justify-center mb-4">
          <Users className="size-7 text-dark-blue-main" />
        </div>
        <h3 className="font-bold text-lg sm:text-base md:text-sm text-gray-900 mb-2">
          Ready to Join a Real Project?
        </h3>
        <p className="text-sm sm:text-xs text-gray-500 max-w-xs mb-6">
          Join team projects to build together, share skills, and create amazing
          work.
        </p>
        <button className="flex items-center gap-2 text-sm sm:text-xs font-bold text-dark-blue-main border border-dark-blue-main/10 shadow-md hover:bg-dark-blue-main/10 px-4 py-3 rounded-2xl transition-colors duration-200 group">
          JOIN A TEAM
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </MainCard>
  );
};
