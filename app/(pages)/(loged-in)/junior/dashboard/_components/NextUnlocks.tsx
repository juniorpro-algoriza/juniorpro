"use client";

import { MainCard } from "@components";
import { Lock, Target, Sparkles, Trophy, Swords, Users } from "lucide-react";

interface UnlockItem {
  tag: string;
  tagBg: string;
  tagColor: string;
  title: string;
  description: string;
  iconBg: string;
  icon: React.ReactNode;
}

const unlocks: UnlockItem[] = [
  {
    tag: "ALMOST THERE!",
    tagBg: "bg-[#F3F4F6]",
    tagColor: "text-[#94A3B8]",
    title: "Explorer Badge",
    description: "Finish 2 more missions to earn your next achievement",
    iconBg: "bg-[#FFFBEB]",
    icon: <Trophy className="size-5 text-[#D97706]" />,
  },
  {
    tag: "NEW CHALLENGE!",
    tagBg: "bg-[#F3F4F6]",
    tagColor: "text-[#94A3B8]",
    title: "Weekly Challenges",
    description: "Unlocks after 2 more missions and start competing",
    iconBg: "bg-[#FFF1F2]",
    icon: <Swords className="size-5 text-[#E11D48]" />,
  },
  {
    tag: "TEAM ACCESS",
    tagBg: "bg-[#F3F4F6]",
    tagColor: "text-[#94A3B8]",
    title: "Team Projects",
    description: "Complete 2 more missions to join real team work",
    iconBg: "bg-[#EEF2FF]",
    icon: <Users className="size-5 text-[#4F46E5]" />,
  },
];

export const NextUnlocks = () => {
  const hasNextUnlocks = false;

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

      {hasNextUnlocks ? (
        <div className="relative space-y-3">
          {unlocks.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 rounded-3xl border border-[#F1F5F9] bg-white p-3 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]"
            >
              <div className="relative flex-shrink-0">
                <div
                  className={`size-11 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-sm`}
                >
                  {item.icon}
                </div>
                <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-white bg-[#CBD5E1] shadow-lg">
                  <Lock className="size-3 text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span
                  className={`mb-1.5 inline-block rounded-sm px-2 text-[10px] font-bold uppercase tracking-wider sm:text-[8px] ${item.tagBg} ${item.tagColor}`}
                >
                  {item.tag}
                </span>
                <p className="text-sm font-bold leading-tight text-[#1E293B] sm:text-xs">
                  {item.title}
                </p>
                <p className="mt-1 text-[10px] font-bold text-[#64748B] sm:text-[8px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative flex min-h-56 flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-[#E2E8F0] bg-white/70 p-6 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#EEF2FF] shadow-[0px_4px_0px_0px_#E0E7FF]">
            <Sparkles className="size-7 text-[#4F46E5]" />
          </div>
          <p className="text-xl font-extrabold text-[#1E293B] sm:text-lg">
            Comming soon
          </p>
        </div>
      )}
    </MainCard>
  );
};
