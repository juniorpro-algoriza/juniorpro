"use client";

import { Button, Select, Tabs } from "@components";
import { cx } from "@lib";
import {
  Check,
  CircleDollarSign,
  Clock3,
  ClipboardList,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import LetsStartJourneyImage from "@public/images/achievements/lets_start_your_learning_journey.png";
import type { Milestone, MilestoneTab } from "./achievementTypes";
import { milestoneTabs, formatDate } from "./achievementData";
import { EmptyState, LoadingRows, Section } from "./AchievementShared";
import { PATH_ICON } from "../../../../../configs";

type MilestoneStatusFilter = "all" | "completed";

const milestoneStatusOptions: {
  label: string;
  value: MilestoneStatusFilter;
}[] = [
  { label: "Status: All", value: "all" },
  { label: "Status: Completed", value: "completed" },
];

const fakeMilestones: Milestone[] = [
  {
    id: 1,
    type: 0,
    title: "Artificial Intelligence Path",
    description: "Submitted and completed all projects",
    xpEarned: 1200,
    missionsDone: 10,
    hoursLearned: 120,
    completedDate: "2026-04-28T09:00:00Z",
  },
  {
    id: 2,
    type: 1,
    title: "Developing Ecommerce Website",
    description: "Delivered a complete team collaboration project",
    xpEarned: 1800,
    rank: 2,
    prizeEarned: 200,
    completedDate: "2026-04-22T11:30:00Z",
  },
  {
    id: 3,
    type: 2,
    title: "Challenge Champion",
    description: "Completed a competitive challenge milestone",
    xpEarned: 950,
    rank: 3,
    prizeEarned: 150,
    completedDate: "2026-04-16T14:45:00Z",
  },
];

const getMilestonesByTab = (
  items: Milestone[],
  tab: MilestoneTab
): Milestone[] => {
  if (tab === "learning") {
    return items.filter((milestone) => milestone.type === 0);
  }
  if (tab === "collaboration") {
    return items.filter((milestone) => milestone.type === 1);
  }
  return items.filter((milestone) => milestone.type === 2);
};

export const MilestoneCollection = ({
  demoMode = false,
  activeTab,
  setActiveTab,
  milestones,
  counts,
  isLoading,
}: {
  demoMode?: boolean;
  activeTab: MilestoneTab;
  setActiveTab: (tab: MilestoneTab) => void;
  milestones: Milestone[];
  counts: Record<MilestoneTab, number>;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const [statusFilter, setStatusFilter] =
    useState<MilestoneStatusFilter>("all");
  const displayMilestones = useMemo(
    () =>
      demoMode ? getMilestonesByTab(fakeMilestones, activeTab) : milestones,
    [activeTab, demoMode, milestones]
  );
  const displayCounts = useMemo(() => {
    if (!demoMode) return counts;

    return {
      learning: getMilestonesByTab(fakeMilestones, "learning").length,
      collaboration: getMilestonesByTab(fakeMilestones, "collaboration").length,
      challenge: getMilestonesByTab(fakeMilestones, "challenge").length,
    };
  }, [counts, demoMode]);
  const selectedMilestoneTabIndex = Math.max(
    0,
    milestoneTabs.findIndex((tab) => tab.id === activeTab)
  );
  const milestoneTabItems = milestoneTabs.map((tab) => {
    const Icon = tab.icon;

    return {
      name: (
        <div className="flex items-center gap-2">
          <Icon className="size-4" />
          <span>
            {tab.label} ({displayCounts[tab.id]})
          </span>
        </div>
      ),
      content: null,
    };
  });

  return (
    <Section title="Learning Milestone Collection">
      <div className="mb-5">
        <Tabs
          tabs={milestoneTabItems}
          selectedIndex={selectedMilestoneTabIndex}
          onTabChange={(index) =>
            setActiveTab(milestoneTabs[index]?.id ?? "learning")
          }
          tabPanelsClassName="hidden"
        >
          <div className="w-full max-w-[210px] max-lg:max-w-full">
            <Select
              value={statusFilter}
              onChange={(value) =>
                setStatusFilter(value as MilestoneStatusFilter)
              }
              options={milestoneStatusOptions}
            />
          </div>
        </Tabs>
      </div>

      {isLoading ? (
        <LoadingRows rows={3} />
      ) : displayMilestones.length === 0 ? (
        <EmptyState
          image={LetsStartJourneyImage}
          title="Let's start your learning journey"
          description="Begin your first learning path, build your skills, and track your progress along the way."
          action={
            <Button
              intent="main2"
              size="mainDefault"
              className="mt-4"
              onClick={() => router.push("/junior/paths")}
            >
              Start Learning
            </Button>
          }
        />
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
          {displayMilestones.map((milestone, index) => {
            const isLearning =
              milestone.type === 0 ||
              milestone.title?.toLowerCase().includes("path") ||
              milestone.title?.toLowerCase().includes("intelligence");
            const isCollab =
              milestone.type === 1 ||
              milestone.title?.toLowerCase().includes("ecommerce") ||
              milestone.title?.toLowerCase().includes("website");
            const typeLabel = isLearning
              ? "LEARNING PATH"
              : isCollab
                ? "COLLABORATION"
                : "CHALLENGE";

            const typeClass = isLearning
              ? "bg-emerald-50 text-emerald-600 border-emerald-300"
              : isCollab
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "bg-amber-50 text-amber-600 border-amber-200";
            const imageSrc = isLearning
              ? PATH_ICON["5"]
              : isCollab
                ? PATH_ICON["8"]
                : PATH_ICON["3"];
            const secondStatLabel = isLearning ? "Missions Done" : "Rank";
            const secondStatValue = isLearning
              ? `${milestone.missionsDone ?? 10}`
              : `#${milestone.rank ?? 2}`;
            const ThirdStatIcon = isLearning ? Clock3 : CircleDollarSign;
            const thirdStatLabel = isLearning
              ? "Hours Learned"
              : "Prize Earned";
            const thirdStatValue = isLearning
              ? `${milestone.hoursLearned ?? 120} Hour`
              : `${milestone.prizeEarned ?? 200} SAR`;

            return (
              <div
                key={milestone.id ?? index}
                className="relative flex min-h-[310px] w-[590px] max-w-[calc(100vw-3rem)] shrink-0 flex-col rounded-[18px] border-2 border-[#E9EDFF] bg-white px-6 py-5 transition duration-200 hover:shadow-[0_12px_28px_rgba(18,24,40,0.05)]"
              >
                <div className="mb-7">
                  <span
                    className={cx(
                      "inline-flex rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase leading-none tracking-wide",
                      typeClass
                    )}
                  >
                    {typeLabel}
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <div className="flex size-[72px] shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF80] p-1.5">
                    <Image
                      src={imageSrc}
                      alt={milestone.title || typeLabel}
                      width={60}
                      height={60}
                      className="h-[60px] w-[60px] object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-lg font-bold leading-tight text-[#08046F]">
                      {milestone.title ||
                        (isLearning
                          ? "Artificial Intelligence Path"
                          : "Developing Ecommerce Website")}
                    </p>
                    <p className="mt-2.5 text-sm font-semibold leading-tight text-[#637590]">
                      {milestone.description ||
                        "Submitted and completed all projects"}
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-0">
                  <div className="sm:pr-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#637590]">
                      <Zap className="size-4 fill-[#6C63FF]/20 text-[#6C63FF]" />
                      <span>XP Earned</span>
                    </div>
                    <p className="mt-2.5 text-lg font-bold text-[#08046F]">
                      +{milestone.xpEarned ?? (isLearning ? 1200 : 1800)} XP
                    </p>
                  </div>

                  <div className="border-[#E8ECFF] sm:border-l sm:px-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#637590]">
                      <ClipboardList className="size-4 fill-[#AAA7FF]/30 text-[#AAA7FF]" />
                      <span>{secondStatLabel}</span>
                    </div>
                    <p className="mt-2.5 text-lg font-bold text-[#08046F]">
                      {secondStatValue}
                    </p>
                  </div>

                  <div className="border-[#E8ECFF] sm:border-l sm:pl-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#637590]">
                      <ThirdStatIcon className="size-4 fill-[#AAA7FF]/30 text-[#AAA7FF]" />
                      <span>{thirdStatLabel}</span>
                    </div>
                    <p className="mt-2.5 text-lg font-bold text-[#08046F]">
                      {thirdStatValue}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-[#637590]">
                  <div className="flex size-4.5 items-center justify-center rounded-full bg-[#34A853] text-white">
                    <Check className="size-3 stroke-[3.5]" />
                  </div>
                  <span>Completed</span>
                  <span className="text-[#8CA0BD]">
                    {milestone.completedDate
                      ? formatDate(milestone.completedDate).split(" - ")[0]
                      : "April 28, 2026"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
};
