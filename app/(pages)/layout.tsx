import { ReactNode } from 'react';
import { SidebarLayout, SidebarProvider } from '../components/client/Sidebar';

interface PagesLayoutProps {
  children: ReactNode;
}

const PagesLayout = ({ children }: Readonly<PagesLayoutProps>) => {
  return (
    <>
      {/* <Nav /> */}
      <SidebarProvider>
        <SidebarLayout>{children}</SidebarLayout>
      </SidebarProvider>
      {/* <Footer /> */}
    </>
  );
};

export default PagesLayout;
