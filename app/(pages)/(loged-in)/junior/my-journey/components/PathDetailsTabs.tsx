import { Tabs } from "@components/client";
import { TabData } from "@types";
import { Book, FileText, Upload } from "lucide-react";
import React from "react";
import { StepByStepGuide } from "./StepByStepGuide";
import { LearningResources } from "./LearningResources";
import { SubmitYourWork } from "./SubmitYourWork";

export const PathDetailsTabs = () => {
  const tabsData: TabData[] = [
    {
      name: (
        <div className="flex items-center gap-2">
          <Book className="size-4" />
          <span>Step by Step Guide</span>
        </div>
      ),
      content: <StepByStepGuide />,
    },
    {
      name: (
        <div className="flex items-center gap-2">
          <FileText className="size-4" />
          <span>Learning Resources</span>
        </div>
      ),
      content: <LearningResources />,
    },
    {
      name: (
        <div className="flex items-center gap-2">
          <Upload className="size-4" />
          <span>Submission</span>
        </div>
      ),
      content: <SubmitYourWork />,
    },
  ];
  return (
    <div className="xl:max-w-4/5">
      <Tabs tabs={tabsData} />
    </div>
  );
};
