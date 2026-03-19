"use client";
import { Header } from "@components/client";
import React from "react";
import StarGroup from "@public/images/3d-star-group.png";
import { MyCurrentPath, RecommendedForYou } from "./_components";
import { Breadcrumb, Skeleton } from "@components";
import {
  useJuniorsLearningPathCurrent,
  useJuniorsLearningPaths,
} from "../tanstack/paths/useJuniorsPaths";
import { PATH_ICON } from "../../../../configs";
import { OnboardingTourTrigger } from "../dashboard/_components";
import Image from "next/image";
import { cx } from "@lib";
const MyJourneyPage = () => {
  const { data: currentPathData, isLoading: isLoadingCurrent } =
    useJuniorsLearningPathCurrent();
  const { data: allPathsData, isLoading: isLoadingAll } =
    useJuniorsLearningPaths({});

  const recommendedPaths = allPathsData?.data || [];

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
      <Header
        title={`My Learning Journey`}
        description="Pick a path to start learning new superpowers!"
      />
      <div className="xl:w-4/5">
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
      </div>

      <MyCurrentPath
        paths={
          currentPathData?.data
            ?.map((path) => ({
              id: path.id || 0,
              image: PATH_ICON[String(path.id) as keyof typeof PATH_ICON],
              title: path.nameEn || path.nameAr || "Learning Path",
              description: path.description || "Learn new skills",
              progress: Number((path.progressPercentage || 0).toFixed(2)),
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
