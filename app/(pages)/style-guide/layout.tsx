import type { ReactNode } from "react";

interface StylePagesLayoutProps {
  children: ReactNode;
}

const StylePagesLayout = ({ children }: StylePagesLayoutProps) => {
  return (
    <main
      data-theme="dark"
      className="flex h-screen items-center justify-center"
    >
      {children}
    </main>
  );
};

export default StylePagesLayout;
