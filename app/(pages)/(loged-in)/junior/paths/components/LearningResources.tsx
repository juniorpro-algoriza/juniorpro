import { MainCard } from "@components";
import { Code, ExternalLink, FileText, Video } from "lucide-react";
import React from "react";

export const LearningResources = () => {
  return (
    <div className="space-y-3">
      {resources.map((resource, index) => (
        <MainCard
          key={index}
          classname="bg-[#F9FAFB]  flex items-center gap-3 justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="size-12 flex items-center justify-center rounded-2xl bg-white border border-gray-200 text-gray-600">
              {resource.icon}
            </div>
            <div className="space-y-1">
              <h3 className="font-bold">{resource.title}</h3>
              <p className="text-gray-600 text-sm">{resource.desc}</p>
            </div>
          </div>
          <ExternalLink className="text-gray-300 size-5" />
        </MainCard>
      ))}
    </div>
  );
};

const resources = [
  {
    title: "Introduction to JavaScript Variables",
    icon: <Video />,
    desc: "12 min",
  },
  {
    title: "Understanding Data Types",
    icon: <FileText />,
    desc: "8 min read",
  },
  {
    title: "Practice Examples",
    icon: <Code />,
    desc: "15 exercises",
  },
  {
    title: "Working with Functions",
    icon: <Video />,
    desc: "18 min",
  },
];
