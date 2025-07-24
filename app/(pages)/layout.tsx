import { Footer } from "@components";
import { ReactNode } from "react";
import { Nav } from "@components/client";

interface PagesLayoutProps {
  children: ReactNode;
}

const PagesLayout = ({ children }: Readonly<PagesLayoutProps>) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default PagesLayout;
