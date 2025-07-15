import { ReactNode } from "react";
import { Nav } from "../components/Nav";

interface PagesLayoutProps {
  children: ReactNode;
}

const PagesLayout = ({ children }: Readonly<PagesLayoutProps>) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default PagesLayout;

