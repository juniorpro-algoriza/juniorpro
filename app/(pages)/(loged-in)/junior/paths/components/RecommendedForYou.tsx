import { PathCard } from "@components/client";
import { Sparkles } from "lucide-react";
import React from "react";
export const RecommendedForYou = ({
  paths,
}: {
  paths: {
    id: number;
    image: string;
    title: string;
    description: string;
    missions: number,
    xp: number,
    points: number;
  }[];
}) => {
  return (
    <div className="space-y-5">
      <h2 className=" flex items-center gap-2 uppercase text-gray-600">
        <Sparkles className="text-blue-main size-4" />
        Recommended for You
      </h2>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-5">
        {paths.map((path) => (
          <PathCard key={path.id} path={path} userType="junior" />
        ))}
      </div>
    </div>
  );
};
