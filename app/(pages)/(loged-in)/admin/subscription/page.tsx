import { Header } from "@components/client";
import React from "react";
import { PlansFeaturesTabs } from "./_components";
import { Breadcrumb } from "@components";


const SubscriptionPage = async () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { title: "Home", href: "/admin/dashboard" },
          { title: "Subscription", href: "/admin/subscription" },
        ]}
      />
      <Header
        title="Subscription Management"
        description="Manage plans, features, and pricing strategies"
      />
      <div className="flex items-start justify-between gap-3 w-full">
        <PlansFeaturesTabs />
      </div>
    </>
  );
};

export default SubscriptionPage;
