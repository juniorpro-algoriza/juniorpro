export const dynamic = "force-dynamic";

import {
  PointsAllocationSection,
  PointsHeader,
  PurchasePoints,
} from "./components";
import { getPointsPlans } from "@server";
import { getPointsTransactions } from "./server";

const PointsPage = async () => {
  const plans = await getPointsPlans();
  const transactions = await getPointsTransactions();

  return (
    <div className="space-y-4 px-6 py-3 bg-stone-50">
      <PointsHeader />
      <PointsAllocationSection />
      <PurchasePoints plans={plans} transactions={transactions} />
    </div>
  );
};
export default PointsPage;
