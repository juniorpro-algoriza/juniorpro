"use client";

import { MainCard } from "@components";
import { Trophy, Swords, Users, Lock, Target } from "lucide-react";

interface UnlockItem {
  tag: string;
  tagBg: string;
  tagColor: string;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

const unlocks: UnlockItem[] = [
  {
    tag: "ALMOST THERE!",
    tagBg: "bg-[#F3F4F6]",
    tagColor: "text-[#94A3B8]",
    title: "Explorer Badge",
    description: "Finish 2 more missions to earn  your next achivement",
    iconBg: "bg-[#FFFBEB]",
    iconColor: "text-[#F59E0B]",
    icon: <Trophy className="size-5 text-[#D97706]" />,
  },
  {
    tag: "NEW CHALLENGE!",
    tagBg: "bg-[#F3F4F6]",
    tagColor: "text-[#94A3B8]",
    title: "Weekly Challenges",
    description: "Unlocks after 2 more missions and start competing",
    iconBg: "bg-[#FFF1F2]",
    iconColor: "text-[#FB7185]",
    icon: <Swords className="size-5 text-[#E11D48]" />,
  },
  {
    tag: "TEAM ACCESS",
    tagBg: "bg-[#F3F4F6]",
    tagColor: "text-[#94A3B8]",
    title: "Team Projects",
    description: "Complete 2 more missions to Join real team work",
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#818CF8]",
    icon: <Users className="size-5 text-[#4F46E5]" />,
  },
];

export const NextUnlocks = () => {
  return (
    <MainCard classname="h-full relative overflow-hidden ">
      {/* Decorative arc rings – top-right corner */}
      <Target className="absolute top-3 right-8 size-40 text-purple-main/5" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="size-10 rounded-full bg-[#EEF2FF] flex items-center justify-center flex-shrink-0 shadow-[0px_4px_0px_0px_#E0E7FF]">
          <Lock className="size-5 text-[#4F46E5]" strokeWidth={2.5} />
        </div>
        <h3 className="font-bold text-2xl sm:text-xl md:text-lg text-[#1E293B] tracking-tight">
          Your Next Unlocks
        </h3>
      </div>

      {/* Items */}
      <div className="space-y-3 relative">
        {unlocks.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 bg-white border border-[#F1F5F9] rounded-3xl p-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
          >
            {/* Icon with lock badge */}
            <div className="relative flex-shrink-0 ">
              <div
                className={`size-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-sm`}
              >
                {item.icon}
              </div>
              {/* Lock badge */}
              <div className="absolute -bottom-1 shadow-lg -right-1 size-6 rounded-full bg-[#CBD5E1] flex items-center justify-center border-2 border-white">
                <Lock className="size-3 text-white" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              {/* Tag pill */}
              <span
                className={`inline-block text-[10px] sm:text-[8px] font-bold tracking-wider uppercase px-2 rounded-sm ${item.tagBg} ${item.tagColor} mb-1.5`}
              >
                {item.tag}
              </span>
              <p className="font-bold text-sm sm:text-xs text-[#1E293B] leading-tight">
                {item.title}
              </p>
              <p className="text-[10px] sm:text-[8px] text-[#64748B] mt-1 font-bold">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </MainCard>
  );
};
