import { PathCard } from "@components/client";
import React from "react";

export const MyCurrentPath = ({
  paths,
}: {
  paths: {
    id: number;
    image: string;
    title: string;
    description: string;
    progress?: number;
    missions: number;
    xp: number;
    points: number;
  }[];
}) => {
  return (
    <div className="space-y-5">
      <h2 className=" uppercase text-gray-600 font-semibold">
        My Current Path
      </h2>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-5">
        {paths.map((path) => (
          <PathCard key={path.id} path={path} userType="junior" cardClassName="border-dark-blue-main" cardLink={`/junior/paths/${path.id}/current`} />
        ))}
        {paths.length === 0 && (
          <p className="ms-4 text-gray-600">
            No current paths found.
          </p>
        )}
      </div>
    </div>
  );
};
