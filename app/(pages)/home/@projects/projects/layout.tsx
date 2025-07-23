import type { ReactNode } from "react";

interface HomePageProjectsLayout {
  children: ReactNode;
}

const HomePageProjectsLayout = ({
  children,
}: Readonly<HomePageProjectsLayout>) => {
  return children;
};

export default HomePageProjectsLayout;
