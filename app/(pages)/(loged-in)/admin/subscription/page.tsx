import { Header } from "@components/client";
import React from "react";
import { PlansFeaturesTabs } from "./components";
import { getFeatures } from "../server/getFeaturesData";
import { Breadcrumb } from "@components";

export const dynamic = "force-dynamic";

const SubscriptionPage = async () => {
  const features = await getFeatures();
  console.log("Features data:", features);

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
        <PlansFeaturesTabs features={features} />
      </div>
    </>
  );
};

export default SubscriptionPage;
