import { Tabs } from "@components/client";
import { TabData } from "@types";
import { Book, FileText, Upload } from "lucide-react";
import React from "react";
import { StepByStepGuide } from "./StepByStepGuide";
import { LearningResources } from "./LearningResources";
import { SubmitYourWork } from "./SubmitYourWork";
import { components } from "../../../../../../api-schema/schema";

export const PathDetailsTabs = ({
  steps,
  successCriterias,
  learningResources,
  referenceAnswer,
  submissionLink,
  missionId,
  points,
  xp,
  nameEn,
}: {
  steps?:
    | components["schemas"]["Sawiha.Services.DTO.MissionsModels.MissionGuideModel"][]
    | null;
  successCriterias?:
    | components["schemas"]["Sawiha.Services.DTO.MissionsModels.MissionCriteriaModel"][]
    | null;
  learningResources?:
    | components["schemas"]["Sawiha.Services.DTO.MissionsModels.LearningResourcesModel"][]
    | null;
  referenceAnswer?: string | null;
  submissionLink?: string | null;
  missionId?: number;
  points?: number;
  xp?: number;
  nameEn?: string | null;
}) => {
  const tabsData: TabData[] = [
    {
      name: (
        <div className="flex items-center gap-2">
          <Book className="size-4" />
          <span>Step by Step Guide</span>
        </div>
      ),
      content: (
        <StepByStepGuide steps={steps} successCriterias={successCriterias} />
      ),
    },
    {
      name: (
        <div className="flex items-center gap-2">
          <FileText className="size-4" />
          <span>Learning Resources</span>
        </div>
      ),
      content: <LearningResources learningResources={learningResources} />,
    },
    {
      name: (
        <div className="flex items-center gap-2">
          <Upload className="size-4" />
          <span>Submission</span>
        </div>
      ),
      content: (
        <SubmitYourWork
          referenceAnswer={referenceAnswer}
          submissionLink={submissionLink}
          missionId={missionId}
          points={points}
          xp={xp}
          nameEn={nameEn}
        />
      ),
    },
  ];
  return (
    <div className="xl:max-w-4/5">
      <Tabs tabs={tabsData} defaultIndex={referenceAnswer ? 2 : 0} />
    </div>
  );
};
