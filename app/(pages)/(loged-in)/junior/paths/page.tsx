import { Header, Tip } from "@components/client";
import React from "react";
import StarGroup from "@public/images/3d-star-group.png";
import { MyCurrentPath, RecommendedForYou } from "./_components";
import { Breadcrumb, PATH_ICON } from "@components";
import {
  getJuniorsLearningPaths,
  getJuniorsLearningPathCurrent,
} from "../server";
const MyJourneyPage = async () => {
  // Fetch current learning path
  const currentPathData = await getJuniorsLearningPathCurrent({});

  // Fetch all available learning paths (already filtered by backend)
  const allPathsData = await getJuniorsLearningPaths({});
  const recommendedPaths = allPathsData?.data || [];
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
        ]}
      />
      <Header
        title={`My Learning Journey`}
        description="Pick a path to start learning new superpowers!"
      />
      <div className="xl:w-4/5">
        <Tip
          title="Your Unique Path to Success!"
          description="Everyone learns at their own pace, and that's perfectly fine! These learning paths are designed just for you. Take your time with each mission, ask questions when you need help, and celebrate every step forward. You're building skills that will open doors to amazing opportunities!"
          image={StarGroup.src}
          className="gap-5 my-5"
          imageClassname="w-16"
        />
      </div>

      <MyCurrentPath
        paths={
          currentPathData?.data
            ?.map((path) => ({
              id: path.id || 0,
              image: PATH_ICON[String(path.id) as keyof typeof PATH_ICON],
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
            image: PATH_ICON[String(path.id) as keyof typeof PATH_ICON],
            title: path.nameEn || path.nameAr || "Learning Path",
            description: path.description || "Learn new skills",
            missions: path.missionsCount || 0,
            xp: path.totalXP || 0,
            points: path.totalPoints || 0,
          }))
          .filter((path) => path.id !== 0)}
      />
    </>
  );
};

export default MyJourneyPage;
