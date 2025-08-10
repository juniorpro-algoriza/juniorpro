'use client';

import { useSidebar } from '@atoms';
import { Notifications } from '../../../components';

export const PointsHeader = () => {
  const { isOpen } = useSidebar();
  return (
    <div className='pb-8'>
      <div>
        <div className='flex items-center justify-between w-full pb-6 border-b border-border-secondary'>
          <div className='flex items-end text-xs gap-2'>
            <h1
              className={`${!isOpen && 'pl-12'} text-[28px] font-medium text-yankees-blue mt-2`}
            >
              Points
            </h1>
            <p className='pb-2 '>
              Dashboard / <span className='text-content-secondary'>Points</span>
            </p>
          </div>
          <Notifications />
        </div>
      </div>
    </div>
  );
};
