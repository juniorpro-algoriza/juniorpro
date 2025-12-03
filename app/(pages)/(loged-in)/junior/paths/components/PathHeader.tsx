import { MainCard, Progress } from "@components";
import Image from "next/image";
import React from "react";

export const PathHeader = ({
  image,
  title,
  description,
  progress,
}: {
  image: string;
  title: string;
  description: string;
  progress: number;
}) => {
  return (
    <MainCard classname="space-y-4">
      <div className="flex items-center gap-3">
        <Image src={image} alt={title} width={70} height={70} />
        <div className=" space-y-1">
          <h2 className="sm:text-2xl text-xl font-bold">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center gap-3">
          <p className="text-13 font-medium text-gray-600">Progress</p>
          <p className="text-dark-blue-main font-bold text-13">{progress}%</p>
        </div>
        <Progress
          width={progress || 0}
          height="12px"
          className="[background:_linear-gradient(90deg,_#615FFF_0%,_#5DA1E8_100%)]"
        />
      </div>
    </MainCard>
  );
};
