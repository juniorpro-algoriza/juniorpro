import { MainCard } from "@components";
import React from "react";
import { Clock } from "lucide-react";
import CalenderImage from "@public/images/calendar.png";
import Image from "next/image";
export const UpcomingSession = () => {
  const session = [
    {
      tag: "Mission",
      timeLeft: "1 hour",
      title: "JavaScript Loops & Iterations",
      description: "Tomorrow, 10:00 AM",
    },
    {
      tag: "Challenge",
      timeLeft: "1 hour",
      title: "React State Management",
      description: "Tomorrow, 10:00 AM",
    },
    {
      tag: "Project",
      timeLeft: "1 hour",
      title: "Build a Weather App",
      description: "Tomorrow, 10:00 AM",
    },
  ];

  return (
    <MainCard classname="space-y-4">
      <div className="flex items-center gap-3">
        <Image
          src={CalenderImage.src}
          alt="Calender Icon"
          width={38}
          height={38}
        />
        <p className="lg:text-2xl text-xl font-bold">Your Upcoming Sessions</p>
      </div>
      {session.map((item, index) => (
        <MainCard classname="group items-center space-y-1.5" key={index}>
          <div className="flex items-center gap-3">
            <div className="py-1 px-3 border border-gray-200 rounded-full font-medium text-sm text-gray-600">
              {item.tag}
            </div>
            <div className="text-13 text-gray-600 flex items-center">
              <Clock className="mr-1 size-4" />
              {item.timeLeft}
            </div>
          </div>

          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-600">{item.description}</p>
        </MainCard>
      ))}
    </MainCard>
  );
};
