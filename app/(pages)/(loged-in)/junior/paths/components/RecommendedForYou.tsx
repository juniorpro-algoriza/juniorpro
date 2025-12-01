import { MainCard } from "@components";
import { GlowingStarIcon, GoalIcon } from "@icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const RecommendedForYou = ({
  paths,
}: {
  paths: {
    id: number;
    image: string;
    title: string;
    description: string;
    includes: Record<string, number>;
  }[];
}) => {
  return (
    <div className="space-y-5">
      <h2 className=" flex items-center gap-2 uppercase text-gray-600">
        <GlowingStarIcon className="text-blue-main" />
        Recommended for You
      </h2>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-5">
        {paths.map((path) => (
          <div key={path.id}>
            <Link href={`/junior/paths/${path.id}`}>
              <MainCard classname=" border border-gray-100 lg:space-y-4 space-y-2">
                <Image
                  src={path.image}
                  alt="Current path Image"
                  width={40}
                  height={40}
                />
                <h3 className=" font-bold">{path.title}</h3>
                <p className="text-gray-600 text-sm">{path.description}</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {Object.entries(path.includes).map(([key, value], index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-gray-50 rounded-full flex items-center gap-2 text-gray-600"
                    >
                      <GoalIcon />
                      <p className="text-13">
                        {value} <span className=" capitalize">{key}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </MainCard>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
