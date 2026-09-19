"use client";
import React, { Suspense, useMemo } from "react";
import Link from "next/link";

import { ArrowRight, Users2 } from "lucide-react";
import {
  Breadcrumb,
  EmptyData,
  Jumbotron,
  ProjectCard,
  SearchInput,
  Skeleton,
  Tabs,
  ModalLink,
} from "@components";
import {
  PATH_ICON,
  COLLABORATION_STATUS,
  JUNIOR_STATUS,
} from "../../../../configs/constants";
import { useJuniorCollaborations, useJuniorDashboardStats } from "../tanstack";
import { OnboardingTourTrigger } from "../dashboard/_components";
import { useSearchParams } from "next/navigation";

type ButtonIntent = "main" | "main2" | undefined;

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "long" });
};

const JuniorCollaborations = () => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("query") || "";

  const { data: collaborations, isLoading } = useJuniorCollaborations({
    searchText: searchText || undefined,
  });

  const { data: stats } = useJuniorDashboardStats();
  const completedMissions = stats?.missions ?? 0;

  const allCollabs = useMemo(() => collaborations || [], [collaborations]);

  const activeCollabs = useMemo(
    () =>
      allCollabs.filter(
        (c) => c.isJoined && c.status === COLLABORATION_STATUS.IN_PROGRESS
      ),
    [allCollabs]
  );

  const completedCollabs = useMemo(
    () => allCollabs.filter((c) => c.status === COLLABORATION_STATUS.COMPLETED),
    [allCollabs]
  );

  const renderCard = (collab: (typeof allCollabs)[0], idx: number) => {
    const isCompleted = collab.status === COLLABORATION_STATUS.COMPLETED;
    const isPending = collab.juniorStatus === JUNIOR_STATUS.PENDING;
    const isRejected = collab.juniorStatus === JUNIOR_STATUS.REJECTED;
    const isJoinAction =
      !collab.isJoined &&
      !isPending &&
      collab.status !== COLLABORATION_STATUS.COMPLETED;

    const lacksRequiredMissions =
      !collab.isJoined &&
      collab.requiredMissions !== undefined &&
      collab.requiredMissions !== null &&
      completedMissions < collab.requiredMissions;

    const isLocked = isPending || lacksRequiredMissions;

    const buttonText = isPending
      ? "Pending Approval"
      : lacksRequiredMissions
        ? "Locked"
        : isRejected
          ? "Join Again"
          : isJoinAction
            ? "Join Collaboration"
            : isCompleted
              ? "View History"
              : "View Details";

    const buttonIntent: ButtonIntent =
      isPending || lacksRequiredMissions
        ? "main"
        : isJoinAction || isRejected
          ? "main2"
          : "main";

    const iconKey = (collab.icon?.toString() || "1") as keyof typeof PATH_ICON;
    const rewardText = collab.money
      ? `${collab.money} SAR`
      : collab.xpReward
        ? `${collab.xpReward} XP`
        : "";

    const CardContent = (
      <ProjectCard
        title={collab.nameEn || collab.nameAr || "Untitled"}
        description={collab.description || ""}
        progress={isCompleted ? 100 : collab.progressPercentage}
        membersCurrent={collab.takenJuniorSeats || 0}
        membersTotal={collab.totalJuniorSeats || 0}
        dateEnd={formatDate(collab.registerationDeadline)}
        iconSrc={PATH_ICON[iconKey] || PATH_ICON["1"]}
        type="collaboration"
        rewards={
          rewardText ? (
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 flex-wrap">
              You will get <span className="font-bold">{rewardText}</span> after
              completion
            </div>
          ) : undefined
        }
        buttonText={buttonText}
        buttonIntent={buttonIntent}
        buttonIcon={
          isPending || lacksRequiredMissions ? undefined : (
            <ArrowRight size={20} />
          )
        }
        isLocked={isLocked}
        lockLabel={isPending ? "Pending Approval" : "Collaboration Locked"}
        lockSubLabel={
          lacksRequiredMissions
            ? `${collab.requiredMissions} Missions Required`
            : undefined
        }
      />
    );

    if (isLocked) {
      return (
        <div key={collab.id || idx} className="block h-full cursor-not-allowed">
          {CardContent}
        </div>
      );
    }

    if (isJoinAction || isRejected) {
      return (
        <ModalLink
          key={collab.id || idx}
          name="JoinCollaboration"
          query={{ id: collab.id || 0 }}
          className="block h-full transition-transform hover:scale-[1.01]"
        >
          {CardContent}
        </ModalLink>
      );
    }

    return (
      <Link
        key={collab.id || idx}
        href={`/junior/collaborations/${collab.id}`}
        className="block h-full transition-transform hover:scale-[1.01]"
      >
        {CardContent}
      </Link>
    );
  };

  const renderGrid = (items: typeof allCollabs) => {
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
        <EmptyData
          icon={<Users2 className="size-6" />}
          title="No Collaborations Available"
          description="New team collaborations will appear here once open for registration."
        />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((collab, idx) => renderCard(collab, idx))}
      </div>
    );
  };

  return (
    <>
      {/* Tour Trigger */}
      <Suspense fallback={null}>
        <OnboardingTourTrigger />
      </Suspense>

      {/* Breadcrumb */}
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/junior/dashboard" },
          { title: "Collaborations", href: "/junior/collaborations" },
        ]}
      />

      {/* Header */}
      <Jumbotron
        title="Team Collaborations"
        description="Foster teamwork, manage projects, and track collective progress."
        imageClassName="bg-[linear-gradient(135deg,rgba(198,210,255,0.8)0%,rgba(238,242,255,0.8)100%)]"
        imageSrc="/images/handOnHand.svg"
      />

      {/* Tabs & Content */}
      <Suspense
        fallback={<div className="p-10 text-center">Loading Projects...</div>}
      >
        <Tabs
          tabs={[
            {
              name: `All Collaborations (${allCollabs.length})`,
              content: renderGrid(allCollabs),
            },
            {
              name: `Active (${activeCollabs.length})`,
              content: renderGrid(activeCollabs),
            },
            {
              name: `Completed (${completedCollabs.length})`,
              content: renderGrid(completedCollabs),
            },
          ]}
        >
          <div className="flex sm:items-center sm:gap-4 flex-col sm:flex-row max-sm:w-full">
            <Suspense fallback={<div className="w-10 h-10" />}>
              <SearchInput
                placeholder="search collaboration..."
                className="min-w-[200px]"
              />
            </Suspense>
          </div>
        </Tabs>
      </Suspense>
    </>
  );
};

const JuniorCollaborationsPage = () => (
  <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
    <JuniorCollaborations />
  </Suspense>
);

export default JuniorCollaborationsPage;
