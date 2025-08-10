import type { ReactNode } from 'react';
import { SidebarLayout } from '../../components/client/Sidebar';

interface LoggedInLayoutProps {
  children: ReactNode;
}

const LoggedInLayout = ({ children }: Readonly<LoggedInLayoutProps>) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default LoggedInLayout;
