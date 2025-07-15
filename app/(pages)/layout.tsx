import { ReactNode } from "react";
import { Nav } from "../components/Nav";

interface PagesLayoutProps {
  children: ReactNode;
}

const PagesLayout = ({ children }: Readonly<PagesLayoutProps>) => {
  return (
    <>
      <Nav />
      <div className="px-4">
        {children}
      </div>
    </>
  );
};

export default PagesLayout;

