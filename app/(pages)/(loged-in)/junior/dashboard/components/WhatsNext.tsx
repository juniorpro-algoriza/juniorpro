import { MainCard } from "@components";
import { OpenBookIcon } from "@icons";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export const WhatsNext = () => {
  const missions = [
    {
      tag: "Mission",
      timeLeft: "15 min left",
      title: "JavaScript Loops & Iterations",
      description: "intermediate level",
      link: "/junior/dashboard",
    },
    {
      tag: "Challenge",
      timeLeft: "1 hr left",
      title: "React State Management",
      description: "Prize: $50",
      link: "/junior/dashboard",
    },
    {
      tag: "Project",
      timeLeft: "Due tomorrow",
      title: "Build a Weather App",
      description: "4 members",
      link: "/junior/dashboard",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <OpenBookIcon className="text-blue-main" />
        <p className="lg:text-2xl text-xl font-bold">What's Next</p>
      </div>
      {missions.map((item, index) => (
        <div key={index}>
          <Link href={item.link}>
            <MainCard classname="group flex gap-6 items-center">
              <div className="space-y-1.5 w-full">
                <div className="flex items-center gap-3">
                  <div className="py-1 px-3 border border-gray-200 rounded-full font-medium text-sm text-gray-600">
                    {item.tag}
                  </div>
                  <p className="text-13 text-gray-600">{item.timeLeft}</p>
                </div>

                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <ArrowRight className="size-4 text-gray-600 group-hover:mr-3 transition-all duration-300" />
            </MainCard>
          </Link>
        </div>
      ))}
    </div>
  );
};
