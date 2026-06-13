"use client";
import React, { Suspense, useMemo } from "react";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  Jumbotron,
  ProjectCard,
  SearchInput,
  Skeleton,
  Tabs,
  ModalLink,
} from "@components";
import { PATH_ICON } from "../../../../configs/constants";
import { useJuniorChallenges, useJuniorDashboardStats } from "../tanstack";
import { useSearchParams } from "next/navigation";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const JuniorChallenges = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("query") || "";

  const { data: challenges, isLoading } = useJuniorChallenges({
    searchText: searchText || undefined,
  });

  const { data: stats } = useJuniorDashboardStats();
  const completedMissions = stats?.missions ?? 0;

  const allChallenges = useMemo(() => challenges || [], [challenges]);

  const activeChallenges = useMemo(
    () => allChallenges.filter((c) => c.isJoined),
    [allChallenges]
  );

  const renderCard = (challenge: (typeof allChallenges)[0], idx: number) => {
    const isJoined = challenge.isJoined;
    const isMissionsLocked = !isJoined && completedMissions < 5;
    const isLocked =
      (challenge.accessCostType !== 1 && !isJoined) || isMissionsLocked;
    const isJoinAction = !isJoined && !isLocked;

    const buttonText = isLocked
      ? "Challenge Locked"
      : isJoinAction
        ? "Join Challenge"
        : "View Details";

    const iconKey = (challenge.icon?.toString() ||
      "1") as keyof typeof PATH_ICON;

    // Extract prize data if available (API may return extra fields)
    const extra = challenge as Record<string, unknown>;
    const prizeDistributions =
      (extra.prizeDistributions as Array<Record<string, unknown>>) || [];

    const ORDINALS = [
      "1st Place",
      "2nd Place",
      "3rd Place",
      "4th Place",
      "5th Place",
      "6th Place",
    ];

    const prizes = prizeDistributions.slice(0, 3).map((p, i) => ({
      place: (p.titleEn as string) || ORDINALS[i] || `${i + 1}th Place`,
      amount: `${(p.points as number) || 0} SAR`,
    }));

    const CardContent = (
      <ProjectCard
        title={challenge.nameEn || challenge.nameAr || "Untitled Challenge"}
        description={challenge.description || ""}
        membersCurrent={challenge.participantCount || 0}
        membersTotal={0}
        dateEnd={formatDate(challenge.endDate)}
        iconSrc={PATH_ICON[iconKey] || PATH_ICON["1"]}
        type="challenge"
        prizes={prizes.length > 0 ? prizes : undefined}
        buttonText={buttonText}
        buttonIntent={isJoinAction ? "main2" : "main"}
        buttonIcon={isLocked ? undefined : <ArrowRight size={20} />}
        isLocked={isLocked}
        lockLabel="Challenge Locked"
        lockSubLabel={isMissionsLocked ? "5 Missions Required" : undefined}
      />
    );

    if (isLocked) {
      return (
        <div
          key={challenge.id || idx}
          className="block h-full cursor-not-allowed"
        >
          {CardContent}
        </div>
      );
    }

    if (isJoinAction) {
      return (
        <ModalLink
          key={challenge.id || idx}
          name="JoinChallenge"
          query={{ id: challenge.id || 0 }}
          className="block h-full transition-transform hover:scale-[1.01]"
        >
          {CardContent}
        </ModalLink>
      );
    }

    return (
      <Link
        key={challenge.id || idx}
        href={`/junior/challenges/${challenge.id}`}
        className="block h-full transition-transform hover:scale-[1.01]"
      >
        {CardContent}
      </Link>
    );
  };

  const renderGrid = (items: typeof allChallenges) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="py-10 text-center text-gray-500 font-medium">
          No challenges found.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((challenge, idx) => renderCard(challenge, idx))}
      </div>
    );
  };

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/junior/dashboard" },
          { title: "Challenges", href: "/junior/challenges" },
        ]}
      />

      <Jumbotron
        title="Coding Challenges"
        description="Compete in coding challenges, showcase your skills, and win exciting prizes."
        imageClassName="bg-[linear-gradient(135deg,rgba(198,210,255,0.8)0%,rgba(238,242,255,0.8)100%)]"
        imageSrc="/images/handOnHand.svg"
      />

      <Suspense
        fallback={<div className="p-10 text-center">Loading Challenges...</div>}
      >
        <Tabs
          tabs={[
            {
              name: `All Challenges (${allChallenges.length})`,
              content: renderGrid(allChallenges),
            },
            {
              name: `Active (${activeChallenges.length})`,
              content: renderGrid(activeChallenges),
            },
          ]}
        >
          <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row max-sm:w-full">
            <Suspense fallback={<div className="w-10 h-10" />}>
              <SearchInput
                placeholder="search challenge..."
                className="min-w-[200px]"
              />
            </Suspense>
          </div>
        </Tabs>
      </Suspense>
    </>
  );
};

const JuniorChallengesPage = () => (
  <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
    <JuniorChallenges />
  </Suspense>
);

export default JuniorChallengesPage;
