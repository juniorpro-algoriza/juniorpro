import { Breadcrumb } from "@components";
import { Header, PlanTabs } from "@components/client";
import React from "react";

const SubscriptionPage = () => {
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
        <PlanTabs module="contributor" />
      </React.Suspense>
    </>
  );
};

export default SubscriptionPage;
