"use client";
import React, { use } from "react";
import { Breadcrumb, Skeleton } from "@components";
import { PathHeader } from "../../_components";
import { PathTimeline } from "@components/client";
import { OnboardingTourTrigger } from "../../../dashboard/_components";
import {
  useJuniorsLearningPathCurrentById,
  useJuniorsLearningPathCurrentMission,
} from "../../../tanstack/paths/useJuniorsPaths";
import { MISSION_STATUS, PATH_ICON } from "../../../../../../configs/constants";

export default function PathPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pathId = parseInt(id);

  const { data: currentPath, isLoading: isLoadingPath } =
    useJuniorsLearningPathCurrentById(pathId);
  const { data: currentMission, isLoading: isLoadingMission } =
    useJuniorsLearningPathCurrentMission({ Id: pathId });

  if (isLoadingPath || isLoadingMission) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }
  // Map API response to PathTimeline format
  const missions =
    currentMission?.data?.map((mission, index) => {
      return {
        id: mission.id,
        status: MISSION_STATUS[mission.status as keyof typeof MISSION_STATUS],
        title: mission.nameEn || mission.nameAr || "Mission",
        level: mission.levelNameEn || mission.levelNameAr || "beginner",
        description: mission.description || "Complete this mission to progress",
        duration: mission.durationNameEn || mission.durationNameAr || "30 min",
        xp: mission.xp || 0,
        diamonds: mission.points || 0,
        requires:
          index !== 0 ? currentMission?.data?.[index - 1].nameEn : undefined,
        href: `/junior/paths/${id}/current/${mission.id}`,
      };
    }) || [];

  return (
    <>
      <OnboardingTourTrigger />
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/junior/dashboard",
          },
          {
            title: "Learning Paths",
            href: "/junior/paths",
          },
          {
            title: currentPath?.nameEn || currentPath?.nameAr || "Path",
            href: `/junior/paths/${id}/current`,
          },
        ]}
      />
      <div className="space-y-7 xl:max-w-4/5">
        <PathHeader
          image={PATH_ICON[String(pathId) as keyof typeof PATH_ICON]}
          title={
            currentPath?.nameEn ||
            currentPath?.nameAr ||
            "Web Development Basics"
          }
          description={
            currentPath?.description ||
            "Learn HTML, CSS, and build your first websites"
          }
          progress={currentPath?.progressPercentage || 0}
        />
        <PathTimeline module="junior" missions={missions} />
      </div>
    </>
  );
}
