"use client";

import { Select, Tabs } from "@components";
import { cx } from "@lib";
import { Check, Hourglass, Lock } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import DaysStreakImage from "@public/images/achievements/Days_Streak.png";
import NoBadgesImage from "@public/images/achievements/No_badges_earned_yet.png";
import PathExplorerImage from "@public/images/achievements/9a21a79c-4c2b-4637-936d-ebca6d647df7 2.png";
import type {
  BadgeAchievement,
  BadgeStatusFilter,
  BadgeType,
} from "./achievementTypes";
import {
  badgeMeta,
  badgeTabs,
  COMPLETED_STATUS,
  filterBadgesByStatus,
  formatDate,
  getBadgeDescription,
  getBadgeTitle,
  getImageSrc,
  getProgress,
  IN_PROGRESS_STATUS,
} from "./achievementData";
import {
  EmptyState,
  LoadingRows,
  ProgressPill,
  Section,
} from "./AchievementShared";

const badgeStatusOptions: { label: string; value: BadgeStatusFilter }[] = [
  { label: "Status: All", value: "all" },
  { label: "Status: Completed", value: "completed" },
  { label: "Status: In progress", value: "in-progress" },
  { label: "Status: Locked", value: "locked" },
];

const fakeBadges: BadgeAchievement[] = [
  {
    id: 1,
    titleEn: "First Step",
    titleAr: "First Step",
    type: 1,
    status: COMPLETED_STATUS,
    imageUrl: DaysStreakImage.src,
    completedCount: 1,
    totalCount: 1,
    achievedDate: "2026-04-01T09:15:00Z",
  } as BadgeAchievement,
  {
    id: 2,
    titleEn: "Path Explorer",
    titleAr: "Path Explorer",
    type: 1,
    status: IN_PROGRESS_STATUS,
    imageUrl: PathExplorerImage.src,
    completedCount: 4,
    totalCount: 9,
    achievedDate: null,
  } as unknown as BadgeAchievement,
  {
    id: 3,
    titleEn: "Path Explorer",
    titleAr: "Path Explorer",
    type: 1,
    status: 1,
    imageUrl: PathExplorerImage.src,
    completedCount: 2,
    totalCount: 2,
    achievedDate: null,
  } as unknown as BadgeAchievement,
  {
    id: 4,
    titleEn: "Path Explorer",
    titleAr: "Path Explorer",
    type: 1,
    status: 1,
    imageUrl: PathExplorerImage.src,
    completedCount: 2,
    totalCount: 2,
    achievedDate: null,
  } as unknown as BadgeAchievement,
  {
    id: 5,
    titleEn: "Challenge Ace",
    titleAr: "Challenge Ace",
    type: 2,
    status: COMPLETED_STATUS,
    imageUrl: null,
    completedCount: 3,
    totalCount: 3,
    achievedDate: "2026-04-05T10:20:00Z",
  } as unknown as BadgeAchievement,
  {
    id: 6,
    titleEn: "Team Builder",
    titleAr: "Team Builder",
    type: 3,
    status: IN_PROGRESS_STATUS,
    imageUrl: null,
    completedCount: 2,
    totalCount: 5,
    achievedDate: null,
  } as unknown as BadgeAchievement,
  {
    id: 7,
    titleEn: "Streak Keeper",
    titleAr: "Streak Keeper",
    type: 4,
    status: COMPLETED_STATUS,
    imageUrl: DaysStreakImage.src,
    completedCount: 7,
    totalCount: 7,
    achievedDate: "2026-04-08T08:00:00Z",
  } as unknown as BadgeAchievement,
  {
    id: 8,
    titleEn: "Mission Starter",
    titleAr: "Mission Starter",
    type: 1,
    status: COMPLETED_STATUS,
    imageUrl: PathExplorerImage.src,
    completedCount: 2,
    totalCount: 2,
    achievedDate: "2026-04-11T13:45:00Z",
  } as unknown as BadgeAchievement,
  {
    id: 9,
    titleEn: "Collaboration Pro",
    titleAr: "Collaboration Pro",
    type: 3,
    status: 1,
    imageUrl: null,
    completedCount: 0,
    totalCount: 4,
    achievedDate: null,
  } as unknown as BadgeAchievement,
  {
    id: 10,
    titleEn: "Challenge Sprinter",
    titleAr: "Challenge Sprinter",
    type: 2,
    status: IN_PROGRESS_STATUS,
    imageUrl: null,
    completedCount: 1,
    totalCount: 3,
    achievedDate: null,
  } as unknown as BadgeAchievement,
  {
    id: 11,
    titleEn: "Thirty Day Streak",
    titleAr: "Thirty Day Streak",
    type: 4,
    status: 1,
    imageUrl: DaysStreakImage.src,
    completedCount: 7,
    totalCount: 30,
    achievedDate: null,
  } as unknown as BadgeAchievement,
  {
    id: 12,
    titleEn: "Master Explorer",
    titleAr: "Master Explorer",
    type: 1,
    status: IN_PROGRESS_STATUS,
    imageUrl: PathExplorerImage.src,
    completedCount: 6,
    totalCount: 10,
    achievedDate: null,
  } as unknown as BadgeAchievement,
];

