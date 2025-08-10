import { SidebarLayout } from '@components/client';
import type { ReactNode } from 'react';

interface LoggedInLayoutProps {
  children: ReactNode;
}

const LoggedInLayout = ({ children }: Readonly<LoggedInLayoutProps>) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default LoggedInLayout;
