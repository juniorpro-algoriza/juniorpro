"use client";
import React, { use } from "react";
import { Breadcrumb, Skeleton } from "@components";
import { PathHeader } from "../_components";
import { PathTimeline } from "@components/client";
import {
  useJuniorsLearningPathById,
  useJuniorsLearningPathMission,
} from "../../tanstack/paths/useJuniorsPaths";
import { PATH_ICON } from "../../../../../configs";

export default function PathPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pathId = parseInt(id);

  const { data: Path, isLoading: isLoadingPath } =
    useJuniorsLearningPathById(pathId);
  const { data: Mission, isLoading: isLoadingMission } =
    useJuniorsLearningPathMission({ Id: pathId });

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
    Mission?.data?.map((mission, index) => {
      return {
        id: mission.id,
        status: "Pending",
        title: mission.nameEn || mission.nameAr || "Mission",
        level: mission.levelNameEn || mission.levelNameAr || "beginner",
        description: mission.description || "Complete this mission to progress",
        duration: mission.durationNameEn || mission.durationNameAr || "30 min",
        xp: mission.xp || 0,
        diamonds: mission.points || 0,
        requires: index !== 0 ? Mission?.data?.[index - 1].nameEn : undefined,
        href: `/junior/paths/${id}/${mission.id}`,
      };
    }) || [];

  return (
    <>
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
            title: Path?.nameEn || Path?.nameAr || "Path",
            href: `/junior/paths/${id}/`,
          },
        ]}
      />
      <div className="space-y-7 xl:max-w-4/5">
        <PathHeader
          image={PATH_ICON[String(Path?.icon) as keyof typeof PATH_ICON]}
          title={Path?.nameEn || Path?.nameAr || "Web Development Basics"}
          description={
            Path?.description ||
            "Learn HTML, CSS, and build your first websites"
          }
          pathId={pathId}
        />
        <PathTimeline module="junior" missions={missions} />
      </div>
    </>
  );
}
