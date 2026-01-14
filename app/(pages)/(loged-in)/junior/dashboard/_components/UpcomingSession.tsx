import { MainCard } from "@components";
import React from "react";
import { Clock } from "lucide-react";
import { cx } from "@lib";
import { TAG_COLORS } from "../../../../../configs";
export const UpcomingSession = () => {
  const session = [
    {
      tag: "Mission",
      title: "JavaScript Loops & Iterations",
      description: "Tomorrow, 10:00 AM",
    },
    {
      tag: "Challenge",
      title: "React State Management",
      description: "Tomorrow, 10:00 AM",
    },
    {
      tag: "Collaboration",
      title: "Build a Weather App",
      description: "Tomorrow, 10:00 AM",
    },
  ];

  return (
    <div id="live-sessions">
      <MainCard classname="space-y-4">
        <div className="flex items-center gap-3">
          <p className="lg:text-lg text-base font-bold">
            Your Upcoming Sessions
          </p>
        </div>
        {session.map((item, index) => (
          <MainCard classname="group items-center space-y-2.5" key={index}>
            <div className="flex items-center gap-3">
              <div
                className={cx(
                  "py-1 px-3 border rounded-full font-medium text-sm",
                  TAG_COLORS[item.tag as keyof typeof TAG_COLORS]
                )}
              >
                {item.tag}
              </div>
              <div className="text-sm text-gray-600 flex items-center">
                <Clock className="mr-1 size-4" />
                {item.description}
              </div>
            </div>

            <p className="font-medium">{item.title}</p>
          </MainCard>
        ))}
      </MainCard>
    </div>
  );
};
