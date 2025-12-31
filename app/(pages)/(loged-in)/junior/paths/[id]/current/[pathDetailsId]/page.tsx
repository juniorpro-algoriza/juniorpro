"use client";
import React, { use } from "react";
import { Breadcrumb, Skeleton } from "@components";
import {
  PathDetailsHeader,
  PathDetailsTabs,
  StuckOnAProblem,
} from "../../../_components";
import {
  useJuniorsLearningPathCurrentById,
  useJuniorsLearningPathCurrentMissionById,
} from "../../../../tanstack/paths/useJuniorsPaths";
import { OnboardingTourTrigger } from "../../../../dashboard/_components";

export default function PathDetailPage({
  params,
}: {
  params: Promise<{ pathDetailsId: string; id: string }>;
}) {
  const { pathDetailsId, id } = use(params);

  const { data: currentPath, isLoading: isLoadingPath } =
    useJuniorsLearningPathCurrentById(parseInt(id));
  const { data: currentMission, isLoading: isLoadingMission } =
    useJuniorsLearningPathCurrentMissionById(parseInt(pathDetailsId));

  if (isLoadingPath || isLoadingMission) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }
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
          {
            title:
              currentMission?.missionDetails?.nameEn ||
              currentMission?.missionDetails?.nameAr ||
              "Path Detail",
            href: `/junior/paths/${id}/current/${pathDetailsId}`,
          },
        ]}
      />
      <PathDetailsHeader
        nameEn={currentMission?.missionDetails?.nameEn}
        description={currentMission?.missionDetails?.description}
        levelNameEn={currentMission?.missionDetails?.levelNameEn}
        skillNameEn={currentMission?.missionDetails?.skillNameEn}
        xp={currentMission?.missionDetails?.xp}
        points={currentMission?.missionDetails?.points}
        durationNameEn={currentMission?.missionDetails?.durationNameEn}
      />
      <PathDetailsTabs
        steps={currentMission?.steps}
        successCriterias={currentMission?.successCriterias}
        learningResources={currentMission?.learningResources}
        submissionLink={currentMission?.missionDetails?.submissionLink}
        referenceAnswer={currentMission?.missionDetails?.referenceAnswer}
        missionId={parseInt(pathDetailsId)}
        points={currentMission?.missionDetails?.points}
        xp={currentMission?.missionDetails?.xp}
        nameEn={currentMission?.missionDetails?.nameEn}
      />
      <StuckOnAProblem />
    </>
  );
}
