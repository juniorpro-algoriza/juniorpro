// TODO: Use Jotai instead
import type { ReactNode } from "react";
import {
  SidebarLayout,
  SidebarProvider,
} from "../../components/client/Sidebar";

interface LoggedInLayoutProps {
  children: ReactNode;
}

const LogedInLayout = ({ children }: Readonly<LoggedInLayoutProps>) => {
  return (
    <>
      <SidebarProvider>
        <SidebarLayout>{children}</SidebarLayout>
      </SidebarProvider>
    </>
  );
};

export default LogedInLayout;
