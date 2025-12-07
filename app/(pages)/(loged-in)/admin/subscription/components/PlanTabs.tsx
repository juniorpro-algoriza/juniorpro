import { PlanCard, Tabs } from "@components/client";
import { TabData } from "@types";
import React from "react";

export const PlanTabs = () => {
  const tabsData: TabData[] = [
    {
      name: "Monthly",
      content: (
        <div className="grid md:grid-cols-2 md:gap-5 gap-2">
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
        </div>
      ),
    },
    {
      name: "Yearly",
      content: (
        <div className="grid md:grid-cols-2 md:gap-5 gap-2">
          <PlanCard />
          <PlanCard />
          <PlanCard />
          <PlanCard />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Tabs tabs={tabsData} tabPanelsClassName="xl:w-4/5" />
    </div>
  );
};
