import { MainCard, TAG_COLORS } from "@components";
import Image from "next/image";
import React from "react";
import CalenderImage from "@public/images/calendar.png";
import { Clock } from "lucide-react";
import { cx } from "@lib";
import MaleImage from "@public/images/male-avatar.png";
import FemaleImage from "@public/images/female-avatar.png";
export const UpcomingSessions = () => {
  return (
    <MainCard classname="space-y-5">
      <div className="flex items-center gap-2">
        <Image
          src={CalenderImage.src}
          alt="Calender Icon"
          width={38}
          height={38}
        />
        <h2 className="text-lg font-semibold">Junior’s Upcoming Sessions</h2>
      </div>
      <div className="space-y-2">
        {session.map((item, index) => (
          <MainCard classname="group items-center space-y-2" key={index}>
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className={cx(
                  "py-1 px-3 border rounded-full font-medium text-sm",
                  TAG_COLORS[item.tag as keyof typeof TAG_COLORS]
                )}
              >
                {item.tag}
              </div>
              <div className="text-13 text-gray-600 flex items-center">
                <Clock className="mr-1 size-4" />
                {item.description}
              </div>
            </div>

            <p className="font-medium">{item.title}</p>
            <hr className="border-gray-100" />
            <div className="flex items-center gap-2 ">
              <Image
                src={item.gender === "male" ? MaleImage.src : FemaleImage.src}
                alt="User Image"
                width={30}
                height={30}
                className="rounded-full p-1 bg-gray-100 size-8"
              />
              <p className="font-bold text-sm">{item.user}</p>
            </div>
          </MainCard>
        ))}
      </div>
      <p className="text-sm text-gray-400 text-center font-bold cursor-pointer hover:text-gray-600 transition-colors">
        View All Sessions
      </p>
    </MainCard>
  );
};

const session = [
  {
    tag: "Mission",
    title: "JavaScript Loops & Iterations",
    description: "Tomorrow, 10:00 AM",
    user: "John Doe",
    gender: "male",
  },
  {
    tag: "Challenge",
    title: "React State Management",
    description: "Tomorrow, 10:00 AM",
    user: "Sarah Doe",
    gender: "female",
  },
  {
    tag: "Collaboration",
    title: "Build a Weather App",
    description: "Tomorrow, 10:00 AM",
    user: "John Doe",
    gender: "male",
  },
];
