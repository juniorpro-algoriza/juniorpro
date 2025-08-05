import { Provider } from 'jotai';
import type { ReactNode } from 'react';
import {
  SidebarLayout,
  SidebarProvider,
} from '../../components/client/Sidebar';

interface LoggedInLayoutProps {
  children: ReactNode;
}

const LoggedInLayout = ({ children }: Readonly<LoggedInLayoutProps>) => {
  return (
    <Provider>
      <SidebarProvider>
        <SidebarLayout>{children}</SidebarLayout>
      </SidebarProvider>
    </Provider>
  );
};

export default LoggedInLayout;
