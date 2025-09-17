"use client";

import { Tabs } from "@components/client";
import { ProjectsTab } from "./ProjectsTab";
import { PracticeZoneTab } from "./PracticeZoneTab";
import { ContributorTab } from "./ContributorTab";
import { JuniorsTab } from "./JuniorsTab";

export const ProjectManagerTabs = () => {
  const tabs = [
    { name: "Projects", content: <ProjectsTab /> },
    { name: "Practice Zone", content: <PracticeZoneTab /> },
    { name: "Contributor", content: <ContributorTab /> },
    { name: "Juniors", content: <JuniorsTab /> },
  ];

  return (
    <Tabs
      tabs={tabs}
      tabListClassName="flex space-x-2 rounded-full bg-gray-50 p-2 mb-3 w-full "
    />
  );
};
