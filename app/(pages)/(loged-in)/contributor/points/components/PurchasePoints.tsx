import { Tabs } from '@components/client';
import type { TabData } from '../../../../../components/types';
import { getPointsPlans, getPointsTransactions } from '../server';
import { PurchaseCard } from './PurchaseCard';
import { TransactionCard } from './TransactionCard';

export const PurchasePoints = async () => {
  const plansData = await getPointsPlans();
  const transactionsData = await getPointsTransactions();

  const tabsData: TabData[] = [
    {
      name: 'Purchase Points',
      content: (
        <>
          <h2 className='text-2xl font-medium text-yankees-blue'>
            Purchase Points
          </h2>
          <div className='grid md:grid-cols-3 gap-6'>
            {plansData.map((plan) => (
              <PurchaseCard key={plan.id} plan={plan} />
            ))}
          </div>
        </>
      ),
    },
    {
      name: 'Transactions',
      content: (
        <>
          <h2 className='text-2xl font-medium text-yankees-blue'>
            Recent Transactions
          </h2>
          <div className='space-y-4'>
            {transactionsData.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Tabs tabs={tabsData} selectedIndex={0} tabStyle='w-fit px-4' />
    </div>
  );
};
