"use client";

import { MainCard } from "@components";
import { Star, Swords, Users, ChevronRight } from "lucide-react";

interface UnlockItem {
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const unlocks: UnlockItem[] = [
  {
    tag: "ALMOST THERE!",
    tagColor: "text-amber-600",
    title: "Explorer Badge",
    description: "Finish 2 more missions to earn your next achievement.",
    icon: (
      <div className="size-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200">
        <Star className="size-4 text-white fill-white" />
      </div>
    ),
  },
  {
    tag: "NEW CHALLENGE!",
    tagColor: "text-rose-600",
    title: "Weekly Challenges",
    description: "Unlocks after 3 more missions and start competing.",
    icon: (
      <div className="size-8 rounded-lg bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-md shadow-rose-200">
        <Swords className="size-4 text-white" />
      </div>
    ),
  },
  {
    tag: "TEAM ACCESS",
    tagColor: "text-indigo-600",
    title: "Team Projects",
    description: "Complete 2 more missions to join real team work.",
    icon: (
      <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-200">
        <Users className="size-4 text-white" />
      </div>
    ),
  },
];

export const NextUnlocks = () => {
  return (
    <MainCard classname="h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
          <span className="text-xl">✨</span> Your Next Unlocks
        </h3>
      </div>

      <div className="space-y-4">
        {unlocks.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 group cursor-pointer hover:bg-gray-50/80 rounded-xl p-2 -mx-2 transition-colors duration-200"
          >
            {item.icon}
            <div className="flex-1 min-w-0">
              <span
                className={`text-[10px] font-bold tracking-widest uppercase ${item.tagColor}`}
              >
                {item.tag}
              </span>
              <p className="font-semibold text-sm text-gray-900">
                {item.title}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {item.description}
              </p>
            </div>
            <ChevronRight className="size-4 text-gray-300 group-hover:text-gray-500 mt-3 transition-colors" />
          </div>
        ))}
      </div>
    </MainCard>
  );
};
