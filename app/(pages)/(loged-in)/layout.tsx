"use client";
import { userAtom } from "@atoms";
import { SidebarLayout } from "@components/client";
import { getData } from "@server";
import { useAtom } from "jotai";
import { useEffect, type ReactNode } from "react";

interface LoggedInLayoutProps {
  children: ReactNode;
}

const LoggedInLayout = ({ children }: Readonly<LoggedInLayoutProps>) => {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const data = async () => {
      const userData = await getData({
        url: "User/profile",
        method: "GET",
      });
      setUser(userData);
    };
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default LoggedInLayout;
