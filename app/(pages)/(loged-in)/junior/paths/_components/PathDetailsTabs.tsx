"use client";

import { Tabs } from "@components/client";
import { TabData } from "@types";
import { Book, FileText, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
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
  submissionNotes,
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
  submissionNotes?: string | null;
  missionId?: number;
  points?: number;
  xp?: number;
  nameEn?: string | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tabParam = searchParams.get("tab");
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (tabParam) {
      const tabIndex = parseInt(tabParam, 10);
      // Tab query starts from 1, so subtract 1 for array index
      const adjustedIndex = tabIndex - 1;
      return adjustedIndex >= 0 && adjustedIndex <= 2 ? adjustedIndex : 0;
    }
    return 0; // Default to first tab
  });

  // Update selected index when URL changes (browser back/forward)
  useEffect(() => {
    const newIndex = (() => {
      if (tabParam) {
        const tabIndex = parseInt(tabParam, 10);
        // Tab query starts from 1, so subtract 1 for array index
        const adjustedIndex = tabIndex - 1;
        return adjustedIndex >= 0 && adjustedIndex <= 2 ? adjustedIndex : 0;
      }
      return 0; // Default to first tab
    })();

    if (newIndex !== selectedIndex) {
      setSelectedIndex(newIndex);
    }
  }, [tabParam, selectedIndex]);

  // Handle tab change and update URL
  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
    const params = new URLSearchParams(searchParams.toString());
    // Tab query starts from 1, so add 1 for URL parameter
    if (index === 0) {
      // Remove tab parameter if it's the first tab (tab=1)
      params.delete("tab");
    } else {
      params.set("tab", (index + 1).toString());
    }

    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(newUrl, { scroll: false });
  };

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
          submissionNotes={submissionNotes}
          missionId={missionId}
          points={points}
          xp={xp}
          nameEn={nameEn}
        />
      ),
    },
  ];
  return (
    <div className="xl:max-w-4/5" id="path-details-tabs">
      <Tabs
        tabs={tabsData}
        selectedIndex={selectedIndex}
        onTabChange={handleTabChange}
      />
    </div>
  );
};
