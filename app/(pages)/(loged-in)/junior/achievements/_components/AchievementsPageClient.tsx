"use client";

import { userAtom } from "@atoms";
import { Header } from "@components/client";
import { useAtom } from "jotai";
import Image from "next/image";
import { useMemo, useState } from "react";
import RocketCloudImage from "@public/images/achievements/rocket_cloud.png";
import {
  useJuniorBadgeAchievements,
  useJuniorChallengeMilestones,
  useJuniorCollaborationMilestones,
  useJuniorLearningPathMilestones,
  useJuniorLevelAchievements,
  useJuniorRecentAchievements,
  useJuniorStreakStats,
} from "../../tanstack";
import type {
  BadgeStatusFilter,
  BadgeType,
  MilestoneTab,
} from "./achievementTypes";
import { BadgeCollection } from "./BadgeCollection";
import { HeroBanner } from "./HeroBanner";
import { LevelCollection } from "./LevelCollection";
import { MilestoneCollection } from "./MilestoneCollection";
import { RecentAchievements } from "./RecentAchievements";
import { Streaks } from "./Streaks";

const DEMO_MODE = true;

export const AchievementsPageClient = () => {
  const [selectedBadgeType, setSelectedBadgeType] = useState<
    BadgeType | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<BadgeStatusFilter>("all");
  const [milestoneTab, setMilestoneTab] = useState<MilestoneTab>("all");

  const [user] = useAtom(userAtom);
  const firstName = user?.firstName || "";

  const recentQuery = useJuniorRecentAchievements();
  const streakQuery = useJuniorStreakStats();
  const badgeQuery = useJuniorBadgeAchievements(undefined);
  const levelQuery = useJuniorLevelAchievements();
  const learningMilestonesQuery = useJuniorLearningPathMilestones();
  const collaborationMilestonesQuery = useJuniorCollaborationMilestones();
  const challengeMilestonesQuery = useJuniorChallengeMilestones();

  const recentAchievements = recentQuery.data ?? [];
  const allBadges = useMemo(
    () => badgeQuery.data?.juniorBadgeAchievements ?? [],
    [badgeQuery.data?.juniorBadgeAchievements]
  );
  const badges = useMemo(() => {
    if (selectedBadgeType === undefined) return allBadges;
    return allBadges.filter((badge) => badge.type === selectedBadgeType);
  }, [allBadges, selectedBadgeType]);
  const levels = levelQuery.data?.juniorLevelAchievements ?? [];
  const streakStats = streakQuery.data?.[0];
  const learningMilestones = useMemo(
    () => learningMilestonesQuery.data?.juniorMilestones ?? [],
    [learningMilestonesQuery.data?.juniorMilestones]
  );
  const collaborationMilestones = useMemo(
    () => collaborationMilestonesQuery.data?.juniorMilestones ?? [],
    [collaborationMilestonesQuery.data?.juniorMilestones]
  );
  const challengeMilestones = useMemo(
    () => challengeMilestonesQuery.data?.juniorMilestones ?? [],
    [challengeMilestonesQuery.data?.juniorMilestones]
  );

  const milestoneData = useMemo(
    () => ({
      learning: learningMilestones,
      collaboration: collaborationMilestones,
      challenge: challengeMilestones,
    }),
    [learningMilestones, collaborationMilestones, challengeMilestones]
  );

  const milestoneLoading =
    learningMilestonesQuery.isLoading ||
    collaborationMilestonesQuery.isLoading ||
    challengeMilestonesQuery.isLoading;

  const tabCounts = {
    totalBadges: badgeQuery.data?.totalBadges ?? allBadges.length,
    learningPathBadges: badgeQuery.data?.learningPathBadges ?? 0,
    streakBadges: badgeQuery.data?.streakBadges ?? 0,
    collaborationsBadges: badgeQuery.data?.collaborationsBadges ?? 0,
    challengeBadges: badgeQuery.data?.challengeBadges ?? 0,
  };

  const milestoneCounts = {
    all:
      learningMilestones.length +
      collaborationMilestones.length +
      challengeMilestones.length,
    learning: learningMilestones.length,
    collaboration: collaborationMilestones.length,
    challenge: challengeMilestones.length,
  };

  const filteredMilestones = useMemo(() => {
    if (milestoneTab === "all") {
      return [
        ...learningMilestones,
        ...collaborationMilestones,
        ...challengeMilestones,
      ];
    }
    return milestoneData[milestoneTab] ?? [];
  }, [
    milestoneTab,
    learningMilestones,
    collaborationMilestones,
    challengeMilestones,
    milestoneData,
  ]);

  return (
    <div className="relative mx-auto w-full max-w-7xl pb-10">
      <div className="relative z-10 space-y-6">
        <Header
          title="My Achievements"
          description="Keep learning, keep growing and keep shining"
        />

        <div className="relative">
          {(DEMO_MODE || recentAchievements.length > 0) && (
            <Image
              src={RocketCloudImage}
              alt=""
              width={320}
              height={180}
              priority
              className="pointer-events-none absolute -top-3 right-0 z-20 h-32 w-auto object-contain sm:-top-24 sm:h-44 md:h-52"
            />
          )}
          <HeroBanner
            demoMode={DEMO_MODE}
            hasAchievements={recentAchievements.length > 0}
            firstName={firstName}
            nameLoading={!firstName}
          />
        </div>

        <RecentAchievements
          achievements={recentAchievements}
          demoMode={DEMO_MODE}
          isLoading={recentQuery.isLoading}
        />

        <LevelCollection
          demoMode={DEMO_MODE}
          levels={levels}
          isLoading={levelQuery.isLoading}
        />

        <BadgeCollection
          demoMode={DEMO_MODE}
          badges={badges}
          isLoading={badgeQuery.isLoading}
          selectedType={selectedBadgeType}
          setSelectedType={setSelectedBadgeType}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          totalBadges={tabCounts.totalBadges}
          completedBadges={badgeQuery.data?.completedBadges ?? 0}
          tabCounts={tabCounts}
        />

        <MilestoneCollection
          demoMode={DEMO_MODE}
          activeTab={milestoneTab}
          setActiveTab={setMilestoneTab}
          milestones={filteredMilestones}
          counts={milestoneCounts}
          isLoading={milestoneLoading}
        />

        <Streaks stats={streakStats} isLoading={streakQuery.isLoading} />
      </div>
    </div>
  );
};
