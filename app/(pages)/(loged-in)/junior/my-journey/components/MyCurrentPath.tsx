import { MainCard, Progress } from "@components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const MyCurrentPath = ({
  paths,
}: {
  paths: {
    id: number;
    image: string;
    title: string;
    description: string;
    progress: number;
  }[];
}) => {
  return (
    <div className="space-y-5">
      <h2 className=" uppercase text-gray-600 font-semibold">
        My Current Path
      </h2>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-5">
        {paths.map((path) => (
          <div key={path.id}>
            <Link href={`/junior/my-journey/${path.id}`}>
              <MainCard
                classname=" border border-[#A3B3FF] lg:space-y-4 space-y-2"
                
              >
                <Image
                  src={path.image}
                  alt="Current path Image"
                  width={40}
                  height={40}
                />
                <h3 className=" font-bold">{path.title}</h3>
                <p className="text-gray-600 text-sm">{path.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center gap-3">
                    <p className="text-13 font-medium text-gray-600">
                      Progress
                    </p>
                    <p className="text-purple-main font-bold text-13">
                      {path.progress}%
                    </p>
                  </div>
                  <Progress width={path.progress} />
                </div>
              </MainCard>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
