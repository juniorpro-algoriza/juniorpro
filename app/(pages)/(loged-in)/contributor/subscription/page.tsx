"use client";

import { Breadcrumb } from "@components";
import { Header, PlanTabs } from "@components/client";
import { useSearchParams } from "next/navigation";
import { usePackagesData } from "../tanstack/usePackagesData";
import { Suspense } from "react";

const SubscriptionContent = () => {
  const searchParams = useSearchParams();

  const searchText = searchParams.get("query") || "";
  const period = (searchParams.get("period") || "month") as "month" | "year";

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
      <PlanTabs
        module="contributor"
        packages={packages}
        loadingPackages={isLoading}
      />
    </>
  );
};

const SubscriptionPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionContent />
    </Suspense>
  );
};

export default SubscriptionPage;
