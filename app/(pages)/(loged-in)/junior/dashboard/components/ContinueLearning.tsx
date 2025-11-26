import { MainCard, Progress } from "@components";
import { PlayIcon } from "@icons";
import Image from "next/image";
import React from "react";
import Rocket from "@public/images/rocket-icon.png";
export const ContinueLearning = () => {
  const missions = [
    {
      tag: "Mission",
      timeLeft: "15 min left",
      title: "JavaScript Loops & Iterations",
      description: "Master for, while, and forEach loops",
      progress: 65,
      icon: Rocket,
    },
    {
      tag: "Challenge",
      timeLeft: "1 hr left",
      title: "React State Management",
      description: "Learn useState, useReducer, and custom hooks",
      progress: 40,
      icon: Rocket,
    },
    {
      tag: "Project",
      timeLeft: "Due tomorrow",
      title: "Build a Weather App",
      description: "Use APIs, components, and UI styling",
      progress: 80,
      icon: Rocket,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <PlayIcon className="text-purple-main" />
        <p className="lg:text-2xl text-xl font-bold">Continue Your Learning</p>
      </div>
      <MainCard classname="border border-[#F3E8FF] [background:linear-gradient(135deg,#FAF5FF_0%,#FDF2F8_100%)] shadow-none flex items-center gap-6">
        <Image
          src={Rocket}
          alt="rocket"
          width={40}
          height={40}
          className="w-8"
        />
        <div className="space-y-1">
          <p className="text-sm font-medium">You're Building Momentum!</p>
          <p className="text-[13px] text-gray-600">
            Finishing what you started is a superpower. Let's keep that streak
            going!
          </p>
        </div>
      </MainCard>
      {missions.map((item, index) => (
        <MainCard key={index} classname="flex gap-6 items-start">
          <Image
            src={item.icon}
            alt="icon"
            width={40}
            height={40}
            className="w-8"
          />

          <div className="space-y-1.5 w-full">
            <div className="flex items-center gap-3">
              <div className="py-1 px-3 border border-gray-200 rounded-full font-medium text-sm text-gray-600">
                {item.tag}
              </div>
              <p className="text-[13px] text-gray-600">{item.timeLeft}</p>
            </div>

            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-[13px] text-gray-600">
              {item.progress}% complete
            </p>

            <Progress width={item.progress} />
          </div>
        </MainCard>
      ))}
    </div>
  );
};
