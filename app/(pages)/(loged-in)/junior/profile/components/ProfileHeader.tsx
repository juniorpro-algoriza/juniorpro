'use client';

import { useSidebar } from '@atoms';
import { Notifications } from '../../../components';

export const ProfileHeader = () => {
  const { isOpen } = useSidebar();
  return (
    <div className='pb-8'>
      <div>
        <div className='flex items-center justify-between w-full pb-6 border-b border-border-secondary'>
          <h1
            className={`${!isOpen && 'pl-12'} text-[28px] font-medium text-yankees-blue mt-2`}
          >
            My Profile
          </h1>
          <Notifications />
        </div>
      </div>
    </div>
  );
};
