import { EmptyData, PathCard } from "@components/client";
import { BookOpen } from "lucide-react";
import React from "react";
export const RecommendedForYou = ({
  paths,
}: {
  paths: {
    id: number;
    image: string;
    title: string;
    description: string;
    missions: number;
    xp: number;
    points: number;
  }[];
}) => {
  return (
    <div id="recommended-paths" className="space-y-5">
      <h2 className=" flex items-center gap-2 uppercase text-gray-600 font-bold">
        Learning paths
      </h2>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-5">
        {paths.map((path) => (
          <PathCard
            key={path.id}
            path={path}
            userType="junior"
            hasJoinButton
            cardLink={`/junior/paths/${path.id}`}
          />
        ))}
        {paths.length === 0 && (
          <div className="sm:col-span-2 xl:col-span-3">
            <EmptyData
              icon={<BookOpen className="size-6" />}
              title="No Learning Paths Available"
              description="New learning paths will appear here once they are ready."
            />
          </div>
        )}
      </div>
    </div>
  );
};
