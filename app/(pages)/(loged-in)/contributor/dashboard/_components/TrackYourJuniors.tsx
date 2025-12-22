import { MainCard } from "@components";
import Image from "next/image";
import React from "react";
import CalenderImage from "@public/images/calendar.png";
import MaleImage from "@public/images/male-avatar.png";
import FemaleImage from "@public/images/female-avatar.png";
import TargetWithArrow from "@public/images/target_with_arrow.png";
import TrophyIcon from "@public/images/trophy-icon.png";

export const TrackYourJuniors = () => {
  return (
    <MainCard classname="space-y-5">
      <div className="flex items-center gap-2">
        <Image
          src={CalenderImage.src}
          alt="Calender Icon"
          width={38}
          height={38}
        />
        <h2 className="text-lg font-semibold">Track your Juniors</h2>
      </div>
      <div className="space-y-3">
        {activities.map((item, index) => (
          <MainCard key={index} classname="flex items-center gap-4 p-4">
            <div className="relative">
              <Image
                src={item.gender === "male" ? MaleImage.src : FemaleImage.src}
                alt="User Image"
                width={48}
                height={48}
                className="min-w-12 min-h-12 rounded-full p-1 bg-gray-100"
              />
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md border border-gray-50 flex items-center justify-center">
                <Image
                  src={
                    item.type === "mission"
                      ? TargetWithArrow.src
                      : TrophyIcon.src
                  }
                  alt="Type Icon"
                  width={16}
                  height={16}
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <p className="text-sm">
                <span className="text-dark-blue-main font-bold">
                  {item.user}
                </span>{" "}
                <span className="font-bold">{item.action}</span>
              </p>
              <p className="text-sm font-medium text-gray-400">
                {item.time} <span className="mx-1">•</span> {item.xp} XP
              </p>
            </div>
          </MainCard>
        ))}
      </div>
      <p className="text-sm text-gray-400 text-center font-bold cursor-pointer hover:text-gray-600 transition-colors">
        View All History
      </p>
    </MainCard>
  );
};

const activities = [
  {
    user: "Sara",
    action: "Completed HTML Basics Mission",
    time: "Today",
    xp: "+50",
    gender: "female",
    type: "mission",
  },
  {
    user: "Sara",
    action: "CSS Challenge #3",
    time: "Yesterday",
    xp: "+100",
    gender: "female",
    type: "challenge",
  },
  {
    user: "Khalid",
    action: "Completed HTML Basics Mission",
    time: "2 days ago",
    xp: "+40",
    gender: "male",
    type: "mission",
  },
];
