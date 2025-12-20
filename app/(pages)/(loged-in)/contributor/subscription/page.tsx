import { Breadcrumb } from "@components";
import { Header, PlanTabs } from "@components/client";
import React from "react";
import { getPackages } from "../server";

const SubscriptionPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; period?: "month" | "year" }>;
}) => {
  // Get search text from query parameters
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams.query || "";
  const period = resolvedSearchParams.period || "month";

  // get packages
  const packagesResponse = await getPackages({
    SearchText: searchText,
    DurationType: period,
  });
  const packages = packagesResponse.data || [];
  console.log(packages)
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
        <PlanTabs module="contributor" packages={packages} />
      </React.Suspense>
    </>
  );
};

export default SubscriptionPage;
