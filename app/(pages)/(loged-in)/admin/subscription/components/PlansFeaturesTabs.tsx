"use client";

import { PlanTabs, Tabs } from "@components/client";
import { TabData } from "@types";
import { FileText, Plus } from "lucide-react";
import React, { useState } from "react";
import { Button, ModalLink } from "@components";
import { SearchInput } from "../../../components/client";
import { FeaturesTable } from "./FeaturesTab";
import { components } from "../../../../../../api-schema";

type Feature =
  components["schemas"]["JuniorPro.Services.DTO.FeatureModels.FeatureModel"];

interface PlansFeaturesTabsProps {
  features: Feature[];
}

export const PlansFeaturesTabs = ({ features }: PlansFeaturesTabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabsData: TabData[] = [
    {
      name: (
        <div className="flex items-center gap-2">
          <FileText className="size-4" />
          <span>Plans</span>
        </div>
      ),
      content: (
        <React.Suspense>
          <PlanTabs module="admin" />
        </React.Suspense>
      ),
    },
    {
      name: (
        <div className="flex items-center gap-2">
          <FileText className="size-4" />
          <span>Features</span>
        </div>
      ),
      content: <FeaturesTable features={features} />,
    },
  ];

  return (
    <div className="w-full">
      <Tabs
        tabs={tabsData}
        onTabChange={setSelectedIndex}
        tabListClassName="border-0 bg-transparent p-0"
      >
        {selectedIndex === 0 && (
          <div className="flex items-start md:gap-5 gap-2 flex-wrap mb-2">
            <SearchInput placeholder="Search for plans..." />
            <ModalLink name="CreateEditPlan">
              <Button intent="main2" size="mainDefault">
                <Plus />
                New Plan
              </Button>
            </ModalLink>
          </div>
        )}
        {selectedIndex === 1 && (
          <div className="flex items-start md:gap-5 gap-2 flex-wrap mb-2">
            <SearchInput placeholder="Search for features..." />
            <ModalLink name="CreateEditFeature">
              <Button intent="main2" size="mainDefault">
                <Plus />
                New Features
              </Button>
            </ModalLink>
          </div>
        )}
      </Tabs>
    </div>
  );
};
