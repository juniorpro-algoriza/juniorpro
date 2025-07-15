import Link from "next/link";
import type { ReactNode } from "react";

interface StylePagesLayoutProps {
  children: ReactNode;
}

const StylePagesLayout = ({ children }: StylePagesLayoutProps) => {
  return (
    <main className="flex h-screen items-center justify-center">
      <nav>
        <ul className="flex gap-2">
          <li>
            <Link href="/style-guide/button">Button</Link>
          </li>
          <li>
            <Link href="/style-guide/input">Input</Link>
          </li>
          <li>
            <Link href="/style-guide/tabs">Tabs</Link>
          </li>
          <li>
            <Link href="/style-guide/colors">Colors</Link>
          </li>
        </ul>
      </nav>
      {children}
    </main>
  );
};

export default StylePagesLayout;
