import Link from "next/link";
import React from "react";
import { MainCard } from "../MainCard";
import Image from "next/image";
import { Target } from "lucide-react";
import LightningImage from "@public/images/lightning-icon-2.png";
import DiamondImage from "@public/images/diamond-icon-2.png";
import { Progress } from "../Progress";
import { cx } from "@lib";

export const PathCard = ({
  path,
  userType,
  cardClassName,
}: {
  path: {
    id: number;
    image: string;
    title: string;
    description: string;
    missions: number;
    xp: number;
    points: number;
    progress?: number;
  };
  userType: "junior" | "admin" | "project/manager" | "contributor";
  cardClassName?: string;
}) => {
  return (
    <div key={path.id}>
      <Link href={`/${userType}/paths/${path.id}`}>
        <MainCard classname={cx(" space-y-2", cardClassName)}>
          <Image
            src={path.image}
            alt="Current path Image"
            width={60}
            height={60}
          />
          <h3 className=" font-bold">{path.title}</h3>
          <p className="text-gray-600 text-sm">{path.description}</p>
          {path.progress && (
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-3">
                <p className="text-13 font-medium text-gray-600">Progress</p>
                <p className="text-dark-blue-main font-bold text-13">
                  {path.progress}%
                </p>
              </div>
              <Progress
                width={path.progress || 0}
                height="12px"
                className="[background:_linear-gradient(90deg,_#615FFF_0%,_#5DA1E8_100%)]"
              />
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-full flex items-center gap-2 text-gray-600">
              <Target className="size-4" />
              <p className="text-13">
                <span className="font-bold">{path.missions}</span>{" "}
                <span className=" capitalize">missions</span>
              </p>
            </div>
            <XpAndPoints xp={path.xp} points={path.points} />
          </div>
        </MainCard>
      </Link>
    </div>
  );
};
export const XpAndPoints = ({xp,points}:{
  xp:number,
  points:number,
}) => {
  return (
    <>
      <div className="px-3 py-1 bg-[#E17100]/8 border border-[#E17100]/20 rounded-full flex items-center gap-2 text-[#E17100]">
        <Image
          src={LightningImage}
          alt="Lightning Image"
          width={20}
          height={20}
        />
        <p className="text-13">
          +<span className="font-bold">{xp}</span>{" "}
          <span className=" capitalize">XP</span>
        </p>
      </div>
      <div className="px-3 py-1 bg-dark-blue-main/8 border border-dark-blue-main/20 rounded-full flex items-center gap-2 text-dark-blue-main">
        <Image src={DiamondImage} alt="Diamond Image" width={20} height={20} />
        <p className="text-13">
          +<span className="font-bold">{points}</span>{" "}
          <span className=" capitalize">Points</span>
        </p>
      </div>
    </>
  );
};
