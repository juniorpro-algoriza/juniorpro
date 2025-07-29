'use client';

import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useSidebar } from './SidebarContext';

export const SidebarLayout = ({ children }: { children: ReactNode }) => {
  const { isOpen, isMobile } = useSidebar();

  return (
    <div className='flex min-h-screen w-full max-w-full overflow-x-hidden'>
      <Sidebar />
      <main
        className={`
          flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${isOpen && !isMobile ? 'pl-72' : 'pl-0'}
        `}
      >
        <div className='w-full min-w-0 max-w-none'>
          <div className='w-full min-w-0'>{children}</div>
        </div>
      </main>
    </div>
  );
};
