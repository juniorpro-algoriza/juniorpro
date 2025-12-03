import { MainCard, Progress, TAG_COLORS } from "@components";
import Image from "next/image";
import React from "react";
import Rocket from "@public/images/rocket-icon.png";
import { cx } from "@lib";
export const ContinueLearning = () => {
  const missions = [
    {
      tag: "Mission",
      title: "JavaScript Loops & Iterations",
      description: "Master for, while, and forEach loops",
      progress: 65,
      icon: Rocket,
    },
    {
      tag: "Challenge",
      title: "React State Management",
      description: "Learn useState, useReducer, and custom hooks",
      progress: 40,
      icon: Rocket,
    },
    {
      tag: "Collaboration",
      title: "Build a Weather App",
      description: "Use APIs, components, and UI styling",
      progress: 80,
      icon: Rocket,
    },
  ];

  return (
    <div className="space-y-4">
      <p className="lg:text-2xl text-xl font-bold">Continue Your Learning</p>
      <MainCard classname="border border-[#F3E8FF] [background:_linear-gradient(135deg,_#FAF5FF_0%,_#EEF2FF_100%)] shadow-none flex items-center gap-1 p-4">
        <Image
          src={Rocket}
          alt="rocket"
          width={64}
          height={64}
          className="w-16"
        />
        <div className="space-y-1">
          <p className="font-medium">You're Building Momentum!</p>
          <p className="text-13 text-gray-600">
            Finishing what you started is a superpower. Let's keep that streak
            going!
          </p>
        </div>
      </MainCard>
      {missions.map((item, index) => (
        <MainCard key={index} classname="space-y-1.5 w-full ">
          <div
            className={cx(
              "py-1 px-3 border rounded-full font-medium text-sm w-fit",
              TAG_COLORS[item.tag as keyof typeof TAG_COLORS]
            )}
          >
            {item.tag}
          </div>

          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-13 text-gray-600">Progress</p>
            <p className="text-13 text-dark-blue-main font-bold">
              {item.progress}%
            </p>
          </div>

          <Progress
            className="[background:_linear-gradient(90deg,_#615FFF_0%,_#5DA1E8_100%)]"
            width={item.progress}
          />
        </MainCard>
      ))}
    </div>
  );
};
