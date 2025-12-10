import { Header } from "@components/client";
import React from "react";
import { PlansFeaturesTabs } from "./components";
import { Breadcrumb } from "@components";
import { getFeatures, getPackages } from "../server";

export const dynamic = "force-dynamic";

const SubscriptionPage = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  // Get search text from query parameters
  const resolvedSearchParams = await searchParams;
  const searchText = resolvedSearchParams.query || "";

  // get features
  const features = await getFeatures();
  // get packages
  const packagesResponse = await getPackages({
    SearchText: searchText,
    
  });
  const packages = packagesResponse.data || [];
  // consoles
  console.log("Features data:", features);
  console.log("Packages data:", packages);

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          {
            title: "Home",
            href: "/admin/dashboard",
          },
          {
            title: "Subscription",
            href: "/admin/subscription",
          },
        ]}
      />
      <Header
        title="Subscription Management"
        description="Manage plans, features, and pricing strategies"
      />
      <div className="flex items-start justify-between gap-3 w-full">
        <PlansFeaturesTabs features={features} packages={packages} />
      </div>
    </>
  );
};

export default SubscriptionPage;
