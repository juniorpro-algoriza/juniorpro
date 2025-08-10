'use client';

import { useSidebar } from '@atoms';
import { ReactNode, useEffect } from 'react';

// Screen size detection hook
export const useScreenSize = () => {
  const { setIsMobile, setIsOpen } = useSidebar();

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setIsMobile, setIsOpen]);
};

// Simple wrapper component to initialize screen size detection
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  useScreenSize();

  return <div className='w-full'>{children}</div>;
};
