import { Header, PlanTabs } from "@components/client";
import React from "react";

const SubscriptionPage = () => {
  return (
    <>
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
