import Link from "next/link";
import type { ReactNode } from "react";
import { linkStyle } from "./styles";

interface StylePagesLayoutProps {
  children: ReactNode;
}

const links = ["button", "input", "tabs", "colors"];

const StylePagesLayout = ({ children }: StylePagesLayoutProps) => {
  return (
    <div className="py-8">
      <nav className="border border-black py-4 px-4">
        <ul className="flex gap-2">
          {links.map((l) => {
            return (
              <li key={l}>
                <Link className={linkStyle} href={`/style-guide/${l}`}>
                  {l}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center justify-center flex-col py-4">
        {children}
      </div>
    </div>
  );
};

export default StylePagesLayout;

