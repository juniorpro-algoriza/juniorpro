"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { components } from "../../../api-schema";
import { useCurrentSubscription } from "../../(pages)/(loged-in)/contributor/tanstack";
import { PlanCard } from "./PlanCard";
import { Skeleton } from "../Skeleton";

type Package =
  | components["schemas"]["Sawiha.Services.DTO.PackageModels.GetPackageListModel"]
  | components["schemas"]["Sawiha.Services.DTO.PackageModels.EnablerPackageModels.EnablerPackageModel"];

export const PlanTabs = ({
  module,
  packages,
  loadingPackages,
}: {
  module: "admin" | "contributor";
  packages: Package[];
  loadingPackages?: boolean;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Use TanStack Query for subscription data
  const { data: currentSubscription, isLoading: isLoadingSubscription } =
    useCurrentSubscription(module === "contributor");

  const period = searchParams.get("period") || "month";

  const handlePeriodChange = (newPeriod: "month" | "year") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", newPeriod);
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h3 className="text-lg font-medium">
          Available Plans{" "}
          <span className="py-1 px-2 rounded-lg border border-dark-blue-main/20 ml-2 bg-blue-main/10 text-dark-blue-main font-bold text-sm">
            {packages.length}
          </span>
        </h3>
        <div className="flex items-center gap-2 px-5 py-1.5 border-2 rounded-3xl w-fit border-gray-100">
          <button
            onClick={() => handlePeriodChange("month")}
            className={`px-5 py-2 rounded-3xl border transition-all cursor-pointer text-sm ${
              period === "month"
                ? "border-gray-100 bg-[#F3F4F6] shadow-main"
                : "border-transparent hover:border-gray-100"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => handlePeriodChange("year")}
            className={`px-5 py-2 rounded-3xl border transition-all cursor-pointer text-sm ${
              period === "year"
                ? "border-gray-100 bg-[#F3F4F6] shadow-main"
                : "border-transparent hover:border-gray-100"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-5 gap-2">
        {loadingPackages && (
          <>
            <Skeleton className="w-full h-[300px] rounded-2xl border border-gray-200 border-dashed" />
            <Skeleton className="w-full h-[300px] rounded-2xl border border-gray-200 border-dashed" />
          </>
        )}
        {packages.map((packageItem) => (
          <PlanCard
            key={packageItem.id}
            module={module}
            packageData={packageItem}
            currentSubscription={currentSubscription}
            isLoadingSubscription={isLoadingSubscription}
          />
        ))}
        {packages.length === 0 && !loadingPackages && (
          <div className="flex items-center text-gray-600">
            No plans available.
          </div>
        )}
      </div>
    </div>
  );
};
