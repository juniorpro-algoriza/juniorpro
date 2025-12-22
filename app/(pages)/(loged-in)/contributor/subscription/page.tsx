"use client";
import { Breadcrumb } from "@components";
import { Header, PlanTabs } from "@components/client";
import React, { use } from "react";
import { usePackagesData } from "../tanstack/usePackagesData";

const SubscriptionPage = ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; period?: "month" | "year" }>;
}) => {
  const resolvedSearchParams = use(searchParams);
  const searchText = resolvedSearchParams.query || "";
  const period = resolvedSearchParams.period || "month";

  const { data: packagesResponse, isLoading } = usePackagesData({
    SearchText: searchText,
    DurationType: period,
  });

  const packages = packagesResponse?.data || [];
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/contributor/dashboard",
          },
          {
            title: "Subscription",
            href: "/contributor/subscription",
          },
        ]}
      />
      <Header
        title="Subscription Management"
        description="Manage plans, features, and pricing strategies"
      />
      <React.Suspense>
        <PlanTabs
          module="contributor"
          packages={packages}
          loadingPackages={isLoading}
        />
      </React.Suspense>
    </>
  );
};

export default SubscriptionPage;
