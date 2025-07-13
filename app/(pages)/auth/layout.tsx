import type { ReactNode } from "react";

interface OuterTabsLayoutProps {
  children: ReactNode;
  slot: ReactNode;
}

const AuthLayout = ({ children, slot }: Readonly<OuterTabsLayoutProps>) => {
  return (
    <>
      {slot}
      {children}
    </>
  );
};

export default AuthLayout;
