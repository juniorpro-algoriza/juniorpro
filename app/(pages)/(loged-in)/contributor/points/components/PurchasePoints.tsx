"use client";

import { Tabs } from "@components/client";
import type { TabData, Plan } from "@types";
import { Transaction } from "../types";
import { TransactionCard } from "./TransactionCard";
import { PurchaseCard } from "@components";
interface PurchasePointsProps {
  plans: Plan[];
  transactions: Transaction[];
}

export const PurchasePoints = ({
  plans,
  transactions,
}: PurchasePointsProps) => {
  const tabsData: TabData[] = [
    {
      name: "Purchase Points",
      content: (
        <>
          <h2 className="text-2xl font-medium text-yankees-blue">
            Purchase Points
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PurchaseCard key={plan.id} plan={plan} />
            ))}
          </div>
        </>
      ),
    },
    {
      name: "Transactions",
      content: (
        <>
          <h2 className="text-2xl font-medium text-yankees-blue">
            Recent Transactions
          </h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Tabs tabs={tabsData} tabStyle="w-fit px-4" />
    </div>
  );
};
