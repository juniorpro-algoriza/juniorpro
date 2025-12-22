"use client";
import { ModalRenderer } from "@components";
import { userAtom } from "@atoms";
import { SidebarLayout } from "@components/client";
import { getUserProfile } from "@server";
import { useAtom } from "jotai";
import { Suspense, useEffect, type ReactNode } from "react";

interface LoggedInLayoutProps {
  children: ReactNode;
}

const LoggedInLayout = ({ children }: Readonly<LoggedInLayoutProps>) => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const data = async () => {
      const userData = await getUserProfile();
      setUser(userData);
    };
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SidebarLayout>
      {children}
      <Suspense fallback={null}>
        <ModalRenderer />
      </Suspense>
    </SidebarLayout>
  );
};

export default LoggedInLayout;