export const BadgeCollection = ({
  demoMode = false,
  badges,
  isLoading,
  selectedType,
  setSelectedType,
  statusFilter,
  setStatusFilter,
  totalBadges,
  completedBadges,
  tabCounts,
}: {
  demoMode?: boolean;
  badges: BadgeAchievement[];
  isLoading: boolean;
  selectedType?: BadgeType;
  setSelectedType: (type?: BadgeType) => void;
  statusFilter: BadgeStatusFilter;
  setStatusFilter: (status: BadgeStatusFilter) => void;
  totalBadges: number;
  completedBadges: number;
  tabCounts: Record<string, number>;
}) => {
  const displayBadges = demoMode ? fakeBadges : badges;
  const filteredBadges = useMemo(
    () => filterBadgesByStatus(displayBadges, statusFilter),
    [displayBadges, statusFilter]
  );
  const displayTotalBadges =
    demoMode && badges.length === 0 ? displayBadges.length : totalBadges;
  const displayCompletedBadges =
    demoMode && badges.length === 0
      ? displayBadges.filter((badge) => badge.status === COMPLETED_STATUS)
          .length
      : completedBadges;
  const selectedBadgeTabIndex = Math.max(
    0,
    badgeTabs.findIndex((tab) => tab.id === selectedType)
  );
  const badgeTabItems = badgeTabs.map((tab) => {
    const count = tab.countKey ? (tabCounts[tab.countKey] ?? 0) : 0;

    return {
      name: `${tab.label} (${count})`,
      content: null,
    };
  });

  return (
    <Section
      title="Badge Collection"
      end={
        <span className="text-sm font-semibold text-gray-500">
          <span className="text-dark-blue-main">{displayCompletedBadges}</span>/
          {displayTotalBadges} badges earned
        </span>
      }
    >
      <div className="mb-5">
        <Tabs
          tabs={badgeTabItems}
          selectedIndex={selectedBadgeTabIndex}
          onTabChange={(index) => setSelectedType(badgeTabs[index]?.id)}
          tabPanelsClassName="hidden"
        >
          <div className="w-full max-w-[210px] max-lg:max-w-full">
            <Select
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as BadgeStatusFilter)}
              options={badgeStatusOptions}
            />
          </div>
        </Tabs>
      </div>

      {isLoading ? (
        <LoadingRows rows={4} />
      ) : filteredBadges.length === 0 ? (
        <EmptyState
          image={NoBadgesImage}
          title="No badges earned yet"
          description="As you complete learning paths and challenges, your badges will appear here."
        />
      ) : (
        <div className="flex gap-7 overflow-x-auto pb-2 scrollbar-hide">
          {filteredBadges.map((badge, index) => {
            const meta = badgeMeta[badge.type ?? 5];
            const Icon = meta.icon;
            const completed = badge.status === COMPLETED_STATUS;
            const inProgress = badge.status === IN_PROGRESS_STATUS;
            const progress = getProgress(
              badge.completedCount,
              badge.totalCount
            );
            const locked = !completed && !inProgress;

            return (
              <div
                key={badge.id ?? index}
                className={cx(
                  "relative flex min-h-[220px] w-[192px] shrink-0 flex-col items-center rounded-2xl border border-violet-light bg-[#FBFBFE] px-5 py-4 text-center transition duration-200",
                  "hover:shadow-[0_10px_24px_rgba(18,24,40,0.06)]"
                )}
              >
                <div className="relative flex h-24 items-center justify-center">
                  {badge.imageUrl ? (
                    <Image
                      src={getImageSrc(badge.imageUrl)}
                      alt={getBadgeTitle(badge)}
                      width={88}
                      height={88}
                      className={cx(
                        "h-22 w-22 object-contain transition duration-200",
                        locked && "grayscale opacity-55"
                      )}
                      unoptimized
                    />
                  ) : (
                    <div
                      className={cx(
                        "flex size-20 items-center justify-center rounded-2xl transition duration-200",
                        locked ? "bg-gray-100 text-gray-400" : meta.bg
                      )}
                    >
                      <Icon
                        className={cx(
                          "size-9",
                          locked ? "text-gray-400" : meta.tone
                        )}
                      />
                    </div>
                  )}

                  {completed && (
                    <div className="absolute bottom-0 right-1 flex size-9 items-center justify-center rounded-full bg-[#34A853] text-white shadow-sm">
                      <Check className="size-6 stroke-[3]" />
                    </div>
                  )}

                  {inProgress && (
                    <div className="absolute bottom-0 right-1 flex size-9 items-center justify-center rounded-full border border-amber-300 bg-white text-amber-500 shadow-sm">
                      <Hourglass className="size-5 stroke-[2.4]" />
                    </div>
                  )}

                  {locked && (
                    <div className="absolute bottom-0 right-1 flex size-9 items-center justify-center rounded-full border border-[#8CA0BD] bg-white text-[#4E6078] shadow-sm">
                      <Lock className="size-5 stroke-[#4E6078]" />
                    </div>
                  )}
                </div>

                <div className="mt-4 w-full">
                  <p
                    className={cx(
                      "truncate text-lg font-bold leading-tight",
                      locked ? "text-[#4E6078]" : "text-maastricht-blue"
                    )}
                  >
                    {getBadgeTitle(badge)}
                  </p>
                  <p className="mt-3 line-clamp-2 min-h-9 text-sm font-medium leading-tight text-[#637590]">
                    {getBadgeDescription(badge)}
                  </p>
                </div>

                <div className="mt-auto w-full pt-4">
                  {completed && (
                    <p className="text-sm font-medium text-[#8CA0BD]">
                      {badge.achievedDate
                        ? formatDate(badge.achievedDate).split(" - ")[0]
                        : "Apr 1, 2026"}
                    </p>
                  )}

                  {inProgress && (
                    <div>
                      <p className="mb-2 text-sm font-bold text-[#4E6078]">
                        {badge.completedCount ?? 0}/{badge.totalCount ?? 0}{" "}
                        paths
                      </p>
                      <ProgressPill progress={progress} />
                    </div>
                  )}

                  {locked && (
                    <p className="text-sm font-medium text-[#8CA0BD]">
                      Level{" "}
                      {badge.type === 1
                        ? 4
                        : badge.type === 2
                          ? 3
                          : badge.type === 3
                            ? 5
                            : 4}{" "}
                      Required
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
};
