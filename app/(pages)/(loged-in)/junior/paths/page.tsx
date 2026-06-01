"use client";
import React from "react";
import { MyCurrentPath, RecommendedForYou } from "./_components";
import { Breadcrumb, Jumbotron, Skeleton } from "@components";
import {
  useJuniorsLearningPathCurrent,
  useJuniorsLearningPaths,
} from "../tanstack/paths/useJuniorsPaths";
import { PATH_ICON } from "../../../../configs";
import { OnboardingTourTrigger } from "../dashboard/_components";

const MyJourneyPage = () => {
  const { data: currentPathData, isLoading: isLoadingCurrent } =
    useJuniorsLearningPathCurrent();
  const { data: allPathsData, isLoading: isLoadingAll } =
    useJuniorsLearningPaths({});

  const recommendedPaths = allPathsData?.data || [];
  console.log("recommendedPaths", recommendedPaths);
  console.log("currentPathData", currentPathData);

  if (isLoadingCurrent || isLoadingAll) {
    return (
      <div className="space-y-10">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }
  return (
    <div id="my-paths" className="space-y-5">
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
        ]}
      />
      <Jumbotron
        title="Learning Paths"
        description="Design comprehensive learning journeys and track curriculum progress."
        imageClassName="bg-[linear-gradient(135deg,rgba(156,230,159,0.8)0%,rgba(254,255,255,0)100%)]"
        imageSrc="/images/plant.png"
      />
      {/* <div className="xl:w-4/5">
        <div
          className={cx(
            "bg-[#F5F6F8] rounded-2xl p-3 my-7 flex items-center gap-2",
            "gap-5 my-5"
          )}
        >
          <Image
            src={StarGroup.src}
            alt="Tip Icon"
            width={100}
            height={100}
            className={cx("w-6 h-auto", "w-16")}
          />
          <div>
            <p className="font-semibold text-[#333333]">
              Your Unique Path to Success!
            </p>
            <p className="font-medium text-sm text-gray-600 mt-2">
              Everyone learns at their own pace, and that's perfectly fine!
              These learning paths are designed just for you. Take your time
              with each mission, ask questions when you need help, and celebrate
              every step forward!
            </p>
          </div>
        </div>
      </div> */}

      <MyCurrentPath
        paths={
          currentPathData?.data
            ?.map((path) => ({
              id: path.id || 0,
              image: PATH_ICON[String(path.icon) as keyof typeof PATH_ICON],
              title: path.nameEn || path.nameAr || "Learning Path",
              description: path.description || "Learn new skills",
              progress: path.progressPercentage || 0,
              missions: path.missionsCount || 0,
              xp: path.totalXP || 0,
              points: path.totalPoints || 0,
            }))
            .filter((path) => path.id !== 0) || []
        }
      />
      <RecommendedForYou
        paths={recommendedPaths
          .map((path) => ({
            id: path.id || 0,
            image: PATH_ICON[String(path.icon) as keyof typeof PATH_ICON],
            title: path.nameEn || path.nameAr || "Learning Path",
            description: path.description || "Learn new skills",
            missions: path.missionsCount || 0,
            xp: path.totalXP || 0,
            points: path.totalPoints || 0,
          }))
          .filter((path) => path.id !== 0)}
      />
    </div>
  );
};

export default MyJourneyPage;
