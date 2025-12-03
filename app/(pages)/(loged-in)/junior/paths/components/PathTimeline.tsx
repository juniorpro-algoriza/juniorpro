import React from "react";
import {
  Button,
  MainCard,
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "@components";
import { cx } from "@lib";
import { ArrowRight, CircleCheck, Clock, Lock } from "lucide-react";
import Link from "next/link";
import { XpAndPoints } from "@components/client";
export const PathTimeline = ({ pathId }: { pathId: string }) => {
  return (
    <Timeline>
      {items.map((item) => (
        <TimelineItem
          className="group-data-[orientation=vertical]/timeline:ms-10 group-data-[orientation=vertical]/timeline:not-last:pb-8"
          key={item.id}
          step={item.id}
        >
          <TimelineHeader>
            <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5 bg-gray-200" />

            <TimelineIndicator
              className={cx(
                "group-data-[orientation=vertical]/timeline:-left-7 flex size-10 items-center justify-center border-none group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground shadow-main p-1",
                item.status === "locked" ? "bg-gray-100 opacity-50" : "bg-white"
              )}
            >
              {item.status === "completed" && (
                <div className="w-full h-full rounded-full bg-[#00BC7D] flex items-center justify-center text-white">
                  <CircleCheck />
                </div>
              )}

              {item.status === "current" && (
                <div className="w-full h-full rounded-full bg-[#4F39F6] flex items-center justify-center text-white">
                  {item.id}
                </div>
              )}

              {item.status === "locked" && (
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <Lock className="size-4" />
                </div>
              )}
            </TimelineIndicator>
          </TimelineHeader>

          <TimelineContent
            className={item.status === "locked" ? "opacity-50" : ""}
          >
            <MainCard classname="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center md:gap-4 gap-2 flex-wrap">
                  <h3 className="capitalize text-lg font-bold">{item.title}</h3>
                  <div className="capitalize text-sm font-bold bg-green-50 p-1 rounded-md text-green-700">
                    {item.level}
                  </div>
                </div>

                <p className="text-sm text-gray-600">{item.description}</p>

                <div className="flex items-center justify-between flex-wrap gap-2 text-13">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-full flex items-center gap-2 text-gray-600">
                      <Clock className="size-4" /> {item.duration}
                    </div>
                    <XpAndPoints xp={item.xp} points={item.diamonds} />
                  </div>
                </div>

                {item.requires && item.status == "locked" && (
                  <div className="text-gray-600 flex-wrap bg-gray-100 flex gap-2 items-center text-13 px-4 py-1.5 rounded-2xl">
                    <Lock className="size-4" />
                    Requires:
                    <span className="font-medium">{item.requires}</span>
                  </div>
                )}
              </div>
              {item.status === "completed" ? (
                <Link href={`/junior/paths/${pathId}/${item.id}`}>
                  <Button intent="main" size="mainDefault">
                    Review Mission <ArrowRight className="size-4" />
                  </Button>
                </Link>
              ) : item.status === "current" ? (
                <Link href={`/junior/paths/${pathId}/${item.id}`}>
                  <Button intent="main2" size="mainDefault">
                    CONTINUE <ArrowRight className="size-4" />
                  </Button>
                </Link>
              ) : null}
            </MainCard>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const items = [
  {
    id: 1,
    status: "completed",
    title: "JavaScript Basics",
    level: "beginner",
    description:
      "Learn fundamental JavaScript concepts including variables, data types, and basic operators.",
    duration: "30 min",
    xp: 20,
    diamonds: 10,
    progress: 100,
    requires: null,
  },
  {
    id: 2,
    status: "completed",
    title: "Functions & Scope",
    level: "beginner",
    description:
      "Understand how functions work, different ways to write them, and how scope affects variables.",
    duration: "40 min",
    xp: 22,
    diamonds: 11,
    progress: 100,
    requires: "JavaScript Basics",
  },
  {
    id: 3,
    status: "current",
    title: "Asynchronous JavaScript",
    level: "intermediate",
    description:
      "Explore callbacks, promises, and async/await to handle asynchronous operations effectively.",
    duration: "45 min",
    xp: 25,
    diamonds: 12,
    progress: 70,
    requires: "Functions & Scope",
  },
  {
    id: 4,
    status: "locked",
    title: "DOM Manipulation",
    level: "intermediate",
    description:
      "Learn how to interact with and dynamically update the DOM using JavaScript.",
    duration: "50 min",
    xp: 28,
    diamonds: 14,
    progress: 0,
    requires: "Asynchronous JavaScript",
  },
  {
    id: 5,
    status: "locked",
    title: "DOM Manipulation",
    level: "intermediate",
    description:
      "Learn how to interact with and dynamically update the DOM using JavaScript.",
    duration: "50 min",
    xp: 28,
    diamonds: 14,
    progress: 0,
    requires: "Asynchronous JavaScript",
  },
];
