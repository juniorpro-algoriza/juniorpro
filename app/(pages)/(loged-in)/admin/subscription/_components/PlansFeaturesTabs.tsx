"use client";

import { PlanTabs, SearchInput, Tabs } from "@components/client";
import { TabData } from "@types";
import { FileText, Plus } from "lucide-react";
import React, { useState } from "react";
import { Button, ModalLink } from "@components";
import { FeaturesTable } from "./FeaturesTab";
import { components } from "../../../../../../api-schema";

import { useFeatures } from "../../tanstack/features/useFeatures";
import { usePackages } from "../../tanstack/packages/usePackages";
import { useSearchParams } from "next/navigation";

type Feature =
  components["schemas"]["Sawiha.Services.DTO.FeatureModels.FeatureModel"];
type Package =
  | components["schemas"]["Sawiha.Services.DTO.PackageModels.GetPackageListModel"]
  | components["schemas"]["Sawiha.Services.DTO.PackageModels.EnablerPackageModels.EnablerPackageModel"];

export const PlansFeaturesTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchParams = useSearchParams();
  const searchText = searchParams.get("query") || "";
  const period = (searchParams.get("period") as "month" | "year") || "month";

  const { data: features, isLoading: isLoadingFeatures } = useFeatures();

  const { data: packagesResponse, isLoading: isLoadingPackages } = usePackages({
    SearchText: searchText,
    DurationType: period,
  });

  const packages = (packagesResponse?.data as Package[]) || [];
  const featuresList = (features as Feature[]) || [];

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
          <PlanTabs
            module="admin"
            packages={packages}
            loadingPackages={isLoadingPackages}
          />
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
      content: (
        <FeaturesTable features={featuresList} isLoading={isLoadingFeatures} />
      ),
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
      </Tabs>
    </div>
  );
};
