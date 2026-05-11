"use client";

import { MainCard, Progress, Skeleton } from "@components";
import Image from "next/image";
import CloudImage from "@public/landing-pages/clouds.png";
import { Play, ChevronRight, BookOpen, Zap } from "lucide-react";
import { useJuniorCurrentPathDetails } from "../../tanstack";
import Link from "next/link";

export const CurrentPath = () => {
  const {
    data: currentPathData,
    isLoading,
    error,
  } = useJuniorCurrentPathDetails();

  if (isLoading) {
    return (
      <MainCard classname="relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 border-indigo-100/50">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 rounded" />
            <Skeleton className="h-4 w-64 rounded" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <Skeleton className="h-2 w-full rounded" />
          </div>
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100">
            <Skeleton className="size-10 rounded-xl" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-36 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-12 rounded" />
                <Skeleton className="h-3 w-12 rounded-full" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard classname="relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 border-indigo-100/50 ">
        <div className="relative z-10 flex flex-col items-center justify-center py-6 space-y-3">
          <div className="size-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-2">
            <BookOpen className="size-6 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-700 mb-1 sm:text-base md:text-lg">
              No Path Yet?
            </p>
            <p className="text-sm text-gray-500 max-w-[240px] sm:text-xs">
              Start your learning journey by choosing a path that matches your
              goals.
            </p>
          </div>

          <button className="w-fit mx-auto flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-5 py-2.5 rounded-full transition-colors duration-200 group sm:text-xs">
            EXPLORE PATHS
            <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </MainCard>
    );
  }

  const difficultyClass = "text-amber-600 bg-amber-50";

  return (
    <MainCard classname="relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 border-indigo-100/50 pb-16 h-full">
      {/* Cloud decoration — top right */}
      <div className="absolute top-0 right-0 pointer-events-none translate-x-4 -translate-y-4">
        <Image
          src={CloudImage}
          alt=""
          width={180}
          height={120}
          className="w-[180px]"
        />
      </div>

      {/* Cloud decoration — bottom left */}
      <div className="absolute bottom-0 left-0 pointer-events-none -translate-x-6 translate-y-6">
        <Image
          src={CloudImage}
          alt=""
          width={160}
          height={110}
          className="w-[160px]"
        />
      </div>
      {/* Cloud decoration — bottom right */}
      <div className="absolute bottom-0 right-0 pointer-events-none translate-x-6 translate-y-6">
        <Image
          src={CloudImage}
          alt=""
          width={160}
          height={110}
          className="w-[160px]"
        />
      </div>

      <div className="relative z-10 space-y-4">
        {/* Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold tracking-widest text-indigo-600 uppercase bg-indigo-100 px-2.5 py-1 rounded-full">
            Current Path
          </span>
        </div>

        {/* Title & description */}
        <div>
          <h3 className="text-3xl font-bold">
            {currentPathData?.currentPath?.nameEn ||
              currentPathData?.currentPath?.nameAr ||
              "Loading..."}
          </h3>
          <p className="text-lg text-gray-500 mt-1">
            {currentPathData?.currentPath?.description ||
              "Loading description..."}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-gray-600 font-bold">
              {currentPathData?.currentPath?.completedMissionsCount ?? 0}
              {currentPathData?.currentPath?.missionsCount != null
                ? `/${currentPathData.currentPath.missionsCount}`
                : ""}{" "}
              MISSIONS COMPLETED
            </span>
            <span className="font-semibold text-indigo-600">
              {currentPathData?.currentPath?.progressPercentage ?? 0}%
            </span>
          </div>
          <Progress
            width={currentPathData?.currentPath?.progressPercentage ?? 0}
          />
        </div>

        {/* Current mission */}
        {currentPathData?.pathMission && (
          <Link
            href={`/junior/paths/${currentPathData.currentPath?.id}/current/${currentPathData.pathMission?.id}`}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100 shadow-sm cursor-pointer hover:bg-white/90 transition-colors"
          >
            {/* Play icon */}
            <div className="size-10 rounded-2xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <Play className="size-4 text-indigo-600 fill-indigo-600 ml-0.5" />
            </div>

            {/* Mission info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">
                {currentPathData.pathMission.nameEn ||
                  currentPathData.pathMission.nameAr ||
                  "Current Mission"}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">-- MIN</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${difficultyClass}`}
                >
                  MEDIUM
                </span>
                <span className="flex items-center gap-0.5 text-xs text-amber-500 font-medium">
                  <Zap className="size-3 fill-amber-500 text-amber-500" />
                  {currentPathData.pathMission.xp ?? 0} XP
                </span>
              </div>
            </div>

            {/* Circular chevron button */}
            <div className="size-8 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg [box-shadow:0px_4px_6px_-4px_#C6D2FF,0px_10px_15px_-3px_#C6D2FF] flex-shrink-0">
              <ChevronRight className="size-4 text-white" />
            </div>
          </Link>
        )}
      </div>
    </MainCard>
  );
};
