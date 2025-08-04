import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
  modalSlot: ReactNode;
}

const RootLayout = ({ children, modalSlot }: Readonly<RootLayoutProps>) => {
  return (
    <>
      {modalSlot}
      {children}
    </>
  );
};

export default RootLayout;
