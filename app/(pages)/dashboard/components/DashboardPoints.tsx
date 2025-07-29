import { Button } from '@components';
import { DiamondIcon, WalletIcon } from '@icons';
import { ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { getDashboardPoints } from '../server';
import { EmptyData } from './EmptyData';

export const DashboardPoints = async () => {
  const { pointsBalance, cashBalance, allocations } =
    await getDashboardPoints();

  return (
    <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-4'>
      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-medium text-yankees-blue'>
            Points Allocation ({allocations.length})
          </h3>
          {allocations.length ? (
            <Link href={'./points'}>
              <Button
                intent='tertiary'
                iconPosition='right'
                size='small'
                className='border-none text-unitedBlue'
                icon={<ChevronRight className='w-4 h-4' />}
              >
                View All
              </Button>
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>

      <div>
        {/* Balance Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
          <div className='bg-carolina-blue-opacity p-4 rounded-2xl border border-antiflash-white drop-shadow-xl'>
            <div className='flex justify-between items-start'>
              <div className='flex flex-col gap-2 font-medium'>
                <p className='text-3xl'>{pointsBalance}</p>
                <p>Points Balance</p>
              </div>
              <div className='bg-carolina-blue-opacity rounded-lg p-1.5'>
                <DiamondIcon fill='#5879DC' width='25' height='25' />
              </div>
            </div>
          </div>
          <div className='bg-carolina-blue-opacity p-4 rounded-2xl border border-antiflash-white drop-shadow-xl'>
            <div className='flex justify-between items-start'>
              <div className='flex flex-col gap-2 font-medium'>
                <p className='text-3xl'>{cashBalance}</p>
                <p>Cash Balance</p>
              </div>
              <div className='bg-carolina-blue-opacity rounded-lg p-1.5'>
                <WalletIcon width='25' height='25' />
              </div>
            </div>
          </div>
        </div>

        {/* Points List */}
        <div className='space-y-4'>
          {allocations.length ? (
            allocations.map(({ name, points }, index) => (
              <div
                key={index}
                className='flex items-end justify-between p-3 rounded-2xl border border-antiflash-white shadow-sm'
              >
                <div className='flex flex-col gap-2'>
                  <p className='font-medium'>{name}</p>
                  <p className='text-2xl font-medium text-unitedBlue'>
                    {points}
                  </p>
                </div>
                <Button
                  intent='tertiary'
                  size='small'
                  className='text-unitedBlue border-unitedBlue p-2'
                >
                  <Plus className='w-4 h-4' />
                </Button>
              </div>
            ))
          ) : (
            <EmptyData description='No points added yet' />
          )}
        </div>
      </div>
    </div>
  );
};
